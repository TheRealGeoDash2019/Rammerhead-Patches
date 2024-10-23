document.waitForElement = function(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};

window.rhPatchesHostname = "settings.lhost.dev";

try {
  window.EventEmitter = require("events");
} catch {
  // Require was Missing / Disabled when executed... Oh well...
}

window.getFrames = async function() {
  let rhURL;
  if (!rhSession.getShuffler) {
    rhURL = (new (require(`https://${window.rhPatchesHostname}/assets/RHUrlDecode.module.js`)));
    rhURL.dictionary = JSON.parse((await rhSession._getAllData("data")).find(e => e.type === "sessionData").sessionData).data.shuffleDict;
  } else {
    rhURL = await rhSession.getShuffler();
  }
  let res = {};
  for (const key of Object.keys(window.frames).filter(e => ((typeof parseInt(e) === "number") && (isNaN(parseInt(e))) !== true))) {
    res[key] = window.frames[key];
    res[rhURL.unshuffle(window.frames[key].location.href.split("/").slice(4).join("/"))] = window.frames[key];
  };
  return res;
}


document.waitForElement(`[class^="chrome-tabs"]`).then(async el => {
  const getAuthorizedSettingPages = async function() {
    return (await fetch("https://cdn.jsdelivr.net/gh/TheRealGeoDash2019/Rammerhead-Patches@main/authorizedDomains.json").then(t => t.json())).domains;
  }
  
  globalThis.Rammerhead = { darkMode: true, versionVerbose: true };
  
  globalThis.toggleVersionVerbose = function(showVersion = false) {
      document.querySelectorAll(`[class^="rhnewtab-version-container"]`).forEach(e => {
        e.style.display = ((!!showVersion)? "" : "none");
      })
  }
  
  globalThis.toggleTheme = async function(dark = true) {
    if (dark === false) {
      globalThis.Rammerhead.darkMode = false;
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('custom-theme');
      document.documentElement.classList.add('light-theme');
      el.classList.remove('chrome-tabs-dark-theme');
      el.classList.add('chrome-tabs-light-theme');
      const theme = await rhTheming.getURL() || (window.localStorage.getItem("theme:cssLocation")? window.localStorage.getItem("theme:cssLocation") : "rh://themes/dark");
      const state = {
        active: globalThis.Rammerhead.darkMode,
        theme: (globalThis.Rammerhead.darkMode? theme : "rh://themes/light")
      }
      const domains = await getAuthorizedSettingPages();
      Object.entries(await window.getFrames()).filter(e => {
        try {
          const {hostname} = new URL(e[0]);
          return (!!domains.includes(hostname));
        } catch (_) {
          return false;
        }
      }).forEach(e => {
        let event = new CustomEvent("themeState");
        event.themeState = state;
        e[1].dispatchEvent(event);
      })
    } else {
      globalThis.Rammerhead.darkMode = true;
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.add('custom-theme');
      document.documentElement.classList.remove('light-theme');
      el.classList.add('chrome-tabs-dark-theme');
      el.classList.remove('chrome-tabs-light-theme');
      const theme = await rhTheming.getURL() || (window.localStorage.getItem("theme:cssLocation")? window.localStorage.getItem("theme:cssLocation") : "rh://themes/dark");
      const state = {
        active: globalThis.Rammerhead.darkMode,
        theme: (globalThis.Rammerhead.darkMode? theme : "rh://themes/light")
      }
      const domains = await getAuthorizedSettingPages();
      Object.entries(await window.getFrames()).filter(e => {
        try {
          const {hostname} = new URL(e[0]);
          return (!!domains.includes(hostname));
        } catch (_) {
          return false;
        }
      }).forEach(e => {
        let event = new CustomEvent("themeState");
        event.themeState = state;
        e[1].dispatchEvent(event);
      })
    }
  }
  
  globalThis.setThemeURL = function(theme) {
    if (theme) {
      // console.log("Updating Theme CSS: " + theme)
      window.localStorage.setItem("theme:cssLocation", theme);
      if (theme.replaceAll(" ", "").length < 1) {
        document.querySelectorAll("link.custom-theming").forEach(e => {
          e.remove();
        })
        return null;
      };
      document.querySelectorAll("link.custom-theming").forEach(e => {
        e.remove();
      })
      let o = document.createElement("link");
      o.rel = "stylesheet";
      o.href = theme;
      o.className = "custom-theming";
      document.head.appendChild(o);
      return theme;
    } else {
      // console.log("Removing Theme CSS...")
      window.localStorage.removeItem("theme:cssLocation");
      document.querySelectorAll("link.custom-theming").forEach(e => {
        e.remove();
      })
      return null;
    }
  }

  globalThis.rhTheming = {
    getEnabled: async function() {
        const data = await rhSession._getAllData(`data`);
        const result = data.find(e => e.type === "tabTheming");
        if (result) {
            return result.data.enabled;
        } else {
            return false;
        }
    },
    getURL: async function() {
        const data = await rhSession._getAllData(`data`);
        const result = data.find(e => e.type === "tabTheming");
        if (result) {
            return result.data.url;
        } else {
            return null;
        }
    },
    setEnabled: async function(_ = true) {
        const temp = await rhSession._getAllData(`data`);
        const old = temp.find(e => e.type === "tabTheming");
        if (old) {
            old.data.enabled = _;
        } else {
            temp.push({type: "tabTheming", data: {enabled: _, url: null}});
        }
        // console.log(old)
        // console.log(temp);
        await rhSession._putAllData(`data`, temp);
        globalThis.toggleTheme(_);
    },
    setURL: async function(_) {
        const temp = await rhSession._getAllData(`data`);
        const old = temp.find(e => e.type === "tabTheming");
        if (old) {
            old.data.url = _;
        } else {
            temp.push({type: "tabTheming", data: {enabled: true, url: _}});
        }
        // console.log(old)
        // console.log(temp);
        await rhSession._putAllData(`data`, temp);
        globalThis.setThemeURL(_);
    }
  }
  
  globalThis.setBrowserTitle = async function(_) {
    (await rhSession.setTabTitle(_));
    const state = {
      hostname: window.location.hostname,
      title: await rhSession.getTabTitle(),
      favicon: await rhSession.getTabFavicon()
    }, domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("tabState");
      event.tabState = state;
      e[1].dispatchEvent(event);
    })
  }
  
  globalThis.setBrowserFavIcon = async function(_) {
    (await rhSession.setTabFavicon(_));
    const state = {
      hostname: window.location.hostname,
      title: await rhSession.getTabTitle(),
      favicon: await rhSession.getTabFavicon()
    }, domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("tabState");
      event.tabState = state;
      e[1].dispatchEvent(event);
    })
  };
  
  globalThis.setHTTPProxy = async function(_) {
    (await rhSession.setHttpProxySetting(_));
    const result = await rhSession.getHttpProxySetting(), state = {
      endpoint: ("http://" + result.proxyAuth + "@" + result.host)
    }, domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("proxyState");
      event.proxyState = state;
      e[1].dispatchEvent(event);
    })
  };
  
  const pressedKeys = {}, keyShortcuts = [
    /* Shows Browser Version */
    /* ALT + V */
    {
      keys: [18, 86],
      executed: false,
      exec: function(event) {
        globalThis.Rammerhead.versionVerbose = (!!!globalThis.Rammerhead.versionVerbose);
        toggleVersionVerbose(globalThis.Rammerhead.versionVerbose);
      }
    },
    /* Toggle Dark/Light Mode */
    /* ALT + META + H */
    {
      keys: [18, 72, 91],
      executed: false,
      exec: function(event) {
        if (globalThis.Rammerhead.darkMode === true) {
          rhTheming.setEnabled(false);
        } else {
          rhTheming.setEnabled(true);
        }
      }
    },
    /* Toggle Dark/Light Mode */
    /* CTRL + ALT + H */
    {
      keys: [17, 18, 72],
      executed: false,
      exec: function(event) {
        if (globalThis.Rammerhead.darkMode === true) {
          rhTheming.setEnabled(false);
        } else {
          rhTheming.setEnabled(true);
        }
      }
    },
    /* Load a Custom Theme (Replaces Dark Theme) */
    /* ALT + META + T */
    {
      keys: [18, 84, 91],
      executed: false,
      exec: function(event) {
        const theme = prompt("Insert Theme CSS Link:");
        rhTheming.setURL(theme);
      }
    },
    /* Add Background Tab */
    /* ALT + SHIFT + T */
    {
      keys: [16, 18, 84],
      executed: false,
      exec: function(event) {
        if (!chromeTabs.activeTabEl) {
          chromeTabs.addTab({});
        } else {
          chromeTabs.addTab({}, {
            background: true
          })
        }
      }
    },
    /* Add Tab */
    /* ALT + T */
    {
      keys: [18, 84],
      executed: false,
      exec: function(event) {
        chromeTabs.addTab({})
      }
    },
    /* Reload Tab (buggy) */
    /* R + ALT */
    {
      keys: [18, 82],
      executed: false,
      exec: function(event) {
        try {
          let tab = document.querySelector(`div[class^="browser-tab-content"] iframe[style='display: block;']`);
          if (tab) {
            // console.log(tab);
            tab.contentWindow.location.reload();
          }
        } catch (_) {
          console.warn(_)
          // No Active Tab?
        }
      }
    },
    /* Print Tab (beta) */
    /* ALT + P */
    {
      keys: [16, 18, 80],
      executed: false,
      exec: function(event) {
        try {
          window.print();
        } catch (_) {
          console.warn(_)
          // No Active Tab?
        }
      }
    },
    /* Close Tab */
    /* ALT + W */
    {
      keys: [18, 87],
      executed: false,
      exec: function(event) {
        chromeTabs.removeTab(chromeTabs.activeTabEl)
      }
    }
  ];
  
  window.addEventListener("keydown", (event) => {
    pressedKeys[event.keyCode] = {
      key: event.key,
      keyCode: event.keyCode,
      pressed: true
    };
    
    function isEqual(a, b){
      if (a.length!=b.length) {
        return false;
      } else {
        for (var i=0;i<a.length;i++)
          if(a[i]!=b[i])
            return false;
          return true;
      }
    };
    
    for (const shortcut of keyShortcuts) {
      if (shortcut.executed === false) {
        if (isEqual(shortcut.keys, Object.values(pressedKeys).filter(e => e.pressed).map(e => e.keyCode))) {
          event.preventDefault();
          if (shortcut.executed === false) {
            shortcut.exec(event);
          };
        }
      }
    }
  })
  window.addEventListener("keyup", (event) => {
    pressedKeys[event.keyCode] = {
      key: event.key,
      keyCode: event.keyCode,
      pressed: false
    };
    
    for (const shortcut of keyShortcuts) {
      shortcut.executed = false;
    };
  })
  window.addEventListener("blur", () => {
    Object.keys(pressedKeys).map(e => {
      (pressedKeys[e]["pressed"] = false)
    });
  })
  window.addEventListener("beforeprint", () => {
    document.querySelector(`div[class^="chrome-tabs"]`).style.display = "none";
    document.querySelector(`div[class^="browser-bar"]`).style.display = "none";
  })
  window.addEventListener("afterprint", () => {
    Object.keys(pressedKeys).map(e => {
      (pressedKeys[e]["pressed"] = false)
    });
    document.querySelector(`div[class^="chrome-tabs"]`).style.display = "";
    document.querySelector(`div[class^="browser-bar"]`).style.display = "";
  })
  
  /* Required Theme for Dark Mode: */
  let j = document.createElement("link")
  j.rel = "stylesheet";
  j.href = `https://${window.rhPatchesHostname}/assets/rammerhead.ext.css`;
  document.head.appendChild(j);
  
  let cssLocation = await rhTheming.getURL() || window.localStorage.getItem("theme:cssLocation");
  
  if (!!cssLocation) {
    rhTheming.setURL(cssLocation);
  }
  
  //try {
  //  switch(window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //    case true:
  //      globalThis.Rammerhead.darkMode=true;
  //    case false:
  //      globalThis.Rammerhead.darkMode=false;
  //  };
  //} catch (_) {
  //  globalThis.Rammerhead.darkMode=true;
  //}
  
  el.addEventListener('activeTabChange', (_) => {
    toggleVersionVerbose(globalThis.Rammerhead.versionVerbose);
  })
  el.addEventListener('tabAdd', (_) => {
    toggleVersionVerbose(globalThis.Rammerhead.versionVerbose);
  })
  el.addEventListener('tabRemove', (_) => {
    toggleVersionVerbose(globalThis.Rammerhead.versionVerbose);
  })
  
  window.addEventListener("requestThemeConfig", async (event) => {
    const theme = await rhTheming.getURL() || (window.localStorage.getItem("theme:cssLocation")? window.localStorage.getItem("theme:cssLocation") : "rh://themes/dark");
    const state = {
      active: globalThis.Rammerhead.darkMode,
      theme: (globalThis.Rammerhead.darkMode? theme : "rh://themes/light")
    }
    
    const domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("themeState");
      event.themeState = state;
      e[1].dispatchEvent(event);
    })
  })
  
  window.addEventListener("requestTabConfig", async (event) => {
    const state = {
      hostname: window.location.hostname,
      title: await rhSession.getTabTitle(),
      favicon: await rhSession.getTabFavicon()
    }
    
    const domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("tabState");
      event.tabState = state;
      e[1].dispatchEvent(event);
    })
  })
  
  window.addEventListener("requestProxyConfig", async (event) => {
    const result = await rhSession.getHttpProxySetting();
    
    const state = {
      endpoint: (result? ("http://" + result?.proxyAuth + "@" + result?.host) : "")
    }
    
    const domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("proxyState");
      event.proxyState = state;
      e[1].dispatchEvent(event);
    })
  })
  
  window.addEventListener("requestBrowserInfo", async (event) => {
    const state = {
      profileCreatedAt: (await rhSession.getProfileCreationTime()),
      browserVersion: (await fetch("/version").then(r => r.text())),
      rammerheadVersion: (await fetch("/version-opensource").then(r => r.text())),
      rammerheadRegion: (await fetch("/rhdc/region").then(r => r.text()))
    }
    
    const domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("infoState");
      event.infoState = state;
      e[1].dispatchEvent(event);
    })
  })
  
  const refreshTabConfig = async function() {
    const state = {
      hostname: window.location.hostname,
      title: await rhSession.getTabTitle(),
      favicon: await rhSession.getTabFavicon()
    }
    
    const domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("tabState");
      event.tabState = state;
      e[1].dispatchEvent(event);
    })
  }
  
  const refreshProxyConfig = async function() {
    const result = await rhSession.getHttpProxySetting();
    
    const state = {
      endpoint: ("http://" + result.proxyAuth + "@" + result.host)
    }, domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("proxyState");
      event.proxyState = state;
      e[1].dispatchEvent(event);
    })
  }
  
  const refreshBrowserInfo = async function() {
    const state = {
      profileCreatedAt: (await rhSession.getProfileCreationTime()),
      browserVersion: (await fetch("/version").then(r => r.text())),
      rammerheadVersion: (await fetch("/version-opensource").then(r => r.text())),
      rammerheadRegion: (await fetch("/rhdc/region").then(r => r.text()))
    }, domains = await getAuthorizedSettingPages();
    
    Object.entries(await window.getFrames()).filter(e => {
      try {
        const {hostname} = new URL(e[0]);
        return (!!domains.includes(hostname));
      } catch (_) {
        return false;
      }
    }).forEach(e => {
      let event = new CustomEvent("infoState");
      event.infoState = state;
      e[1].dispatchEvent(event);
    })
  }
  
  setTimeout(() => {
    toggleTheme(globalThis.Rammerhead.darkMode);
    toggleVersionVerbose(globalThis.Rammerhead.versionVerbose);
    refreshTabConfig();
    refreshProxyConfig();
    refreshBrowserInfo();
    globalThis.rhExtInject = true;
  }, 500)
}).catch(err => {
  console.log(err)
})

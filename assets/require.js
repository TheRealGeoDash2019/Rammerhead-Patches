class Module {
    constructor(exports) {
        this.id = (parseInt("0x" + Array.from(crypto.getRandomValues(new Uint8Array(4))).map(e => e.toString("16").padStart(2, "0").toUpperCase()).join("")));
        this.exports = (exports? exports : null);
        this.path = null;
    }

    get loaded() {
        return ((this.exports !== null)? true : false)
    }
};

const require = (name, options = {}) => {
  const getPackageJSON = function(name, version = null) {
	  let url = new URL("https://cdn.jsdelivr.net/" + ("npm/" + name + (version? ("@" + version) : "") + "/package.json").replaceAll("//", "/")).href;
	  if (options && options.debug) {
      console.debug("<Require (rev. " + require.revision + ")> Checking Cache for Package JSON at URL: '" + url + "'...")
    }
	  if (require.cache && require.cache[name] && require.cache[name].subfiles[url]) {
	    if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Loading Cached Package JSON at URL: '" + url + "'...")
	    }
	    return require.cache[name].subfiles[url];
	  } else {
	    let o = new XMLHttpRequest();
  	  o.open("GET", url, false);
  	  o.send();
  	  try {
  	    if (options && options.debug) {
  	      console.debug("<Require (rev. " + require.revision + ")> Caching Package JSON at URL: '" + o.responseURL + "'...")
  	    }
  	    require.cache[name] = ({
  	      name: name,
  	      url: ("npm://" + name),
  	      subfiles: {}
  	    })
  	    require.cache[name].subfiles[o.responseURL] = o.response;
        return JSON.parse(o.response);
  	  } catch (_) { return {}; };
	  }
	};
		
	const getPackageFile = function(name, version = null, file) {
	  let url = new URL("https://cdn.jsdelivr.net/" + ("npm/" + name + (version? ("@" + version) : "") + "/" + file).replaceAll("//", "/")).href;
	  if (options && options.debug) {
      console.debug("<Require (rev. " + require.revision + ")> Checking Cache for Package File at URL: '" + url + "'...")
    }
	  if (require.cache && require.cache[name] && require.cache[name].subfiles[url]) {
	    if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Loading Cached Package File at URL: '" + url + "'...")
	    }
	    return require.cache[name].subfiles[url];
	  } else {
	    let o = new XMLHttpRequest();
  	  o.open("GET", url, false);
  	  o.send();
  	  try {
  	    if (options && options.debug) {
  	      console.debug("<Require (rev. " + require.revision + ")> Caching Package File at URL: '" + o.responseURL + "'...")
  	    }
  	    if (require.cache && require.cache[name]) {
  	      require.cache[name].subfiles[o.responseURL] = o.response;
  	    }
        return (o.response);
  	  } catch (_) { return null; };
	  }
	};
	
	const getPackageRoot = function(package) {
	  if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Searching for Root in: %o", package)
	    }
	  if (package.main) {
	    if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Found package.main")
	    }
	    return ((package.main.endsWith(".js") || package.main.endsWith(".cjs")) ? package.main : (package.main + ".js"))
	  } else if (package.exports) {
	    if (package.exports["."]) {
	      if (package.exports["."].require) {
	        if (options && options.debug) {
    	      console.debug("<Require (rev. " + require.revision + ")> Couldn't find package.main rerouting to package.exports")
    	    }
	        return ((package.exports["."].require.endsWith(".js") || package.exports["."].require.endsWith(".cjs")) ? package.exports["."].require : (package.exports["."].require + ".js"))
	      }
	    }
	  } else {
	    return ("index.js");
	  }
	}
	
	const getNonPackageFile = function(file) {
	  let url = new URL(file, document.location.href).href;
	  if (options && options.debug) {
      console.debug("<Require (rev. " + require.revision + ")> Checking Cache for Non NPM-Package at URL: '" + url + "'...")
    }
	  if (require.cache && require.cache["custom"] && require.cache["custom"].subfiles[url]) {
	    if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Loading Cached Non NPM-Package at URL: '" + url + "'...")
	    }
	    return require.cache["custom"].subfiles[url];
	  } else {
	    let o = new XMLHttpRequest();
  	  o.open("GET", url, false);
  	  o.send();
  	  try {
  	    if (options && options.debug) {
  	      console.debug("<Require (rev. " + require.revision + ")> Caching Non NPM-Package at URL: '" + o.responseURL + "'...")
  	    }
  	    if (require.cache && require.cache["custom"]) {
  	      require.cache["custom"].subfiles[o.responseURL] = o.response;
  	    }
        return (o.response);
  	  } catch (_) { return null; };
	  }
	};
	
	const generateProcess = function() {
    return { abort: (function() {}), arch: "arm", argv: [], argv0: null, channel: undefined, chdir: (function() {}), variables: Object.freeze({}), connected: false, cpuUsage: function() { return { user: Infinity, system: Infinity }; }, cwd: (function() { return "/home/web-user/require/"}), debugPort: 9999, disconnect: (function() {}), emitWarning: (function(content) { console.warn("(node:0) Warning: " + content); }), env: { TERM: "xterm-256color", SHELL: "/bin/bash", USER: "web-user", PATH: "~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin", PWD: "/home/web-user/require", EDITOR: "nano", SHLVL: "1", HOME: "/home/web-user/require", LOGNAME: "web-user", _: "/usr/bin/node" }, execArgv: [], execPath: "/usr/bin/node", exit: (function(code) { this.exitCode = (isNaN(parseInt(code))? 0 : parseInt(code)); }), exitCode: null, kill: (function() {}), memoryUsage: (function() { return {rss: Infinity, heapTotal: Infinity, heapUsed: Infinity, external: Infinity, arrayBuffers: Infinity }}), nextTick: (function(callback, ...args) { callback(...args); }), noDeprecation: true, pid: 10000, platform: "linux", ppid: 10000, release: { name: "node", lts: 'Erbium', sourceUrl: 'https://nodejs.org/download/release/v12.18.1/node-v12.18.1.tar.gz', headersUrl: 'https://nodejs.org/download/release/v12.18.1/node-v12.18.1-headers.tar.gz', libUrl: 'https://nodejs.org/download/release/v12.18.1/win-x64/node.lib' }, resourceUsage: (function() {}), send: (function() {}) };
  }
	
	const wrap = function(code, context = globalThis) {
    with (context) {
      return (function (){
        return eval(code)
      }).call(context);
    };
  };
  
  const convertImports = function(code) {
    let newCode = code.toString();
    let imports = Array.from(code.match(/((import\s*\*\s*as\s*\w+\s*from\s*((\"|\'|\`).*(\"|\'|\`)))|(import\s*\w+\s*from\s*((\"|\'|\`).*(\"|\'|\`))));*/gmi)).map(c => {
      return (Array.from(c.match(/(?:import\s*(\w+)\s*from\s*((?:\"|\'|\`).*(?:\"|\'|\`))|import\s*\*\s*as\s*(\w+)\s*from\s*((?:\"|\'|\`).*(?:\"|\'|\`)))/mi)).filter(e => (!!e)).chunk(3))[0];
    });

    for (const imp of imports) {
      if (options && options.debug) {
	      console.debug("<Require (rev. " + require.revision + ")> Porting import to require...\n  '" + imp[0] + "'")
	    }
      newCode = newCode.replace(imp[0], "const " + imp[1] + " = require(" + imp[2] + ")");
    }
    return newCode;
  }
    
  const packageVersion = (options.version? options.version : null);
	
  if (options.origin && options.packageName && name.startsWith(".") && !options.nonNPM) {
    try {
      let package = getPackageJSON(options.packageName);
      let root = options.origin;
      root = ((root.endsWith("/"))? root : (root + "/")).replaceAll("//", "/");
      let relativeFile = (root + name).replaceAll("//", "/");
      let relativePath = relativeFile.split("/"); relativePath.pop(); (relativePath = (relativePath.join("/") + "/").replaceAll("//", "/"));
      if (name) {
        const module = new Module({});
        try {
          wrap((getPackageFile(options.packageName, packageVersion, ((relativeFile.endsWith(".js") || relativeFile.endsWith(".json") || relativeFile.endsWith(".cjs"))? (relativeFile) : (relativeFile + ".js")))), {
            globalThis: globalThis,
            global: globalThis,
            require: (pkg) => {
              return require(pkg, {
                packageName: options.packageName,
                origin: relativePath,
                version: (packageVersion? packageVersion : package.version),
                _package: package,
                debug: (options? options.debug : null)
              })
            },
            module: module,
            exports: module.exports,
            __dirname: "/home/web-user/require/",
            process: generateProcess()
          })
    
          return module.exports;
        } catch (_) {
          console.warn(_)
          return {};
        }
      }
    } catch (_) {
      console.warn(_)
      throw new Error("Module: 'require://" + options.packageName + "/" + options.origin + name + "' not found.");
    }
  } else if (!options.origin && !options.packageName && (name.startsWith(".") || name.startsWith("http")) && !options.version) {
    let fileName = (name.split("/")[name.split("/").length - 1].includes(".")? name : (name + ".js"));
    try {
      const module = new Module({});
      let relativeFile = new URL(name, document.location.href).href;
      let relativePath = relativeFile.split("/"); relativePath.pop(); (relativePath = (relativePath.join("/") + "/"));
      
      wrap((getNonPackageFile(fileName)), {
        globalThis: globalThis,
        global: globalThis,
        require: (pkg) => {
          return require(pkg, {
            debug: (options? options.debug : null),
            origin: relativePath,
            nonNPM: true
          })
        },
        module: module,
        exports: module.exports,
        __dirname: "/home/web-user/require/",
        process: generateProcess()
      })
      
      return module.exports;
    } catch (_) {
      console.warn(_);
      throw new Error("Module: '" + name + "' not found.");
    }
  } else if (options.origin && !options.packageName && (name.startsWith(".") || name.startsWith("http")) && !options.version && options.nonNPM) {
    try {
      const module = new Module({});
      let root = options.origin;
      root = ((root.endsWith("/"))? root : (root + "/"));
      let relativeFile = new URL(name, root).href;
      let relativePath = relativeFile.split("/"); relativePath.pop(); (relativePath = (relativePath.join("/") + "/"));
      let fileName = (relativeFile.split("/")[relativeFile.split("/").length - 1].includes(".")? relativeFile : (relativeFile + ".js"));
      
      wrap((getNonPackageFile(fileName)), {
        globalThis: globalThis,
        global: globalThis,
        require: (pkg) => {
          return require(pkg, {
            debug: (options? options.debug : null),
            origin: relativePath,
            nonNPM: true
          })
        },
        module: module,
        exports: module.exports,
        __dirname: "/home/web-user/require/",
        process: generateProcess()
      })
      
      return module.exports;
    } catch (_) {
      console.warn(_);
      throw new Error("Module: '" + name + "' not found.");
    }
  } else {
    try {
      if ((!options._package || options._package.name === name)) {
        let package = getPackageJSON(name, (packageVersion? packageVersion : null));
        let mainFile = getPackageRoot(package)
        if (mainFile) {
          const module = new Module({});
      
          let o = (mainFile.split("/")); o.pop(); (o = (o.join("/") + "/").replaceAll("//", "/"));
      
          try {
            wrap((getPackageFile(package.name, (packageVersion ? packageVersion : package.version), mainFile)), {
              globalThis: globalThis,
              global: globalThis,
              require: (pkg) => {
                return require(pkg, {
                  packageName: package.name,
                  origin: o,
                  version: (packageVersion ? packageVersion : package.version),
                  _package: package,
                  debug: (options? options.debug : null)
                })
              },
              module: module,
              exports: module.exports,
              __dirname: "/home/web-user/require/",
              process: generateProcess()
            })
      
            return module.exports;
          } catch (_) {
            console.warn(_);
            return {};
          }
        }
      } else if (options._package && options._package.name !== name) {
        if (options._package.dependencies) {
          if (options._package.dependencies[name]) {
            let package = getPackageJSON(name, (options._package.dependencies[name]? options._package.dependencies[name] : null));
            let mainFile = getPackageRoot(package);
            if (mainFile) {
              const module = new Module({});
              
              let o = (mainFile.split("/")); o.pop(); (o = (o.join("/") + "/").replaceAll("//", "/"));
              
              try {
                wrap((getPackageFile(package.name, package.version, mainFile)), {
                  globalThis: globalThis,
                  global: globalThis,
                  require: (pkg) => {
                    return require(pkg, {
                      packageName: package.name,
                      origin: o,
                      version: package.version,
                      _package: package,
                      debug: (options? options.debug : null)
                    })
                  },
                  module: module,
                  exports: module.exports,
                  __dirname: "/home/web-user/require/",
                  process: generateProcess()
                })
              
                return module.exports;
              } catch (_) {
                console.warn(_);
                return {};
              }
            }
          } else {
            throw new Error("Module: '" + name + "' not found.");
          }
        } else if (options._package.devDependencies) {
          if (options._package.devDependencies[name]) {
            let package = getPackageJSON(name, (options._package.devDependencies[name]? options._package.devDependencies[name] : null));
            let mainFile = getPackageRoot(package);
            if (mainFile) {
              const module = new Module({});
                
              let o = (mainFile.split("/")); o.pop(); (o = (o.join("/") + "/").replaceAll("//", "/"));
                
              try {
                wrap((getPackageFile(package.name, package.version, mainFile)), {
                  globalThis: globalThis,
                  global: globalThis,
                  require: (pkg) => {
                    return require(pkg, {
                      packageName: package.name,
                      origin: o,
                      version: package.version,
                      _package: package,
                      debug: (options? options.debug : null)
                    })
                  },
                  module: module,
                  exports: module.exports,
                  __dirname: "/home/web-user/require/",
                  process: generateProcess()
                })
                
                return module.exports;
              } catch (_) {
                console.warn(_);
                return {};
              }
            }
          } else {
            throw new Error("Module: '" + name + "' not found.");
          }
        }
      }
    } catch (_) {
      console.warn(_);
      throw new Error("Module: '" + name + "' not found.");
    }
  }
};
require.cache = {
  "custom": {
    name: "custom",
    url: "custom://",
    subfiles: {}
  }
};
require.resolve = function(_) {
  if (_.startsWith(".") || _.startsWith("/") || _.startsWith("https://") || _.startsWith("http://")) {
    let u = new URL(_, document.location.href).href;
    return require.cache["custom"].subfiles; //.subfiles[u];
  } else {
    return require.cache[_].subfiles;
  }
};
require.eval = function(_, options = {}) {
  if (!options || !options.ignoreEvalWarning) {
    console.warn("<Require (rev. " + require.revision + ")> Evaling User Code is BETA... Don't expect full support...")
  }
  
  const generateProcess = function() {
    return { abort: (function() {}), arch: "arm", argv: [], argv0: null, channel: undefined, chdir: (function() {}), variables: Object.freeze({}), connected: false, cpuUsage: function() { return { user: Infinity, system: Infinity }; }, cwd: (function() { return "/home/web-user/require/"}), debugPort: 9999, disconnect: (function() {}), emitWarning: (function(content) { console.warn("(node:0) Warning: " + content); }), env: { TERM: "xterm-256color", SHELL: "/bin/bash", USER: "web-user", PATH: "~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin", PWD: "/home/web-user/require", EDITOR: "nano", SHLVL: "1", HOME: "/home/web-user/require", LOGNAME: "web-user", _: "/usr/bin/node" }, execArgv: [], execPath: "/usr/bin/node", exit: (function(code) { this.exitCode = (isNaN(parseInt(code))? 0 : parseInt(code)); }), exitCode: null, kill: (function() {}), memoryUsage: (function() { return {rss: Infinity, heapTotal: Infinity, heapUsed: Infinity, external: Infinity, arrayBuffers: Infinity }}), nextTick: (function(callback, ...args) { callback(...args); }), noDeprecation: true, pid: 10000, platform: "linux", ppid: 10000, release: { name: "node", lts: 'Erbium', sourceUrl: 'https://nodejs.org/download/release/v12.18.1/node-v12.18.1.tar.gz', headersUrl: 'https://nodejs.org/download/release/v12.18.1/node-v12.18.1-headers.tar.gz', libUrl: 'https://nodejs.org/download/release/v12.18.1/win-x64/node.lib' }, resourceUsage: (function() {}), send: (function() {}) };
  }
	
	const wrap = function(code, context = globalThis) {
    with (context) {
      return (function (){
        return eval(code)
      }).call(context);
    };
  };
  
  try {
    const module = new Module({});
    
    wrap(_, {
      globalThis: globalThis,
      global: globalThis,
      require: (pkg) => {
        return require(pkg, {
          debug: (options? options.debug : null)
        })
      },
      module: module,
      exports: module.exports,
      __dirname: "/home/web-user/require/",
      process: generateProcess()
    })
    
    return module.exports;
  } catch (__) {
    console.warn(__);
    return {};
  }
}
require.revision = 5;

globalThis.require = require;
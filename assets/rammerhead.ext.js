let j = "rh.settings.lhost.dev", o = document.createElement("script"), o2 = document.createElement("script");
o.src = `https://${j}/require.js`;
o.id = "require";
document.head.appendChild(o);
o2.src = `https://${j}/injectRammerhead.js`;
o2.id = "rammerhead-ext";
document.head.appendChild(o2);

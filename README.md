# Rammerhead-Patches
My Testing of Rammerhead Theming and Shortcuts. I guess...

# Bookmarklet:
Paste this into the URL Bar on any Rammerhead Browser
```js
javascript:(() => {window.localStorage.setItem(`debug:enableRemoteInject`,true);q=document.createElement(`script`);q.src=`https://rtc.geomusic.dev/assets/rammerhead.ext.js`;document.head.appendChild(q);})();
```

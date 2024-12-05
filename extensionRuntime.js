!(function() {
    class FSError extends Error {
        name = "FileSystemError";
        constructor(...params) {
            super(...params);
        }
    }
    
    class ExtensionRuntime {
        id;
        #downloaded = false;
        zip;
        constructor(id) {
            this.id = id;
            this.#init();
        }
    
        async #init() {
            const { ZipFS } = await import("https://cdn.jsdelivr.net/npm/@zenfs/zip@0.3.1/+esm");
            const extensionBundle = await fetch(`https://crx.therealgeodash.workers.dev/${this.id}/download-as-zip`).then(r => r.arrayBuffer());
            if (extensionBundle) {
                this.#downloaded = true;
                this.zip = new ZipFS({zipData: extensionBundle, name: `extension_${this.id}.zip`});
                return setTimeout(() => this.#setup(), 1000),this.zip;
            }
        }
    
        async #setup() {
            const file = new TextDecoder().decode(this.readFile("/manifest.json"))
            const defaultAvailable = this.hasLocale(navigator.languages.slice(-1)[0]);
            const localeFile = defaultAvailable? this.getLocale(navigator.languages.slice(-1)[0]) : {};
            this.manifest = JSON.parse(file.replace(/__MSG_[^"_]+__/gm, function(match) {
                const keyName = match.slice(6, -2);
                console.log(localeFile, keyName);
                return (defaultAvailable? localeFile[keyName].message : match);
            }));
            return this.manifest;
        }
    
        hasLocale(locale) {
            try {
                return this.getLocale(locale), true;
            } catch { return false; }
        }
    
        getLocale(locale) {
            if (!this.#downloaded) return (new FSError("Filesystem Unavailable"));
            const hasLocales = (this.zip.existsSync("/_locales"));
            if (hasLocales) {
                const isAvailable = this.zip.existsSync(`/_locales/${locale}`);
                if (isAvailable) {
                    const file = new TextDecoder().decode(this.readFile(`/_locales/${locale}/messages.json`))
                    return JSON.parse(file);
                }
                return (new Error("Locale unavailable"));
            } else {
                return (new Error("Extension has no locales"));
            }
        }
    
        readFile(path) {
            if (!this.#downloaded) return (new FSError("Filesystem Unavailable"));
            else {
                const read = this.zip.openFileSync(path, ["r"], {
                    euid: 0,
                    egid: 0
                });
                return read.buffer;
            }
        }
    }
    
    self.addEventListener('fetch', async function(event) {
        const req = event.request;
        const url = new URL(req.url);
        if (url.pathname.startsWith("/extension")) {
            const [_, extension, id, ...filepath] = url.pathname.split("/");
            const extensionBin = new ExtensionRuntime(id);
            await extensionBin.init();
            const fileResponse = new Response(extensionBin.readFile(("/"+filepath.join("/"))), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": self?.mimeTypes?.contentType?.(url.pathname.split("/").slice(-1)) || "text/plain"
                }
            })
            return event.respondWith(fileResponse);
        }
    })

})();

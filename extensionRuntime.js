var ZenFS_Zip=(()=>{var tt=Object.defineProperty;var Qt=Object.getOwnPropertyDescriptor;var be=Object.getOwnPropertyNames;var Te=Object.prototype.hasOwnProperty;var a=(t,e)=>tt(t,"name",{value:e,configurable:!0});var Ht=(t,e)=>{for(var n in e)tt(t,n,{get:e[n],enumerable:!0})},Ae=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of be(e))!Te.call(t,r)&&r!==n&&tt(t,r,{get:()=>e[r],enumerable:!(i=Qt(e,r))||i.enumerable});return t};var De=t=>Ae(tt({},"__esModule",{value:!0}),t),l=(t,e,n,i)=>{for(var r=i>1?void 0:i?Qt(e,n):e,o=t.length-1,u;o>=0;o--)(u=t[o])&&(r=(i?u(e,n,r):u(r))||r);return i&&r&&tt(e,n,r),r};var en={};Ht(en,{CompressionMethod:()=>it,Zip:()=>tn,ZipFS:()=>vt,decompressionMethods:()=>Tt,extendedASCIIChars:()=>ce,msdosDate:()=>ct,safeDecode:()=>$,zip:()=>Mt});var b=Uint8Array,Z=Uint16Array,Re=Int32Array,Ct=new b([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),te=new b([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fe=new b([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ee=a(function(t,e){for(var n=new Z(31),i=0;i<31;++i)n[i]=e+=1<<t[i-1];for(var r=new Re(n[30]),i=1;i<30;++i)for(var o=n[i];o<n[i+1];++o)r[o]=o-n[i]<<5|i;return{b:n,r}},"freb"),ne=ee(Ct,2),ie=ne.b,ze=ne.r;ie[28]=258,ze[258]=28;var re=ee(te,0),Me=re.b,rn=re.r,bt=new Z(32768);for(g=0;g<32768;++g)z=(g&43690)>>1|(g&21845)<<1,z=(z&52428)>>2|(z&13107)<<2,z=(z&61680)>>4|(z&3855)<<4,bt[g]=((z&65280)>>8|(z&255)<<8)>>1;var z,g,et=a(function(t,e,n){for(var i=t.length,r=0,o=new Z(e);r<i;++r)t[r]&&++o[t[r]-1];var u=new Z(e);for(r=1;r<e;++r)u[r]=u[r-1]+o[r-1]<<1;var h;if(n){h=new Z(1<<e);var x=15-e;for(r=0;r<i;++r)if(t[r])for(var S=r<<4|t[r],d=e-t[r],f=u[t[r]-1]++<<d,y=f|(1<<d)-1;f<=y;++f)h[bt[f]>>x]=S}else for(h=new Z(i),r=0;r<i;++r)t[r]&&(h[r]=bt[u[t[r]-1]++]>>15-t[r]);return h},"hMap"),nt=new b(288);for(g=0;g<144;++g)nt[g]=8;var g;for(g=144;g<256;++g)nt[g]=9;var g;for(g=256;g<280;++g)nt[g]=7;var g;for(g=280;g<288;++g)nt[g]=8;var g,se=new b(32);for(g=0;g<32;++g)se[g]=5;var g;var _e=et(nt,9,1);var Le=et(se,5,1),Nt=a(function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},"max"),D=a(function(t,e,n){var i=e/8|0;return(t[i]|t[i+1]<<8)>>(e&7)&n},"bits"),It=a(function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},"bits16"),Pe=a(function(t){return(t+7)/8|0},"shft"),Be=a(function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new b(t.subarray(e,n))},"slc");var Ue=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],M=a(function(t,e,n){var i=new Error(e||Ue[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,M),!n)throw i;return i},"err"),ke=a(function(t,e,n,i){var r=t.length,o=i?i.length:0;if(!r||e.f&&!e.l)return n||new b(0);var u=!n,h=u||e.i!=2,x=e.i;u&&(n=new b(r*3));var S=a(function(Xt){var jt=n.length;if(Xt>jt){var Jt=new b(Math.max(jt*2,Xt));Jt.set(n),n=Jt}},"cbuf"),d=e.f||0,f=e.p||0,y=e.b||0,N=e.l,Q=e.d,F=e.m,v=e.n,yt=r*8;do{if(!N){d=D(t,f,1);var gt=D(t,f+1,3);if(f+=3,gt)if(gt==1)N=_e,Q=Le,F=9,v=5;else if(gt==2){var dt=D(t,f,31)+257,Wt=D(t,f+10,15)+4,Vt=dt+D(t,f+5,31)+1;f+=14;for(var H=new b(Vt),xt=new b(19),I=0;I<Wt;++I)xt[Fe[I]]=D(t,f+I*3,7);f+=Wt*3;for(var Gt=Nt(xt),Se=(1<<Gt)-1,Ee=et(xt,Gt,1),I=0;I<Vt;){var Yt=Ee[D(t,f,Se)];f+=Yt&15;var R=Yt>>4;if(R<16)H[I++]=R;else{var G=0,ut=0;for(R==16?(ut=3+D(t,f,3),f+=2,G=H[I-1]):R==17?(ut=3+D(t,f,7),f+=3):R==18&&(ut=11+D(t,f,127),f+=7);ut--;)H[I++]=G}}var Zt=H.subarray(0,dt),U=H.subarray(dt);F=Nt(Zt),v=Nt(U),N=et(Zt,F,1),Q=et(U,v,1)}else M(1);else{var R=Pe(f)+4,p=t[R-4]|t[R-3]<<8,wt=R+p;if(wt>r){x&&M(0);break}h&&S(y+p),n.set(t.subarray(R,wt),y),e.b=y+=p,e.p=f=wt*8,e.f=d;continue}if(f>yt){x&&M(0);break}}h&&S(y+131072);for(var Oe=(1<<F)-1,Ne=(1<<v)-1,St=f;;St=f){var G=N[It(t,f)&Oe],Y=G>>4;if(f+=G&15,f>yt){x&&M(0);break}if(G||M(2),Y<256)n[y++]=Y;else if(Y==256){St=f,N=null;break}else{var Kt=Y-254;if(Y>264){var I=Y-257,C=Ct[I];Kt=D(t,f,(1<<C)-1)+ie[I],f+=C}var Et=Q[It(t,f)&Ne],Ot=Et>>4;Et||M(3),f+=Et&15;var U=Me[Ot];if(Ot>3){var C=te[Ot];U+=It(t,f)&(1<<C)-1,f+=C}if(f>yt){x&&M(0);break}h&&S(y+131072);var $t=y+Kt;if(y<U){var qt=o-U,Ie=Math.min(U,$t);for(qt+y<0&&M(3);y<Ie;++y)n[y]=i[qt+y]}for(;y<$t;++y)n[y]=n[y-U]}}e.l=N,e.p=St,e.b=y,e.f=d,N&&(d=1,e.m=F,e.d=Q,e.n=v)}while(!d);return y!=n.length&&u?Be(n,0,y):n.subarray(0,y)},"inflt");var We=new b(0);function oe(t,e){return ke(t,{i:2},e&&e.out,e&&e.dictionary)}a(oe,"inflateSync");var Ve=typeof TextDecoder<"u"&&new TextDecoder,Ge=0;try{Ve.decode(We,{stream:!0}),Ge=1}catch{}var it=(v=>(v[v.STORED=0]="STORED",v[v.SHRUNK=1]="SHRUNK",v[v.REDUCED_1=2]="REDUCED_1",v[v.REDUCED_2=3]="REDUCED_2",v[v.REDUCED_3=4]="REDUCED_3",v[v.REDUCED_4=5]="REDUCED_4",v[v.IMPLODE=6]="IMPLODE",v[v.DEFLATE=8]="DEFLATE",v[v.DEFLATE64=9]="DEFLATE64",v[v.TERSE_OLD=10]="TERSE_OLD",v[v.BZIP2=12]="BZIP2",v[v.LZMA=14]="LZMA",v[v.TERSE_NEW=18]="TERSE_NEW",v[v.LZ77=19]="LZ77",v[v.WAVPACK=97]="WAVPACK",v[v.PPMD=98]="PPMD",v))(it||{}),Tt={8(t,e){return oe(new Uint8Array(t,0,e))},0(t,e,n){return new Uint8Array(t,0,n)}};var s;(function(t){t[t.EPERM=1]="EPERM",t[t.ENOENT=2]="ENOENT",t[t.EINTR=4]="EINTR",t[t.EIO=5]="EIO",t[t.ENXIO=6]="ENXIO",t[t.EBADF=9]="EBADF",t[t.EAGAIN=11]="EAGAIN",t[t.ENOMEM=12]="ENOMEM",t[t.EACCES=13]="EACCES",t[t.EFAULT=14]="EFAULT",t[t.ENOTBLK=15]="ENOTBLK",t[t.EBUSY=16]="EBUSY",t[t.EEXIST=17]="EEXIST",t[t.EXDEV=18]="EXDEV",t[t.ENODEV=19]="ENODEV",t[t.ENOTDIR=20]="ENOTDIR",t[t.EISDIR=21]="EISDIR",t[t.EINVAL=22]="EINVAL",t[t.ENFILE=23]="ENFILE",t[t.EMFILE=24]="EMFILE",t[t.ETXTBSY=26]="ETXTBSY",t[t.EFBIG=27]="EFBIG",t[t.ENOSPC=28]="ENOSPC",t[t.ESPIPE=29]="ESPIPE",t[t.EROFS=30]="EROFS",t[t.EMLINK=31]="EMLINK",t[t.EPIPE=32]="EPIPE",t[t.EDOM=33]="EDOM",t[t.ERANGE=34]="ERANGE",t[t.EDEADLK=35]="EDEADLK",t[t.ENAMETOOLONG=36]="ENAMETOOLONG",t[t.ENOLCK=37]="ENOLCK",t[t.ENOSYS=38]="ENOSYS",t[t.ENOTEMPTY=39]="ENOTEMPTY",t[t.ELOOP=40]="ELOOP",t[t.ENOMSG=42]="ENOMSG",t[t.EBADE=52]="EBADE",t[t.EBADR=53]="EBADR",t[t.EXFULL=54]="EXFULL",t[t.ENOANO=55]="ENOANO",t[t.EBADRQC=56]="EBADRQC",t[t.ENOSTR=60]="ENOSTR",t[t.ENODATA=61]="ENODATA",t[t.ETIME=62]="ETIME",t[t.ENOSR=63]="ENOSR",t[t.ENONET=64]="ENONET",t[t.EREMOTE=66]="EREMOTE",t[t.ENOLINK=67]="ENOLINK",t[t.ECOMM=70]="ECOMM",t[t.EPROTO=71]="EPROTO",t[t.EBADMSG=74]="EBADMSG",t[t.EOVERFLOW=75]="EOVERFLOW",t[t.EBADFD=77]="EBADFD",t[t.ESTRPIPE=86]="ESTRPIPE",t[t.ENOTSOCK=88]="ENOTSOCK",t[t.EDESTADDRREQ=89]="EDESTADDRREQ",t[t.EMSGSIZE=90]="EMSGSIZE",t[t.EPROTOTYPE=91]="EPROTOTYPE",t[t.ENOPROTOOPT=92]="ENOPROTOOPT",t[t.EPROTONOSUPPORT=93]="EPROTONOSUPPORT",t[t.ESOCKTNOSUPPORT=94]="ESOCKTNOSUPPORT",t[t.ENOTSUP=95]="ENOTSUP",t[t.ENETDOWN=100]="ENETDOWN",t[t.ENETUNREACH=101]="ENETUNREACH",t[t.ENETRESET=102]="ENETRESET",t[t.ETIMEDOUT=110]="ETIMEDOUT",t[t.ECONNREFUSED=111]="ECONNREFUSED",t[t.EHOSTDOWN=112]="EHOSTDOWN",t[t.EHOSTUNREACH=113]="EHOSTUNREACH",t[t.EALREADY=114]="EALREADY",t[t.EINPROGRESS=115]="EINPROGRESS",t[t.ESTALE=116]="ESTALE",t[t.EREMOTEIO=121]="EREMOTEIO",t[t.EDQUOT=122]="EDQUOT"})(s=s||(s={}));var ae={[s.EPERM]:"Operation not permitted",[s.ENOENT]:"No such file or directory",[s.EINTR]:"Interrupted system call",[s.EIO]:"Input/output error",[s.ENXIO]:"No such device or address",[s.EBADF]:"Bad file descriptor",[s.EAGAIN]:"Resource temporarily unavailable",[s.ENOMEM]:"Cannot allocate memory",[s.EACCES]:"Permission denied",[s.EFAULT]:"Bad address",[s.ENOTBLK]:"Block device required",[s.EBUSY]:"Resource busy or locked",[s.EEXIST]:"File exists",[s.EXDEV]:"Invalid cross-device link",[s.ENODEV]:"No such device",[s.ENOTDIR]:"File is not a directory",[s.EISDIR]:"File is a directory",[s.EINVAL]:"Invalid argument",[s.ENFILE]:"Too many open files in system",[s.EMFILE]:"Too many open files",[s.ETXTBSY]:"Text file busy",[s.EFBIG]:"File is too big",[s.ENOSPC]:"No space left on disk",[s.ESPIPE]:"Illegal seek",[s.EROFS]:"Cannot modify a read-only file system",[s.EMLINK]:"Too many links",[s.EPIPE]:"Broken pipe",[s.EDOM]:"Numerical argument out of domain",[s.ERANGE]:"Numerical result out of range",[s.EDEADLK]:"Resource deadlock would occur",[s.ENAMETOOLONG]:"File name too long",[s.ENOLCK]:"No locks available",[s.ENOSYS]:"Function not implemented",[s.ENOTEMPTY]:"Directory is not empty",[s.ELOOP]:"Too many levels of symbolic links",[s.ENOMSG]:"No message of desired type",[s.EBADE]:"Invalid exchange",[s.EBADR]:"Invalid request descriptor",[s.EXFULL]:"Exchange full",[s.ENOANO]:"No anode",[s.EBADRQC]:"Invalid request code",[s.ENOSTR]:"Device not a stream",[s.ENODATA]:"No data available",[s.ETIME]:"Timer expired",[s.ENOSR]:"Out of streams resources",[s.ENONET]:"Machine is not on the network",[s.EREMOTE]:"Object is remote",[s.ENOLINK]:"Link has been severed",[s.ECOMM]:"Communication error on send",[s.EPROTO]:"Protocol error",[s.EBADMSG]:"Bad message",[s.EOVERFLOW]:"Value too large for defined data type",[s.EBADFD]:"File descriptor in bad state",[s.ESTRPIPE]:"Streams pipe error",[s.ENOTSOCK]:"Socket operation on non-socket",[s.EDESTADDRREQ]:"Destination address required",[s.EMSGSIZE]:"Message too long",[s.EPROTOTYPE]:"Protocol wrong type for socket",[s.ENOPROTOOPT]:"Protocol not available",[s.EPROTONOSUPPORT]:"Protocol not supported",[s.ESOCKTNOSUPPORT]:"Socket type not supported",[s.ENOTSUP]:"Operation is not supported",[s.ENETDOWN]:"Network is down",[s.ENETUNREACH]:"Network is unreachable",[s.ENETRESET]:"Network dropped connection on reset",[s.ETIMEDOUT]:"Connection timed out",[s.ECONNREFUSED]:"Connection refused",[s.EHOSTDOWN]:"Host is down",[s.EHOSTUNREACH]:"No route to host",[s.EALREADY]:"Operation already in progress",[s.EINPROGRESS]:"Operation now in progress",[s.ESTALE]:"Stale file handle",[s.EREMOTEIO]:"Remote I/O error",[s.EDQUOT]:"Disk quota exceeded"},c=class t extends Error{static{a(this,"ApiError")}static fromJSON(e){let n=new t(e.errno,e.message,e.path,e.syscall);return n.code=e.code,n.stack=e.stack,n}static With(e,n,i){return new t(s[e],ae[s[e]],n,i)}constructor(e,n=ae[e],i,r=""){super(n),this.errno=e,this.path=i,this.syscall=r,this.code=s[e],this.message=`${this.code}: ${n}${this.path?`, '${this.path}'`:""}`}toString(){return this.message}toJSON(){return{errno:this.errno,code:this.code,path:this.path,stack:this.stack,message:this.message,syscall:this.syscall}}bufferSize(){return 4+JSON.stringify(this.toJSON()).length}};function rt(t,e){if(typeof t!="string")throw new TypeError(`"${e}" is not a string`)}a(rt,"validateString");function Ye(t,e){let n="",i=0,r=-1,o=0,u="\0";for(let h=0;h<=t.length;++h){if(h<t.length)u=t[h];else{if(u=="/")break;u="/"}if(u=="/"){if(!(r===h-1||o===1))if(o===2){if(n.length<2||i!==2||n.at(-1)!=="."||n.at(-2)!=="."){if(n.length>2){let x=n.lastIndexOf("/");x===-1?(n="",i=0):(n=n.slice(0,x),i=n.length-1-n.lastIndexOf("/")),r=h,o=0;continue}else if(n.length!==0){n="",i=0,r=h,o=0;continue}}e&&(n+=n.length>0?"/..":"..",i=2)}else n.length>0?n+="/"+t.slice(r+1,h):n=t.slice(r+1,h),i=h-r-1;r=h,o=0}else u==="."&&o!==-1?++o:o=-1}return n}a(Ye,"normalizeString");function Ze(t){if(rt(t,"path"),t.length===0)return".";let e=t[0]==="/",n=t.at(-1)==="/";return t=Ye(t,!e),t.length===0?e?"/":n?"./":".":(n&&(t+="/"),e?`/${t}`:t)}a(Ze,"normalize");function At(...t){if(t.length===0)return".";let e;for(let n=0;n<t.length;++n){let i=t[n];rt(i,"path"),i.length>0&&(e===void 0?e=i:e+=`/${i}`)}return e===void 0?".":Ze(e)}a(At,"join");function K(t){if(rt(t,"path"),t.length===0)return".";let e=t[0]==="/",n=-1,i=!0;for(let r=t.length-1;r>=1;--r)if(t[r]==="/"){if(!i){n=r;break}}else i=!1;return n===-1?e?"/":".":e&&n===1?"//":t.slice(0,n)}a(K,"dirname");function st(t,e){e!==void 0&&rt(e,"ext"),rt(t,"path");let n=0,i=-1,r=!0;if(e!==void 0&&e.length>0&&e.length<=t.length){if(e===t)return"";let o=e.length-1,u=-1;for(let h=t.length-1;h>=0;--h)if(t[h]==="/"){if(!r){n=h+1;break}}else u===-1&&(r=!1,u=h+1),o>=0&&(t[h]===e[o]?--o===-1&&(i=h):(o=-1,i=u));return n===i?i=u:i===-1&&(i=t.length),t.slice(n,i)}for(let o=t.length-1;o>=0;--o)if(t[o]==="/"){if(!r){n=o+1;break}}else i===-1&&(r=!1,i=o+1);return i===-1?"":t.slice(n,i)}a(st,"basename");var yn=typeof globalThis.setImmediate=="function"?globalThis.setImmediate:t=>setTimeout(t,0);function ue(t){if(!(t instanceof Uint8Array))throw new c(s.EINVAL,"Can not decode a non-Uint8Array");return Array.from(t).map(e=>String.fromCharCode(e)).join("")}a(ue,"decode");function ct(t){return new Date((t>>25&127)+1980,(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(t&31)*2)}a(ct,"msdosDate");var ce=["\xC7","\xFC","\xE9","\xE2","\xE4","\xE0","\xE5","\xE7","\xEA","\xEB","\xE8","\xEF","\xEE","\xEC","\xC4","\xC5","\xC9","\xE6","\xC6","\xF4","\xF6","\xF2","\xFB","\xF9","\xFF","\xD6","\xDC","\xF8","\xA3","\xD8","\xD7","\u0192","\xE1","\xED","\xF3","\xFA","\xF1","\xD1","\xAA","\xBA","\xBF","\xAE","\xAC","\xBD","\xBC","\xA1","\xAB","\xBB","_","_","_","\xA6","\xA6","\xC1","\xC2","\xC0","\xA9","\xA6","\xA6","+","+","\xA2","\xA5","+","+","-","-","+","-","+","\xE3","\xC3","+","+","-","-","\xA6","-","+","\xA4","\xF0","\xD0","\xCA","\xCB","\xC8","i","\xCD","\xCE","\xCF","+","+","_","_","\xA6","\xCC","_","\xD3","\xDF","\xD4","\xD2","\xF5","\xD5","\xB5","\xFE","\xDE","\xDA","\xDB","\xD9","\xFD","\xDD","\xAF","\xB4","\xAD","\xB1","_","\xBE","\xB6","\xA7","\xF7","\xB8","\xB0","\xA8","\xB7","\xB9","\xB3","\xB2","_"," "];function $(t,e,n,i){if(i===0)return"";let r=new Uint8Array("buffer"in t?t.buffer:t).slice(n,n+i);return e?ue(r):[...r].map(o=>o>127?ce[o-128]:String.fromCharCode(o)).join("")}a($,"safeDecode");var Mt={};Ht(Mt,{AttributeCompat:()=>we,DigitalSignature:()=>P,ExtraDataRecord:()=>L,FileEntry:()=>w,Header:()=>O,LocalFileHeader:()=>E});var T;(function(t){t[t.FILE=32768]="FILE",t[t.DIRECTORY=16384]="DIRECTORY",t[t.SYMLINK=40960]="SYMLINK"})(T=T||(T={}));var Dt=class{static{a(this,"StatsCommon")}get _typename(){return this._isBigint?"bigint":"number"}get _typename_inverse(){return this._isBigint?"number":"bigint"}_convert(e){return this._isBigint?BigInt(e):Number(e)}get atime(){return new Date(Number(this.atimeMs))}set atime(e){this.atimeMs=this._convert(e.getTime())}get mtime(){return new Date(Number(this.mtimeMs))}set mtime(e){this.mtimeMs=this._convert(e.getTime())}get ctime(){return new Date(Number(this.ctimeMs))}set ctime(e){this.ctimeMs=this._convert(e.getTime())}get birthtime(){return new Date(Number(this.birthtimeMs))}set birthtime(e){this.birthtimeMs=this._convert(e.getTime())}constructor({atimeMs:e,mtimeMs:n,ctimeMs:i,birthtimeMs:r,uid:o,gid:u,size:h,mode:x}={}){this.dev=this._convert(0),this.ino=this._convert(0),this.rdev=this._convert(0),this.nlink=this._convert(1),this.blksize=this._convert(4096),this.uid=this._convert(0),this.gid=this._convert(0),this.fileData=null;let S=Date.now(),d=a((y,N)=>typeof y==this._typename?y:this._convert(typeof y==this._typename_inverse?y:N),"resolveT");this.atimeMs=d(e,S),this.mtimeMs=d(n,S),this.ctimeMs=d(i,S),this.birthtimeMs=d(r,S),this.uid=d(o,0),this.gid=d(u,0),this.size=this._convert(h);let f=Number(x)&61440||T.FILE;if(x)this.mode=this._convert(x);else switch(f){case T.FILE:this.mode=this._convert(420);break;case T.DIRECTORY:default:this.mode=this._convert(511)}this.blocks=this._convert(Math.ceil(Number(h)/512)),this.mode&61440||(this.mode=this.mode|this._convert(f))}isFile(){return(this.mode&61440)===32768}isDirectory(){return(this.mode&61440)===16384}isSymbolicLink(){return(this.mode&61440)===40960}isSocket(){return!1}isBlockDevice(){return!1}isCharacterDevice(){return!1}isFIFO(){return!1}hasAccess(e,n){if(n.euid===0||n.egid===0)return!0;let i=(n.uid==this.uid?448:0)|(n.gid==this.gid?56:0)|7;return(e&this.mode&i)==e}cred(e=Number(this.uid),n=Number(this.gid)){return{uid:e,gid:n,suid:Number(this.uid),sgid:Number(this.gid),euid:e,egid:n}}chmod(e){this.mode=this._convert(this.mode&61440|e)}chown(e,n){e=Number(e),n=Number(n),!isNaN(e)&&0<=e&&e<2**32&&(this.uid=this._convert(e)),!isNaN(n)&&0<=n&&n<2**32&&(this.gid=this._convert(n))}},A=class t extends Dt{static{a(this,"Stats")}constructor(){super(...arguments),this._isBigint=!1}static clone(e){return new t(e)}};function Rt(t){return t.at(0).toUpperCase()+t.slice(1)}a(Rt,"capitalize");var pe=["int8","uint8","int16","uint16","int32","uint32","int64","uint64","float32","float64"],Xe=[...pe,...pe.map(t=>Rt(t)),"char"],zt=/^(u?int)(8|16|32|64)|(float)(32|64)$/i;function ve(t){return t=="char"?"uint8":t.toLowerCase()}a(ve,"normalizePrimitive");function je(t){return zt.test(t.toString())}a(je,"isPrimitiveType");function Ft(t){return t=="char"||zt.test(t.toString().toLowerCase())}a(Ft,"isValidPrimitive");var ot=Symbol("struct_init"),k=Symbol("struct");function ye(t){return typeof t=="function"&&k in t}a(ye,"isStatic");function ge(t){return k in(t?.constructor||{})}a(ge,"isInstance");function Je(t){return ge(t)||ye(t)}a(Je,"isStruct");function q(t){if(typeof t=="string"){if(!Ft(t))throw new TypeError("Invalid primitive type: "+t);return+ve(t).match(zt)[2]/8}if(!Je(t))throw new TypeError("Not a struct");return(k in t?t[k]:t.constructor[k]).size}a(q,"sizeof");function Qe(t,e){return Math.ceil(t/e)*e}a(Qe,"align");function X(t={}){return function(e,n){e[ot]||=[];let i=0,r=new Map;for(let{name:o,type:u,length:h}of e[ot]){if(!Ft(u)&&!ye(u))throw new TypeError("Not a valid type: "+u);r.set(o,{offset:i,type:Ft(u)?ve(u):u,length:h}),i+=q(u)*(h||1),i=Qe(i,t.align||1)}e[k]={options:t,members:r,size:i},delete e[ot]}}a(X,"struct");function me(t,e){return function(n,i){let r=typeof i=="object"?i.name:i;if(typeof r=="symbol"&&(console.warn("Symbol used for struct member name will be coerced to string: "+r.toString()),r=r.toString()),(typeof n!="object"||typeof n!="function")&&!("constructor"in n))throw new TypeError("Invalid member for struct field");n.constructor[ot]||=[],n.constructor[ot].push({name:r,type:t,length:e})}}a(me,"member");function W(t,e){if(!ge(t))throw new TypeError("Can not deserialize, not a struct instance");let{options:n,members:i}=t.constructor[k],r=new Uint8Array("buffer"in e?e.buffer:e),o=new DataView(r.buffer);for(let[u,{type:h,offset:x,length:S}]of i)for(let d=0;d<(S||1);d++){let f=S>0?t[u]:t,y=S>0?d:u,N=x+q(h)*d;if(typeof t[u]=="string"){t[u]=t[u].slice(0,d)+String.fromCharCode(o.getUint8(N))+t[u].slice(d+1);continue}if(!je(h)){if(f[y]===null||f[y]===void 0)continue;W(f[y],new Uint8Array(r.slice(N,q(h))));continue}S>0&&(f||=[]);let F="get"+Rt(h);if(F=="getInt64"){f[y]=o.getBigInt64(N,!n.bigEndian);continue}if(F=="getUint64"){f[y]=o.getBigUint64(N,!n.bigEndian);continue}f[y]=o[F](N,!n.bigEndian)}}a(W,"deserialize");function He(t){function e(n,i){return typeof n=="number"?me(t,n):me(t)(n,i)}return a(e,"_"),e}a(He,"_member");var m=Object.fromEntries(Xe.map(t=>[t,He(t)]));var we=(p=>(p[p.MSDOS=0]="MSDOS",p[p.AMIGA=1]="AMIGA",p[p.OPENVMS=2]="OPENVMS",p[p.UNIX=3]="UNIX",p[p.VM_CMS=4]="VM_CMS",p[p.ATARI_ST=5]="ATARI_ST",p[p.OS2_HPFS=6]="OS2_HPFS",p[p.MAC=7]="MAC",p[p.Z_SYSTEM=8]="Z_SYSTEM",p[p.CP_M=9]="CP_M",p[p.NTFS=10]="NTFS",p[p.MVS=11]="MVS",p[p.VSE=12]="VSE",p[p.ACORN_RISC=13]="ACORN_RISC",p[p.VFAT=14]="VFAT",p[p.ALT_MVS=15]="ALT_MVS",p[p.BEOS=16]="BEOS",p[p.TANDEM=17]="TANDEM",p[p.OS_400=18]="OS_400",p[p.OSX=19]="OSX",p))(we||{}),E=class{constructor(e){this.data=e;if(W(this,e),this.signature!==67324752)throw new c(s.EINVAL,"Invalid Zip file: Local file header has invalid signature: "+this.signature)}signature;versionNeeded;flags;compressionMethod;datetime;get lastModified(){return ct(this.datetime)}crc32;compressedSize;uncompressedSize;nameLength;extraLength;get name(){return $(this.data,this.useUTF8,30,this.nameLength)}get extra(){let e=30+this.nameLength;return this.data.slice(e,e+this.extraLength)}get size(){return 30+this.nameLength+this.extraLength}get useUTF8(){return!!(this.flags&2048)}};a(E,"LocalFileHeader"),l([m.uint32],E.prototype,"signature",2),l([m.uint16],E.prototype,"versionNeeded",2),l([m.uint16],E.prototype,"flags",2),l([m.uint16],E.prototype,"compressionMethod",2),l([m.uint32],E.prototype,"datetime",2),l([m.uint32],E.prototype,"crc32",2),l([m.uint32],E.prototype,"compressedSize",2),l([m.uint32],E.prototype,"uncompressedSize",2),l([m.uint16],E.prototype,"nameLength",2),l([m.uint16],E.prototype,"extraLength",2),E=l([X()],E);var L=class{constructor(e){this.data=e;if(W(this,e),this.signature!=134630224)throw new c(s.EINVAL,"Invalid archive extra data record signature: "+this.signature)}signature;length;get extraField(){return this.data.slice(8,8+this.length)}};a(L,"ExtraDataRecord"),l([m.uint32],L.prototype,"signature",2),l([m.uint32],L.prototype,"length",2),L=l([X()],L);var w=class{constructor(e,n){this.zipData=e;this._data=n;if(W(this,n),this.signature!=33639248)throw new c(s.EINVAL,"Invalid Zip file: Central directory record has invalid signature: "+this.signature);let i=q(w);this.name=$(this._data,this.useUTF8,i,this.nameLength).replace(/\\/g,"/"),this.comment=$(this._data,this.useUTF8,i+this.nameLength+this.extraLength,this.commentLength)}signature;zipVersion;attributeCompat;versionNeeded;flag;get useUTF8(){return!!(this.flag&2048)}get isEncrypted(){return!!(this.flag&1)}compressionMethod;datetime;get lastModified(){return ct(this.datetime)}crc32;compressedSize;uncompressedSize;nameLength;extraLength;commentLength;startDisk;internalAttributes;externalAttributes;headerRelativeOffset;name;get extra(){let e=44+this.nameLength;return this._data.slice(e,e+this.extraLength)}comment;get size(){return q(w)+this.nameLength+this.extraLength+this.commentLength}get isDirectory(){return!!(this.externalAttributes&16)||this.name.endsWith("/")}get isFile(){return!this.isDirectory}get data(){let{compressionMethod:e,size:n,name:i}=new E(this.zipData.slice(this.headerRelativeOffset)),r=this.zipData.slice(this.headerRelativeOffset+n),o=Tt[e];if(typeof o!="function"){let u=e in it?it[e]:e.toString();throw new c(s.EINVAL,`Invalid compression method on file '${i}': ${u}`)}return o(r,this.compressedSize,this.uncompressedSize,this.flag)}get stats(){return new A({mode:365|T.FILE,size:this.uncompressedSize,mtimeMs:this.lastModified.getTime()})}};a(w,"FileEntry"),l([m.uint32],w.prototype,"signature",2),l([m.uint8],w.prototype,"zipVersion",2),l([m.uint8],w.prototype,"attributeCompat",2),l([m.uint16],w.prototype,"versionNeeded",2),l([m.uint16],w.prototype,"flag",2),l([m.uint16],w.prototype,"compressionMethod",2),l([m.uint32],w.prototype,"datetime",2),l([m.uint32],w.prototype,"crc32",2),l([m.uint32],w.prototype,"compressedSize",2),l([m.uint32],w.prototype,"uncompressedSize",2),l([m.uint16],w.prototype,"nameLength",2),l([m.uint16],w.prototype,"extraLength",2),l([m.uint16],w.prototype,"commentLength",2),l([m.uint16],w.prototype,"startDisk",2),l([m.uint16],w.prototype,"internalAttributes",2),l([m.uint32],w.prototype,"externalAttributes",2),l([m.uint32],w.prototype,"headerRelativeOffset",2),w=l([X()],w);var P=class{constructor(e){this.data=e;if(W(this,e),this.signature!=84233040)throw new c(s.EINVAL,"Invalid digital signature signature: "+this.signature)}signature;size;get signatureData(){return this.data.slice(6,6+this.size)}};a(P,"DigitalSignature"),l([m.uint32],P.prototype,"signature",2),l([m.uint16],P.prototype,"size",2),P=l([X()],P);var O=class{constructor(e){this.data=e;if(W(this,e),this.signature!=101010256)throw new c(s.EINVAL,"Invalid Zip file: End of central directory record has invalid signature: 0x"+this.signature.toString(16))}signature;disk;entriesDisk;diskEntryCount;totalEntryCount;size;offset;commentLength;get comment(){return $(this.data,!0,22,this.commentLength)}};a(O,"Header"),l([m.uint32],O.prototype,"signature",2),l([m.uint16],O.prototype,"disk",2),l([m.uint16],O.prototype,"entriesDisk",2),l([m.uint16],O.prototype,"diskEntryCount",2),l([m.uint16],O.prototype,"totalEntryCount",2),l([m.uint32],O.prototype,"size",2),l([m.uint32],O.prototype,"offset",2),l([m.uint16],O.prototype,"commentLength",2),O=l([X()],O);var _t=2**32-1;var de;(function(t){t[t.ino=0]="ino",t[t.size=8]="size",t[t.mode=12]="mode",t[t.nlink=14]="nlink",t[t.uid=18]="uid",t[t.gid=22]="gid",t[t.atime=26]="atime",t[t.birthtime=34]="birthtime",t[t.mtime=42]="mtime",t[t.ctime=50]="ctime",t[t.end=58]="end"})(de||(de={}));var Lt;(function(t){t[t.NOP=0]="NOP",t[t.THROW=1]="THROW",t[t.TRUNCATE=2]="TRUNCATE",t[t.CREATE=3]="CREATE"})(Lt=Lt||(Lt={}));function Ut(t){let e=0;return e<<=1,e+=+Pt(t),e<<=1,e+=+j(t),e<<=1,e}a(Ut,"flagToMode");function Pt(t){return t.indexOf("r")!==-1||t.indexOf("+")!==-1}a(Pt,"isReadable");function j(t){return t.indexOf("w")!==-1||t.indexOf("a")!==-1||t.indexOf("+")!==-1}a(j,"isWriteable");function Ce(t){return t.indexOf("a")!==-1}a(Ce,"isAppendable");function ft(t){return t.indexOf("s")!==-1}a(ft,"isSynchronous");var Bt=class{static{a(this,"File")}datasync(){return this.sync()}datasyncSync(){return this.syncSync()}},ht=class extends Bt{static{a(this,"PreloadFile")}constructor(e,n,i,r,o=new Uint8Array(new ArrayBuffer(0,{maxByteLength:_t}))){if(super(),this.fs=e,this.path=n,this.flag=i,this.stats=r,this._buffer=o,this._position=0,this._dirty=!1,this.stats.size!=o.byteLength){if(Pt(this.flag))throw new Error(`Size mismatch: buffer length ${o.byteLength}, stats size ${this.stats.size}`);this._dirty=!0}}get buffer(){return this._buffer}get position(){return Ce(this.flag)?this.stats.size:this._position}set position(e){this._position=e}async sync(){this.isDirty()&&(await this.fs.sync(this.path,this._buffer,this.stats),this._dirty=!1)}syncSync(){this.isDirty()&&(this.fs.syncSync(this.path,this._buffer,this.stats),this._dirty=!1)}async close(){await this.sync()}closeSync(){this.syncSync()}async stat(){return new A(this.stats)}statSync(){return new A(this.stats)}truncate(e){if(this.truncateSync(e),ft(this.flag))return this.sync()}truncateSync(e){if(this._dirty=!0,!j(this.flag))throw new c(s.EPERM,"File not opened with a writeable mode.");if(this.stats.mtimeMs=Date.now(),e>this._buffer.length){let n=new Uint8Array(e-this._buffer.length);this.writeSync(n,0,n.length,this._buffer.length),ft(this.flag)&&this.syncSync();return}this.stats.size=e,this._buffer=this._buffer.subarray(0,e),ft(this.flag)&&this.syncSync()}async write(e,n=0,i=this.stats.size,r=0){return this.writeSync(e,n,i,r)}writeSync(e,n=0,i=this.stats.size,r=0){if(this._dirty=!0,r??(r=this.position),!j(this.flag))throw new c(s.EPERM,"File not opened with a writeable mode.");let o=r+i;if(o>this.stats.size&&(this.stats.size=o,o>this._buffer.byteLength))if(this._buffer.buffer.resizable&&this._buffer.buffer.maxByteLength<=o)this._buffer.buffer.resize(o);else{let x=new Uint8Array(new ArrayBuffer(o,{maxByteLength:_t}));x.set(this._buffer),this._buffer=x}let u=e.slice(n,n+i);this._buffer.set(u,r);let h=u.byteLength;return this.stats.mtimeMs=Date.now(),ft(this.flag)?(this.syncSync(),h):(this.position=r+h,h)}async read(e,n=0,i=this.stats.size,r=0){return{bytesRead:this.readSync(e,n,i,r),buffer:e}}readSync(e,n=0,i=this.stats.size,r=0){if(!Pt(this.flag))throw new c(s.EPERM,"File not opened with a readable mode.");r??(r=this.position);let o=r+i;o>this.stats.size&&(o=r+Math.max(this.stats.size-r,0)),this.stats.atimeMs=Date.now(),this._position=o;let u=o-r;return u==0||new Uint8Array(e.buffer).set(this._buffer.slice(r,o),n),u}async chmod(e){this.chmodSync(e)}chmodSync(e){this._dirty=!0,this.stats.chmod(e),this.syncSync()}async chown(e,n){this.chownSync(e,n)}chownSync(e,n){this._dirty=!0,this.stats.chown(e,n),this.syncSync()}async utimes(e,n){this.utimesSync(e,n)}utimesSync(e,n){this._dirty=!0,this.stats.atime=e,this.stats.mtime=n,this.syncSync()}isDirty(){return this._dirty}resetDirty(){this._dirty=!1}_setType(e){return this._dirty=!0,this.stats.mode=this.stats.mode&-61441|e,this.sync()}_setTypeSync(e){this._dirty=!0,this.stats.mode=this.stats.mode&-61441|e,this.syncSync()}},V=class extends ht{static{a(this,"NoSyncFile")}constructor(e,n,i,r,o){super(e,n,i,r,o)}async sync(){}syncSync(){}async close(){}closeSync(){}};var lt=class{static{a(this,"FileSystem")}metadata(){return{name:this.constructor.name,readonly:!1,totalSpace:0,freeSpace:0}}constructor(e){}async exists(e,n){try{return await this.stat(e,n),!0}catch{return!1}}existsSync(e,n){try{return this.statSync(e,n),!0}catch{return!1}}};function xe(t){class e extends t{static{a(this,"_ReadonlyFileSystem")}metadata(){return{...super.metadata(),readonly:!0}}async rename(i,r,o){throw new c(s.EROFS)}renameSync(i,r,o){throw new c(s.EROFS)}async createFile(i,r,o,u){throw new c(s.EROFS)}createFileSync(i,r,o,u){throw new c(s.EROFS)}async unlink(i,r){throw new c(s.EROFS)}unlinkSync(i,r){throw new c(s.EROFS)}async rmdir(i,r){throw new c(s.EROFS)}rmdirSync(i,r){throw new c(s.EROFS)}async mkdir(i,r,o){throw new c(s.EROFS)}mkdirSync(i,r,o){throw new c(s.EROFS)}async link(i,r,o){throw new c(s.EROFS)}linkSync(i,r,o){throw new c(s.EROFS)}async sync(i,r,o){throw new c(s.EROFS)}syncSync(i,r,o){throw new c(s.EROFS)}}return e}a(xe,"Readonly");var J=class t{static{a(this,"FileIndex")}static FromListing(e){let n=new t,i=new B;n._index.set("/",i);let r=[{pwd:"",tree:e,parent:i}];for(;r.length>0;){let o,{tree:u,pwd:h,parent:x}=r.pop();for(let S in u){if(!Object.hasOwn(u,S))continue;let d=u[S];if(d){let f=h+"/"+S;o=new B,n._index.set(f,o),r.push({pwd:f,tree:d,parent:o})}else o=new at(new A({mode:T.FILE|365}));x&&x._listing.set(S,o)}}return n}constructor(){this._index=new Map,this.add("/",new B)}files(){let e=[];for(let n of this._index.values())for(let i of n.listing){let r=n.get(i);r?.isFile()&&e.push(r)}return e}add(e,n){if(!n)throw new Error("Inode must be specified");if(!e.startsWith("/"))throw new Error("Path must be absolute, got: "+e);if(this._index.has(e))return this._index.get(e)===n;let i=K(e),r=this._index.get(i);return!r&&e!="/"&&(r=new B,!this.add(i,r))||e!="/"&&!r.add(st(e),n)?!1:(n.isDirectory()&&this._index.set(e,n),!0)}addFast(e,n){let i=K(e),r=st(e),o=this._index.get(i);return o||(o=new B,this.addFast(i,o)),o.add(r,n)?(n.isDirectory()&&this._index.set(e,n),!0):!1}remove(e){let n=K(e),i=this._index.get(n);if(!i)return;let r=i.remove(st(e));if(!r)return;if(!r.isDirectory())return r;let o=r.listing;for(let u of o)this.remove(At(e,u));e!="/"&&this._index.delete(e)}ls(e){return this._index.get(e)?.listing}get(e){let n=K(e),i=this._index.get(n);return n==e?i:i?.get(st(e))}},pt=class{static{a(this,"IndexInode")}constructor(e){this.data=e}},at=class extends pt{static{a(this,"IndexFileInode")}isFile(){return!0}isDirectory(){return!1}toStats(){return new A({mode:T.FILE|438,size:4096})}},B=class extends pt{static{a(this,"IndexDirInode")}constructor(){super(...arguments),this._listing=new Map}isFile(){return!1}isDirectory(){return!0}get stats(){return new A({mode:T.DIRECTORY|365,size:4096})}toStats(){return this.stats}get listing(){return[...this._listing.keys()]}get(e){return this._listing.get(e)}add(e,n){return this._listing.has(e)?!1:(this._listing.set(e,n),!0)}remove(e){let n=this._listing.get(e);if(n)return this._listing.delete(e),n}},kt=class extends xe(lt){static{a(this,"IndexFS")}constructor(e){super(),this._index=J.FromListing(e)}async stat(e){let n=this._index.get(e);if(!n)throw c.With("ENOENT",e,"stat");if(n.isDirectory())return n.stats;if(n.isFile())return this.statFileInode(n,e);throw new c(s.EINVAL,"Invalid inode.")}statSync(e){let n=this._index.get(e);if(!n)throw c.With("ENOENT",e,"stat");if(n.isDirectory())return n.stats;if(n.isFile())return this.statFileInodeSync(n,e);throw new c(s.EINVAL,"Invalid inode.")}async openFile(e,n,i){if(j(n))throw new c(s.EPERM,e);let r=this._index.get(e);if(!r)throw c.With("ENOENT",e,"openFile");if(!r.toStats().hasAccess(Ut(n),i))throw c.With("EACCES",e,"openFile");if(r.isDirectory()){let o=r.stats;return new V(this,e,n,o,o.fileData)}return this.openFileInode(r,e,n)}openFileSync(e,n,i){if(j(n))throw new c(s.EPERM,e);let r=this._index.get(e);if(!r)throw c.With("ENOENT",e,"openFile");if(!r.toStats().hasAccess(Ut(n),i))throw c.With("EACCES",e,"openFile");if(r.isDirectory()){let o=r.stats;return new V(this,e,n,o,o.fileData)}return this.openFileInodeSync(r,e,n)}async readdir(e){let n=this._index.get(e);if(!n)throw c.With("ENOENT",e,"readdir");if(n.isDirectory())return n.listing;throw c.With("ENOTDIR",e,"readdir")}readdirSync(e){let n=this._index.get(e);if(!n)throw c.With("ENOENT",e,"readdir");if(n.isDirectory())return n.listing;throw c.With("ENOTDIR",e,"readdir")}},mt=class extends kt{static{a(this,"SyncIndexFS")}async statFileInode(e,n){return this.statFileInodeSync(e,n)}async openFileInode(e,n,i){return this.openFileInodeSync(e,n,i)}};var vt=class t extends mt{static{a(this,"ZipFS")}static _getEOCD(e){let n=new DataView(e),i=22,r=Math.min(i+65535,e.byteLength-1);for(let o=i;o<r;o++)if(n.getUint32(e.byteLength-o,!0)===101010256)return new O(e.slice(e.byteLength-o));throw new c(s.EINVAL,"Invalid ZIP file: Could not locate End of Central Directory signature.")}static _addToIndex(e,n){let i=e.name;if(i[0]=="/")throw new c(s.EPERM,"Unexpectedly encountered an absolute path in a zip file.");i.endsWith("/")&&(i=i.slice(0,-1)),n.addFast("/"+i,e.isDirectory?new B(e):new at(e))}static async _computeIndex(e){let n=new J,i=t._getEOCD(e);if(i.disk!=i.entriesDisk)throw new c(s.EINVAL,"ZipFS does not support spanned zip files.");let r=i.offset;if(r===4294967295)throw new c(s.EINVAL,"ZipFS does not support Zip64.");let o=r+i.size;return t._computeIndexResponsive(e,n,r,o,[],i)}static async _computeIndexResponsive(e,n,i,r,o,u){if(i>=r)return{index:n,entries:o,eocd:u,data:e};for(;i<r;){let h=new w(e,e.slice(i));t._addToIndex(h,n),i+=h.size,o.push(h)}return t._computeIndexResponsive(e,n,i,r,o,u)}_index=new J;_directoryEntries=[];_eocd=null;data;name;async _initialize(e){let n=await t._computeIndex(e);this._index=n.index,this._directoryEntries=n.entries,this._eocd=n.eocd,this.data=n.data}_ready;async ready(){await this._ready}constructor({zipData:e,name:n=""}){super({}),this.name=n,this._ready=this._initialize(e)}metadata(){return{...super.metadata(),name:["zip",this.name].filter(e=>e).join(":"),readonly:!0,totalSpace:this.data.byteLength}}getCentralDirectoryEntry(e){let n=this._index.get(e);if(!n)throw c.With("ENOENT",e,"getCentralDirectoryEntry");if(n.isDirectory()||n.isFile())return n.data;throw c.With("EPERM","Invalid inode: "+n,"getCentralDirectoryEntry")}getCentralDirectoryEntryAt(e){let n=this._directoryEntries[e];if(!n)throw new RangeError("Invalid directory index: "+e);return n}get numberOfCentralDirectoryEntries(){return this._directoryEntries.length}get endOfCentralDirectory(){return this._eocd}statFileInodeSync(e){return e.data.stats}openFileInodeSync(e,n,i){return new V(this,n,i,this.statFileInodeSync(e),e.data.data)}},tn={name:"Zip",options:{zipData:{type:"object",required:!0,description:"The zip file as an ArrayBuffer object.",validator(t){if(!(t instanceof ArrayBuffer))throw new c(s.EINVAL,"option must be a ArrayBuffer.")}},name:{type:"string",required:!1,description:"The name of the zip file (optional)."}},isAvailable(){return!0},create(t){return new vt(t)}};return De(en);})();

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
            const extensionBundle = await fetch(`https://crx.therealgeodash.workers.dev/${this.id}/download-as-zip`).then(r => r.arrayBuffer());
            if (extensionBundle) {
                this.#downloaded = true;
                this.zip = new ZenFS_Zip.ZipFS({zipData: extensionBundle, name: `extension_${this.id}.zip`});
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

    try {
        logMessage("🔩 Loading Extension Runtime");
    } catch {};
})();

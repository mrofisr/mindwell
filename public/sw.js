if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/OdL2_ng8pVNYRmhXr9Nxn/_buildManifest.js",revision:"6eb2d8004fd66979ab0eac39b5f507a9"},{url:"/_next/static/OdL2_ng8pVNYRmhXr9Nxn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/160-48cb2c3ec09cd510.js",revision:"48cb2c3ec09cd510"},{url:"/_next/static/chunks/252f366e-34863fc5de7dbdcd.js",revision:"34863fc5de7dbdcd"},{url:"/_next/static/chunks/406-a8e04aedfffab02d.js",revision:"a8e04aedfffab02d"},{url:"/_next/static/chunks/438-ded6a8ed4bb90f38.js",revision:"ded6a8ed4bb90f38"},{url:"/_next/static/chunks/455-a109d0a5b660d3af.js",revision:"a109d0a5b660d3af"},{url:"/_next/static/chunks/7112840a-9f37ef8e08cbc830.js",revision:"9f37ef8e08cbc830"},{url:"/_next/static/chunks/873-f0a097f596a51792.js",revision:"f0a097f596a51792"},{url:"/_next/static/chunks/914-c12408523f24cd5c.js",revision:"c12408523f24cd5c"},{url:"/_next/static/chunks/977-91075c444e04074c.js",revision:"91075c444e04074c"},{url:"/_next/static/chunks/a03c21c4-c38165d3d2f5d834.js",revision:"c38165d3d2f5d834"},{url:"/_next/static/chunks/ae51ba48-6585ef9c49280d98.js",revision:"6585ef9c49280d98"},{url:"/_next/static/chunks/b98bc7c3-3b2716b59bdfc294.js",revision:"3b2716b59bdfc294"},{url:"/_next/static/chunks/d64684d8-2e23ee97fd58caad.js",revision:"2e23ee97fd58caad"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-c256fb04ba725c1e.js",revision:"c256fb04ba725c1e"},{url:"/_next/static/chunks/pages/_app-c42e4019a754396b.js",revision:"c42e4019a754396b"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/articles-0324cf8e38a7baa8.js",revision:"0324cf8e38a7baa8"},{url:"/_next/static/chunks/pages/index-c1337cafcd843aa3.js",revision:"c1337cafcd843aa3"},{url:"/_next/static/chunks/pages/login-da4e23617ce9d5d6.js",revision:"da4e23617ce9d5d6"},{url:"/_next/static/chunks/pages/profile-36921eb3f4ebe749.js",revision:"36921eb3f4ebe749"},{url:"/_next/static/chunks/pages/profile/%5Buid%5D-bd6c334d8a6e429e.js",revision:"bd6c334d8a6e429e"},{url:"/_next/static/chunks/pages/quiz-226bc992f6b38dcb.js",revision:"226bc992f6b38dcb"},{url:"/_next/static/chunks/pages/quiz/data/addData-9f5acec5ad71aedc.js",revision:"9f5acec5ad71aedc"},{url:"/_next/static/chunks/pages/quiz/history-f1caa25b5c94c8c6.js",revision:"f1caa25b5c94c8c6"},{url:"/_next/static/chunks/pages/quiz/mental-health-bf9fb7e1845f991a.js",revision:"bf9fb7e1845f991a"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/28bd648df3fadfbf.css",revision:"28bd648df3fadfbf"},{url:"/favicon.ico",revision:"e02740bd75421a58dad21deecdf2c543"},{url:"/favicon_back.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/ilustrations/image.png",revision:"b717a3479b6b9a42a7e22ab6e590f477"},{url:"/ilustrations/login/2.svg",revision:"1f3637b8eac791c707c38db7bf9e9e89"},{url:"/ilustrations/login/3.svg",revision:"e10e57c0897c9dec488a716fe7661aaa"},{url:"/ilustrations/login/4.svg",revision:"677a80ae75d9c1cb83c576d36bddf404"},{url:"/ilustrations/psychology.png",revision:"8237fe1dac9ce000627596bbc5345305"},{url:"/images/icons/icon-128x128.png",revision:"b4fc994e1db200fda2378a596a2ca91d"},{url:"/images/icons/icon-144x144.png",revision:"5c3982879ca079cfcbfda9595420595d"},{url:"/images/icons/icon-152x152.png",revision:"89b784cfecda20d194792177d55702a1"},{url:"/images/icons/icon-192x192.png",revision:"1285ec7abcfc84c364da8eb00c791f00"},{url:"/images/icons/icon-384x384.png",revision:"b35c165be57cbfa8ddc9e8c29825a487"},{url:"/images/icons/icon-512x512.png",revision:"a90a1e19b1fe5fd9279ffec05501d4e6"},{url:"/images/icons/icon-72x72.png",revision:"16d3657831da10cdf36c4db199c2b6b1"},{url:"/images/icons/icon-96x96.png",revision:"87b744e1f2998cc4ad8fe6a73002071e"},{url:"/manifest.json",revision:"9014275eb6e03426eac5d095bc0d5f89"},{url:"/mindwell.png",revision:"b87468cf239f6a3d57dd90a1b74b19a4"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

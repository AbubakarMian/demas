let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/bootstrap.min.css',
                '/index.html',
                '/',
                "/users"
            ])
        })
    )
})
self.addEventListener("fetch", (event) => {

    // console.warn("Url",event.request.U)
    // event.waitUntil(
    //     this.registration.showNotification("hello",{
    //         body:"hello from waleed",
    //     })
    // )

     if (!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                // let requestUrl = event.request.clone();
                // fetch(requestUrl)
            })
        )
     }

    
});




// this.addEventListener("fetch", (event) => {


//     // console.warn("url",event.request.url)


//     if (!navigator.onLine) {
//         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//             event.waitUntil(
//                 this.registration.showNotification("Internet", {
//                     body: "internet not working",
//                 })
//             )
//         }
//         event.respondWith(
//             caches.match(event.request).then((resp) => {
//                 if (resp) {
//                     return resp
//                 }
//                 let requestUrl = event.request.clone();
//                 fetch(requestUrl)
//             })
//         )
//     }
// }) 
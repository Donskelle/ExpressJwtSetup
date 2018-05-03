let config = {};
if (window.location.href.indexOf('localhost') >= 0) {
    config = {
        IMAGEBUCKETURL: "https://storage.googleapis.com/demotransportiert.appspot.com/",
        URL: "http://localhost:3000/",
    };
}
else {
    config = {
        IMAGEBUCKETURL: "https://storage.googleapis.com/demotransportiert.appspot.com/",
        URL: "https://demotransportiert.appspot.com/",
    };
}
export default config;
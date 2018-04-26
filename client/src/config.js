if (process.env.NODE_ENV === 'test') {
    module.exports = {
        IMAGEBUCKETURL: "https://storage.googleapis.com/demotransportiert.appspot.com/",
        URL: "http://localhost:3000/",
    }
}
else {
    module.exports = {
        IMAGEBUCKETURL: "https://storage.googleapis.com/demotransportiert.appspot.com/",
        URL: "https://demotransportiert.appspot.com/",
    }
}
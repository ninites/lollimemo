// Listen on a specific host via the HOST environment constiable
const host = process.env.HOST || 'localhost';
// Listen on a specific port via the PORT environment constiable
const port = process.env.PORT || 8000;

const cors_proxy = require('cors-anywhere');


cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log("tu listen pas avec docker batard");
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

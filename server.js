const ENV = require('node-env-file')(__dirname + '/.env');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const gracefulExit = require('./index')({log: true});

gracefulExit.init();

const config = {
    host: ENV.NODE_HOST,
    port: ENV.NODE_PORT
};

// this is for testing only
// do not let the user interact with your process
app.get('/exit', function(req, res) {
    process.exit(0);
});

// graceful exit
gracefulExit.include(function(exit) {
    // exit.wait = true;
    console.log('- - - - - - - - - - - - - - - - - -');
    console.log('closing server in', process.pid);
    server.close(function() {
        console.log('http server is now closed!');
        // process.exit();
        // exit.done();
    });
});

server.listen(config.port, function() {
    console.log(`Node development server started on ${config.host}:${config.port}
        with process id ${process.pid}`);
});

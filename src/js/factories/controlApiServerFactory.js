app.factory('controlApiServerFactory', function($rootScope, backendFactory, shortid, registeredReceiverFactory, audioChannelsFactory) {
    var http = require('http');
    var url = require('url');

    var server = http.createServer();

    server.on('request', function(req, res) {
        var urlParts = url.parse(req.url, true);
        var receiver = {
            id : shortid.generate(),
            name : urlParts.query.name,
            host : urlParts.query.host,
            gains : {}
        };
        backendFactory.Transmitter.registerReceiver(receiver.host);
        registeredReceiverFactory.registeredRecievers.push(receiver);
        res.writeHead(200, 'OK');
        res.end(angular.toJson(audioChannelsFactory.inputDevice));
        $rootScope.$apply();
    });

    server.listen(5007);

    var controlApiServerFactory = {};

    return controlApiServerFactory;
});

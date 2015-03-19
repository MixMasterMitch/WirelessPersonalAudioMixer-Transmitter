app.factory('receiverDiscovery', function(shortid, transmitterName) {
    var dgram = require('dgram');
    var ip = require('ip');

    var receiverDiscovery = {};

    receiverDiscovery.multicastIp = '239.255.255.251';
    receiverDiscovery.transmitterPort = 5007;
    receiverDiscovery.receiverPort = 5008;
    receiverDiscovery.id = shortid.generate();

    receiverDiscovery.start = function() {
        receiverDiscovery.socket = dgram.createSocket('udp4');

        receiverDiscovery.socket.on('error', function(err) {
            console.log(err);
        });

        receiverDiscovery.socket.on('message', function(msg, rinfo) {
            console.log(msg.toString());
            try {
                var request = angular.fromJson(msg.toString());
                if (request.query !== 'wireless-personal-audio-mixer:transmitter') { return; }
                var response = {
                    id : receiverDiscovery.id,
                    deviceType : 'wireless-personal-audio-mixer:transmitter',
                    name : transmitterName.name,
                    apiHost : ip.address(),
                    apiPort : receiverDiscovery.transmitterPort
                };
                var responseString = angular.toJson(response);
                receiverDiscovery.socket.send(responseString, 0, responseString.length, receiverDiscovery.receiverPort, receiverDiscovery.multicastIp);
            } catch (e) {}
        });

        receiverDiscovery.socket.on('listening', function() {
            console.log('listening on ' + 'http://' + ip.address() + ':' + receiverDiscovery.transmitterPort);

            receiverDiscovery.socket.addMembership(receiverDiscovery.multicastIp);
            receiverDiscovery.socket.setMulticastTTL(1);
        });

        receiverDiscovery.socket.bind(receiverDiscovery.transmitterPort);
    };

    return receiverDiscovery;
});

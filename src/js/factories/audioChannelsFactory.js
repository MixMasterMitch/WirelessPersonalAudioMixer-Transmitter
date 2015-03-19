app.factory('audioChannelsFactory', function(backendFactory, shortid) {
    var _ = require('lodash');

    var audioChannelsFactory = {};

    audioChannelsFactory.inputDevices = backendFactory.Hardware.getInputs();

    _.each(audioChannelsFactory.inputDevices, function(inputDevice) {
        inputDevice.id = shortid.generate();
        inputDevice.channelNumbers = _.range(inputDevice.numChannels);
        inputDevice.audioChannels = [];
        _.each(_.range(inputDevice.numChannels), function(i) {
            inputDevice.audioChannels.push({
                id : shortid.generate(),
                name : 'Channel ' + (i + 1),
                deviceChannelNum : i,
                muted : false,
                solo : false,
                level : 50
            });
        });
    });

    audioChannelsFactory.inputDevice = _.find(audioChannelsFactory.inputDevices, { isDefault : true }) || audioChannelsFactory.inputDevices[0];

    audioChannelsFactory.createAudioChannel = function(num) {
        return {
            id : shortid.generate(),
            name : 'Channel ' + num,
            deviceChannelNum : 0,
            muted : false,
            solo : false,
            level : 0
        }
    };

    return audioChannelsFactory;
});

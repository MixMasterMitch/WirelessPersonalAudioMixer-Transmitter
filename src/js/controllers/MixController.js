app.controller('MixController', function($scope, $interval, audioChannelsFactory, backendFactory, registeredReceiverFactory) {

    $scope.inputDevice = audioChannelsFactory.inputDevice;
    $scope.audioChannels = audioChannelsFactory.inputDevice.audioChannels;
    $scope.$watch(function() { return audioChannelsFactory.inputDevice; }, function() {
        $scope.inputDevice = audioChannelsFactory.inputDevice;
        $scope.audioChannels = audioChannelsFactory.inputDevice.audioChannels;
    });

    $scope.receivers = registeredReceiverFactory.registeredRecievers;
    $scope.$watch(function() { return registeredReceiverFactory.registeredRecievers; }, function() {
        $scope.receivers = registeredReceiverFactory.registeredRecievers;
    });

    $scope.removeAudioChannel = function(index) {
        $scope.audioChannels.splice(index, 1);
    };

    $scope.soloAudioChannel = function(index) {
        if ($scope.soloMode = !$scope.audioChannels[index].solo) {
            $scope.audioChannels.forEach(function(audioChannel) {
                audioChannel.solo = false;
            });
        }
        $scope.audioChannels[index].solo = !$scope.audioChannels[index].solo;
        //$scope.audioChannels.forEach(function(audioChannel, audioChannelIndex) {
        //    if (audioChannelIndex === index) { return; }
        //});
    };

    $scope.muteAudioChannel = function(index) {
        $scope.audioChannels[index].muted = !$scope.audioChannels[index].muted;
        //$scope.audioChannels.forEach(function(audioChannel, audioChannelIndex) {
        //    if (audioChannelIndex === index) { return; }
        //});
    };

    $scope.formatSliderTooltip = function(value) {
        return value + '%';
    };

    $scope.addAudioChannel = function() {
        $scope.audioChannels.push(audioChannelsFactory.createAudioChannel($scope.audioChannels.length + 1));
    };

    $interval(function() {
        var audioInputLevels = backendFactory.Transmitter.getAudioInputLevels();
        $scope.audioChannels.forEach(function(audioChannel) {
            audioChannel.level = audioInputLevels[audioChannel.deviceChannelNum];
            audioChannel.level = Math.max(audioChannel.level, 0);
            audioChannel.level = Math.min(audioChannel.level, 100);
        });
    }, 100);
});

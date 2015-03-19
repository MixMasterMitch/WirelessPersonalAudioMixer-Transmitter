app.controller('InputDeviceController', function($scope, audioChannelsFactory, backendFactory) {

    $scope.$watchCollection(function() { return audioChannelsFactory.inputDevices; }, function() {
        $scope.inputDevices = audioChannelsFactory.inputDevices;
    });

    $scope.$watchCollection(function() { return audioChannelsFactory.inputDevice; }, function() {
        $scope.inputDevice = audioChannelsFactory.inputDevice;
        backendFactory.Transmitter.stop();
        backendFactory.Transmitter.start($scope.inputDevice.deviceNumber);
    });

    $scope.selectInputDevice = function(inputDevice) {
        audioChannelsFactory.inputDevice = inputDevice;
    }
});

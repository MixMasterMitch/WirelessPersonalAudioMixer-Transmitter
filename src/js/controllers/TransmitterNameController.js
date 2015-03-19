app.controller('TransmitterNameController', function($scope, transmitterName) {
    $scope.name = transmitterName.name;

    $scope.$watch('name', function() {
        transmitterName.name = $scope.name;
    });

    $scope.$watch(function() { return transmitterName.name }, function() {
        $scope.name = transmitterName.name;
    });
});

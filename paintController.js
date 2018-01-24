var app = angular.module("MyApp", [])
app.controller('appController', function($scope, $http) {
  $scope.canvas = new fabric.Canvas('canvas', {selection: false});

$scope.canvas.isDrawing = true;


var grid = 50;
var inset = 0;
  // create grid
  //line
  // var line, isDown;

 $scope.createGrid =  function() {
    for (var i = 0; i < (600 / grid); i++) {
      $scope.canvas.add(new fabric.Line([i * grid, 0, i * grid, 600], {
        stroke: '#eeeeee',
        selectable: false
      }));
      $scope.canvas.add(new fabric.Line([0, i * grid, 600, i * grid], {
        stroke: '#eeeeee',
        selectable: false
      }))
    }
  }
  //create grids
  for (var i = 0; i < (600  / grid); i++) {

  $scope.canvas.add(new fabric.Text(String(i * 1),
  {left: inset + i * grid, top: 0,
  fontSize:10,
  selectable: false}));

	$scope.canvas.add(new fabric.Text(String(i * 1),
  {left:0, top: inset + i * grid,
  fontSize: 10,
  textAlign:'right',
  selectable: false}));

}

  $scope.createGrid(canvas);

  $scope.canvas.add(new fabric.Rect({
    left: 0 + inset,
    top: 0 + inset,
    width: 100,
    height: 50,
    fill: '#faa',
    originX: 'left',
    originY: 'top',
    centeredRotation: true
  }));


  $scope.canvas.on('object:moving', function(options) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid + inset,
      top: Math.round(options.target.top / grid) * grid + inset,
    });
    console.log(options.target)
  });
});

var app = angular.module("MyApp", [])
app.controller('appController', function($scope, $http) {
  $scope.canvas = new fabric.Canvas('canvas', {
    selection: false
  });
  var grid = 50;
  var inset = 0;
  for (var i = 0; i < (600 / grid); i++) {
    $scope.canvas.add(new fabric.Line([i * grid, 0, i * grid, 600], {
      stroke: '#ccc',
      selectable: false
    }));
    $scope.canvas.add(new fabric.Line([0, i * grid, 600, i * grid], {
      stroke: '#ccc',
      selectable: false
    }))
  }
  for (var i = 0; i < (600 / grid); i++) {

    $scope.canvas.add(new fabric.Text(String(i * 50), {
      left: inset + i * grid,
      top: 0,
      fontSize: 10,
      selectable: false
    }));

    $scope.canvas.add(new fabric.Text(String(i * 50), {
      left: 0,
      top: inset + i * grid,
      fontSize: 10,
      textAlign: 'right',
      selectable: false
    }));

  }
  var line, isDown;
  $scope.canvas.on('mouse:down', function(o) {

    var pointer = $scope.canvas.getPointer(o.e);
    $scope.canvas.remove(line);
    isDown = true;
    var pointer = $scope.canvas.getPointer(o.e);
    var points = [Math.round(pointer.x / grid) * grid, Math.round(pointer.y / grid) * grid, pointer.x, pointer.y];
    line = new fabric.Rect({
      left: pointer.x,
      top: pointer.y,
      width: 10,
      height: 10,
      fill: 'black',
      originX: 'left',
      originY: 'top',
      centeredRotation: true,
      selectable:true
    });
    $scope.canvas.setActiveObject($scope.canvas.item(0));

    $scope.canvas.add(line);



  });


  $scope.canvas.on('mouse:move', function(o) {
        console.log("move");
    if (!isDown) return;
    var pointer = $scope.canvas.getPointer(o.e);
    line.set({
      x2: pointer.x,
      y2: pointer.y
    });
    $scope.canvas.renderAll();

  });

  $scope.canvas.on('mouse:up', function(o) {
    console.log("up");
    var pointer = $scope.canvas.getPointer(o.e);
    isDown = false;
    line.set({
      x2: Math.round(pointer.x / grid) * grid,
      y2: Math.round(pointer.y / grid) * grid
    });
    $scope.canvas.renderAll();
  });

  $scope.canvas.on('object:moving', function(o) {
    console.log("objmove");
    var pointer = $scope.canvas.getPointer(o.e);
      var points = [Math.round(pointer.x / grid) * grid, Math.round(pointer.y / grid) * grid, pointer.x, pointer.y];
    line.set({
      left:pointer.x,
      top: pointer.y
    });
    // console.log(line);
  console.log(points);
  });

});

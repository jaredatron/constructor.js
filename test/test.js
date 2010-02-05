if (typeof load !== "undefined"){
  load('../lib/simple_test.js');
  load('../src/constructor.js');
}
var constructor_test_suite = new SimpleTestSuite(function(test){

  test('new Constructor should return a function', function(){
    return typeof(new Constructor) === "function";
  });

  test('new Constructor should accept and object as it\'s prototype', function(){
    var car_prototype = {color:'red'};
    var Car = new Constructor(car_prototype);
    return Car.prototype !== car_prototype && Car.prototype.color === 'red';
  });

  test('new Constructor should set prototype.constructor to it\'s self', function(){
    var Car = new Constructor();
    return Car.prototype.constructor === Car;
  });

  test('new Constructor should set prototype.superobject to it\'s superconstructor\'s prototype object', function(){
    var Car   = new Constructor();
    var Truck = new Constructor(Car);
    return  (
      Truck.prototype.constructor === Car &&
      Truck.prototype.superobject === Car.prototype &&
      Truck.prototype.superobject === Truck.prototype.constructor.prototype
    );
  });

  test('new Constructor should accept a constructor as a superconstructor', function(){
    var Car   = new Constructor();
    var Truck = new Constructor(Car);
    var dodge = new Truck;
    return dodge instanceof Truck && dodge instanceof Car && Truck.prototype.constructor === Car;
  });

  test('Constructor() should simulte new Constructor', function(){
    var Car = new Constructor({
      initialize: function(name){
        this.name = name;
      }
    });

    var dodge = Car('dodge');

    return dodge instanceof Car && dodge.name === 'dodge';
  });

  test('new constructor should pass its arguments to constructor.prototype.initialize if it exists', function(){
    var initialize_scope, initialize_arguments;
    var Cow = new Constructor({
      initialize: function(){
        initialize_scope = this;
        initialize_arguments = arguments;
      }
    });

    var bessy = new Cow('brown', 12);

    return initialize_scope === bessy && initialize_arguments[0] === 'brown' && initialize_arguments[1] === 12;
  });

  test('super 1', function(){
    var car_drive_called = false;

    var Car = new Constructor({
      drive: function(){ car_drive_called = true; }
    });

    var Truck = new Constructor(Car, {
      drive: function(){
        console.log(this)
        console.dir(this.constructor);
        this.constructor.prototype.constructor.prototype.drive.apply(this, arguments);
      }
    });

    new Truck().drive();

    return car_drive_called;
  });

  test('super 2', function(){
    var car_drive_called = false;

    var Car = new Constructor({
      drive: function(){ car_drive_called = true; }
    });

    var Truck = new Constructor(Car, {
      drive: function(){
        this.superobject.drive.apply(this, arguments);
      }
    });

    new Truck().drive();

    return car_drive_called;
  });


  // printing in V8 and Rhino
  if (typeof load !== "undefined"){
    print(this.tests.passed+' out of '+this.tests.failed+' tests passed');
    for (var i=0; i < this.tests.length; i++) {
      print((this.tests[i][0] ? 'PASS' : 'FAIL')+': '+this.tests[i][1]);
    };
  }
});

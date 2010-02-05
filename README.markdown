#Constructor.js

Constructor.js provides a constructor for constructors. 


## Why:

because I'd rather do this

    var Car = new Constructor({
      initialize: function(name){
        this.name = name;
      },
      drive: function(){
        this.driving = true;
      }
    });

then this

    var Car = function(name){
      this.name = name;
    }
    Car.prototype = {
      drive: function(){
        this.driving = true;
      }
    };
    

## Another class system for JavaScript. Really?

Constructor.js is not attempting to mimic another language's class system. Instead it embraces the power of JavaScript's prototype system weighing in at
less then 40 lines of code

## Example

### Create a constructor

    var Car = new Constructor({
      initialize: function(name){
        this.name = name;
      }
    });

    new Car instanceof Car;
    //-> true

    Car() instanceof Car;
    //-> true

    new Car('hotrod').name === 'hotrod';
    //-> true

### Inherit from a constructor

    var Truck = new Constructor(Car, {
      initialize: function(name, size){
        this.superobject.initialize.call(this, name);
        this.size = size;
      }
    });

    Truck.superconstructor === Car
    //-> true
    
    Truck.prototype.superobject === Car.prototype
    //-> true

    new Truck instanceof Truck;
    //-> true

    new Truck() instanceof Car;
    //-> true

    var lorry = new Truck('lorry', 18);

    lorry.name === 'lorry';
    //-> true

    lorry.size === 18;
    //-> true

### Inherit from a native object

    var Array2 = new Constructor(Array, {
      push: function(){
        this.superobject.push.apply(this, arguments);
        return this;
      }
    });
    var a2 = new Array2();
    a2.push(1,2,3);
    //-> a2

## What is superobject?

super is... well... super useful; but JavaScript doesn't have a concept of super and I didn't want to simulate it by wrapping functions
so I simply gave a constructor instances a reference to it's constructor's prototype's constructor.prototype object so it could call or apply
it's "parent"'s methods. 

In other words it's shorthand for doing this:

    var Array2 = new Constructor(Array, {
      push: function(){
        this.constructor.prototype.constructor.prototype.push.apply(this, arguments);
        return this;
      }
    });
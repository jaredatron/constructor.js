#Constructor.js

Constructor.js provides a constructor for constructors.


## Why:

because I'd rather do this:

    var Car = new Constructor({
      initialize: function(name){
        this.name = name;
      },
      drive: function(){
        this.driving = true;
      }
    });

then this:

    var Car = function(name){
      this.name = name;
    }
    Car.prototype = {
      drive: function(){
        this.driving = true;
      }
    };

or even better:

    var Car = new Constructor(function(){

      this.initialize = function(name){
        this.name = name;
      };

      this.drive = function(){
        this.driving = true;
      };

    });

## Another class system for JavaScript? Really!?

Constructor.js doesn't attempt to mimic other languages like Ruby. Instead it simply wraps up a common pattern in some tasty syntactic sugar.

## A common pattern for inheritance

    // before

    function Car(name){
      this.name = name;
    }

    function Truck(name, size){
      Car.apply(this, [name]);
      this.size = size;
    }

    Truck.prototype = new Car;

    // after

    var Car = new Constructor({
      initialize: function(name){
        this.name = name;
      }
    });

    var Truck = new Constructor(Car, {
      initialize: function(name, size){
        this.$super('initialize', [name]);
        this.size = size;
      }
    });


## Examples

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
        this.$super('initialize', [name]);
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
        this.$super('push', arguments);
        return this;
      }
    });
    var a2 = new Array2();
    a2.push(1,2,3);
    //-> a2

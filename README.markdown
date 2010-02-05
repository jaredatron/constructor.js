#Constructor.js

Constructor.js provides a constructor for constructors. 'new Constructor' constructs new constructors making creating new constructors easier the ever. 

Constructor.js embraces the power of JavaScript's prototype system without trying to mimic another language's class system.

## Example

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

var Array2 = new Constructor(Array, {
  push: function(){
    this.$super('push', arguments);
    return this;
  }
});
var a2 = new Array2();
a2.push(1,2,3);
//-> a2

var Animal = new Constructor({
  initialize: function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  },
  fullName: function(){
    return this.firstName+' '+this.lastName;
  },
  toString: function() {

  }
});

var Frog = new Constructor(Animal, {
  initialize: function(size){
    this.$super('initialize', ['African', 'Frog']);
    this.size = size || 10;
  }
});


var DartFrog = new Constructor(Frog, function() {

  var DEFAULT_COLOR = 'red';

  this.initialize = function(color){
    this.$super('initialize', [15]);
    this.color = color || DEFAULT_COLOR;
  };

  this.whatever = function(color){

  };

});


function test(){
  try{
    return 5
  }finally{
    console.log('boosh');
  }
}

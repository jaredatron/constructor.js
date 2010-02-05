var Array2 = new Constructor(Array, {
  push: function(){
    this.superobject.push.apply(this, arguments);
    return this;
  }
});
var a2 = new Array2();
a2.push(1,2,3);
//-> a2

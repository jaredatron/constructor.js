var Constructor = (function() {

  function extend(object){
    for (var p in object) this.prototype[p] = object[p];
  }

  function emptyFunction(){}
  function construct(superobject){
    emptyFunction.prototype = superobject;
    return new emptyFunction;
  }

  function Constructor(superConstructor, prototype){

    function constructor(){
      var self = (this instanceof constructor) ? this : construct(constructor.prototype);
      self.constructor = constructor;
      return (typeof self.initialize === "function") ? self.initialize.apply(self, arguments) || self : self;
    };

    constructor.extend = extend;

    if (typeof superConstructor === "function"){
      constructor.prototype = construct(superConstructor.prototype);
      constructor.prototype.superobject = superConstructor.prototype;
      if (prototype) constructor.extend(prototype);
    }else{
      if (superConstructor) constructor.extend(superConstructor);
    }

    return constructor;
  };

  return Constructor;

})();
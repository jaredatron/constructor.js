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
      return (typeof self.initialize === "function") ? self.initialize.apply(self, arguments) || self : self;
    };

    constructor.extend = extend;

    if (typeof superConstructor === "function"){
      constructor.superconstructor = superConstructor;
      constructor.prototype = construct(superConstructor.prototype);
      constructor.prototype.constructor = constructor;
      constructor.prototype.superobject = superConstructor.prototype;
      if (prototype) constructor.extend(prototype);
    }else{
      if (superConstructor) constructor.extend(superConstructor);
    }

    return constructor;
  };

  return Constructor;

})();
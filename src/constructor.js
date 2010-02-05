var Constructor = (function() {

  function extend(target, source){
    for (var p in source) target[p] = source[p];
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

    if (typeof superConstructor === "function"){
      constructor.superconstructor = superConstructor;
      constructor.prototype = construct(superConstructor.prototype);
      constructor.prototype.constructor = constructor;
      constructor.prototype.superobject = superConstructor.prototype;
      if (prototype) extend(constructor.prototype, prototype);
    }else{
      if (superConstructor) extend(constructor.prototype, superConstructor);
    }

    return constructor;
  };

  return Constructor;

})();
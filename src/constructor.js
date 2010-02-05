var Constructor = (function() {

  function extend(target, source){
    for (var p in source) target[p] = source[p];
  }

  function emptyFunction(){}
  function construct(superobject){
    emptyFunction.prototype = superobject;
    var object = new emptyFunction;
    object.superobject = superobject;
    return object;
  }

  function Constructor(superConstructor, prototype){

    function constructor(){
      if (typeof this.initialize === "function") return this.initialize.apply(this, arguments);
    };

    if (typeof superConstructor === "function"){
      constructor.superconstructor = superConstructor;
      constructor.prototype = construct(superConstructor.prototype);
      constructor.prototype.constructor = constructor;
      if (prototype) extend(constructor.prototype, prototype);
    }else{
      if (superConstructor) extend(constructor.prototype, superConstructor);
    }

    return constructor;
  };

  return Constructor;

})();
var Constructor = (function() {

  function extend(extension){
    if (typeof extension === 'function')
      extension = extension.apply(this.prototype);
    if (typeof extension === 'object')
      for (var p in extension) this.prototype[p] = extension[p];
    return this;
  }

  function ConstructorInstance(){}
  function construct(superObject){
    ConstructorInstance.prototype = superObject;
    return new ConstructorInstance;
  }

  function Constructor(superConstructor, extension){

    function constructor(){
      var self = (this instanceof constructor) ? this : construct(constructor.prototype);
      self.constructor = constructor;
      return (typeof self.initialize === "function") ?
        self.initialize.apply(self, arguments) || self : self;
    };

    constructor.extend = extend;

    if (arguments.length === 1 &&
      typeof superConstructor === 'object' ||
      (
        typeof superConstructor === 'function' &&
        !("superConstructor" in superConstructor) &&
        superConstructor.name === ""
      )
    ){
      extension = superConstructor || extension;
      superConstructor = Constructor;
    }

    superConstructor || (superConstructor = Constructor);

    constructor.superConstructor = superConstructor;
    constructor.prototype = construct(superConstructor.prototype);
    constructor.prototype.constructor = constructor;
    constructor.prototype.superObject = superConstructor.prototype;

    if (extension) constructor.extend(extension);
    constructor.prototype.$super || (constructor.prototype.$super = Constructor.prototype.$super);

    return constructor;
  };

  Constructor.superConstructor = undefined;

  Constructor.prototype.$super = function(property, args){
    var superObject = this.superObject, func = superObject[property];
    if (typeof func !== 'function') throw "no superclass function `"+property+"`";
    this.superObject = superObject.superObject;
    try{
      return superObject[property].apply(this, args);
    }finally{
      this.superObject = superObject;
    }
  };

  return Constructor;

})();

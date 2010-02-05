function SimpleTestSuite(block){
  var tests = this.tests = {passed:0, failed:0};
  block.call(this, function(description, block){
    var result;
    try{
      result = !!block.call(null);
    }catch(e){
      result = false;
      description = e.toString()+' ('+description+')';
    }
    
    Array.prototype.push.call(tests,[result, description]);
    tests[result ? 'passed' : 'failed'] += 1;
  });
  if (this.report) this.report();
}

/** Example Usage:
*
* new SimpleTestSuite(function(test){
*   test('the truth', function(){
*     return true;
*   });
*   
*   test('something else', function(){
*     return false;
*   });
*
*   console.dir(this.tests);
* });
*
**/
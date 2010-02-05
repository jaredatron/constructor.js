load('../lib/simple_test.js')
load('../src/constructor.js')
load('../test/test.js')

print(constructor_test_suite.tests.passed+' out of '+constructor_test_suite.tests.failed+' tests passed');
for (var i=0; i < constructor_test_suite.tests.length; i++) {
  print((constructor_test_suite.tests[i][0] ? 'PASS' : 'FAIL')+': '+constructor_test_suite.tests[i][1]);
};

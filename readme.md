
## CI pipeline for K6 tests

Do you test your test? If not, you should. Each piece of new test should undergo the same process as actual software product you write tests for. That means you should:

* Run a quick CI check on every new test commit (test CI)
* Run a complete functional regression on all tests on Pull Request (test regression)

Unlike real load tests, above checks should only verify if functional side of your tests is fine. Simpy, put most of the time 'no errors' is fine.

This is a CI pipeline for developing k6 tests on Azure in a distributed team.

Convention used:

1) We use feature branches for any new piece of test
2) Use naming convention for branches :
  * for actaul features that trigger small check use:

```powershell
  story/perf/{{free text}}/{{name of exec function that will trigger on commit}}
```

e.g.

```
  story/perf/products_creation_test/products
```
* for fixes that should trigger whole world tests use word 'regression' (will trigger regression on commit)

```
  story/perf/some_bugfix/regression
```

3) When Pull Request is raised 'regression' suite is run automatically.

### How to use?
1. Fork this repo
2. This repo contains the pipeline '_k6_ci_runner.yaml_'. Create a pipeline of it in your Azure DevOps.
3. Create a new branch from develop using naming convention above. e.g.

```powershell
  stroy/perf/module_x_tests/module_x
```
By doing this you specify that module_x() will be used to verify your feature.

4. Idally develop your code in a module e.g. _some_module.js_
5. in _k6_ci_runner.js_ import the code that should trigger to test your test (that is module_x function must be defined in some_module or be default export)

```json
  import module_x from "./some_module.js"; //import default function

//add it to regression checks
const regressionTests = [
  { module: "some_module", test: modulex_x, name: "modulex_x" },
  ...
];
```

6. Now continue working on your code, on every commit module_x() is fired, on every PR all functions from regressionTests( are run).


It is actually simpler than it looks. Good Luck.

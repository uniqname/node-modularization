
What a module isn't
    Repeated code abstracted out (Necessary but not sufficient)
    Code that manipulates other code external to itself. (Not a pure function)

    EX:
    ```
    var greeting = 'Hello',
        name = 'Maria';

    function SpanishifyGreeting() {
        greeting = 'Hola';
    };
    ```

What a module is
    A pure function (no side effects)
    General applicability
    Single task orientation (SRP)
    Implementation independent

    EX:
    ```
    var greeting = greeting('cn');
        name = 'Maria';

    function greeting(lang) {
        var greetings = {
            cn: 'Nǐ Hǎo',
            en: 'Hello',
            fr: 'Bonjour',
            es: 'Hola'
        }

        return greetings[lang] || greetings['eng'];
    };
    ```

Module interfaces
    Care should be given with interface design
    Follow conventions of the platform
    provide sane defaults
    Be Statless*


    *Unless your module IS a state machine


Module Interface patterns
    Higher order functions
    Singletons (state machines)
    Async
        callbacks
            args => errObj, result
        promises
        streams



Module definitions in Node
    Today
        module.exports = mod
        require('./mod')
    Tomorrow (ES2015 AKA ES6)
        export function () {...}
        import * as mod from './module'

    When a module is `require`d in, a number of things happen.
        1. `require` is a wrapper around `module.require` which in turn is a wrapper around Module._load
        1. `Module._load` checks Module._cache for an existence of the `require`d module
        1. If empty, creates a new Module instance and saves it to Module._cache
        1. Calls `module.load()` with the `require`'s filename.
        1. Removes the module from cache if there was a error loading or parsing the file
        1. returns module.exports

    It is what module.load does that makes `require`d modules work the way they do.
        The module's code is wrapped in function and passed it's own instance of Module, a shortcut to module.exports, a shortcut to module.require, the filename and the directoryname.

        (function (exports, require, module, __filename, __dirname) {
        // YOUR MODULE CODE HERE!
        })
        var args = [self.exports, require, self, filename, dirname];
        return compiledWrapper.apply(self.exports, args);


Example

    ```
    var resourceData,
        otherResourceData;

    ...

    //resource
    if (!resourceData) {
        http.get(resource, function (resp) {

            //cache it for later
            resourceData = resp;
            doStuff(resourceData);
        }).on('error', function (err) {
            console.error('Error?!?!! (ノಠ益ಠ)ノ彡┻━┻')
        });
    } else {
        doStuff(resourceData);
    }

    ...

    //other resource
    if (!otherResourceData) {
        http.get(resource, function (resp) {

            // cache it for later
            resourceData = resp;
            doStuff(resourceData);
        }).on('error', function (err) {
            console.error('Error?!?!! (ノಠ益ಠ)ノ彡┻━┻')
        });
    } else {
        doStuff(resourceData);
    }

    ```
    ```

    // somewhere.js
    var getResourceData = function (resource) {

        //resource cache
        var resources = {};

        new Promise(function (resolve, reject) {
            if (resources[resource]) {
                resolve(resourceData);
            }

            http.get(resource, function (resp) {
                resources[resource] = resp;
                resolve(resourceData);
            }).on('error', function (err) {
                console.error('Error?!?!! (ノಠ益ಠ)ノ彡┻━┻', err);
                reject(err);
            });
        });

        return p;
    }

    getResourceData(resource).then(function (data) {
        doStuff(data);
    });

    // somewhereElse.js
    var getResourceData = function (resource) {

        //resource cache
        var resources = {};

        new Promise(function (resolve, reject) {
            if (resources[resource]) {
                resolve(resourceData);
            }

            http.get(resource, function (resp) {
                resources[resource] = resp;
                resolve(resourceData);
            }).on('error', function (err) {
                console.error('Error?!?!! (ノಠ益ಠ)ノ彡┻━┻', err);
                reject(err);
            });
        });

        return p;
    }
    getResourceData(otherResource).then(function (data) {
        doStuff(data);
    });

    ```
    ```
    //getResourceData.js
    module.exports = function (resource) {

        //resource cache
        var resources = {};

        new Promise(function (resolve, reject) {
            if (resources[resource]) {
                resolve(resourceData);
            }

            http.get(resource, function (resp) {
                resources[resource] = resp;
                resolve(resourceData);
            }).on('error', function (err) {
                console.error('Error?!?!! (ノಠ益ಠ)ノ彡┻━┻', err);
                reject(err);
            });
        });

        return p;
    }

    //somewhere.js
    var resource = require('./getResourceData');

    ...

    resource(myResource).then(function (doStuff) {
    });

    //somewhereElse.js
    var resource = require('./getResourceData');

    ...

    resource(myOtherResource).then(function (doStuff) {
    });

    ```

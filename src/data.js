// ================================================================================
// DATA
// ================================================================================
/* jshint  multistr:true */
'use strict';

// Grab user's github data via the GitHub API
var githubData = getData('https://api.github.com/users/uniqname');
// Global context for Handlebars templates in `src/templates`
var data = {
    githubData: githubData,



    // ------------------------------------------
    // CUSTOMIZE BELOW
    // ------------------------------------------

    theme: {
        mainColor: '#003640',
        specialTransition: 'zoom'
    },
    title: 'Modularization',
    subtitle: 'Modular Development in Node',
    greetingText: 'I can haz nodz to?',
    goodbyeText: 'All our nodes are now belong to you',
    sections: [{
        title: 'What A Module Isn\'t',
        subtitle: '',
        background: {
            image: 'rube.jpg',
            size: 'cover'
        },
        slides: [
            {
                title: '',
                background: {
                    image: 'this-is-not-a-module.svg',
                    size: '80% 80%'
                },
                uniqueContent: '',
                notes: 'This is not a module.'
            }, {
                title: 'Neither is this',
                uniqueContent: '
<pre><code>
// greeting-es.js
module.exports = function () {
greeting = \'Hola\';
};
...
// app.js
var spanishifyGreeting = require(\'greeting-es\');

greeting = \'Hello\',
name = \'Maria\';

spanishifyGreeting();

console.log(greeting + \' \' + name); // Hola Maria

</code></pre>

                ',
                notes: 'This file introduces side effects and so is not a pure function.\
                It also relies on the existence of a variable external to itself.\
                This is a dispersed monolithic application, not a modular one.'

            }, {
                title: 'Not a module',
                uniqueContent: '\
                    <ul>\
                        <li>Repeated code abstracted out. <small><em>(Necessary but not sufficient)</em></small></li>\
                        <li>Code that manipulates other code external to itself. <small><em>(Not a pure function)</em></small></li>\
                    </ul>\
                '
            }]
        }, {
            title: 'What a Module Is',
            subtitle: '',
            background: {
                image: 'tesla.jpg',
                size: 'cover'
            },
            slides: [{
                title: '',
                uniqueContent: '\
                    <ul>\
                        <li>Stateless<sup>*</sup></li>\
                        <li>Pure functions (no side effects)</li>\
                        <li>General applicability</li>\
                        <li>Single task orientation (SRP)</li>\
                        <li>Implementation independent</li>\
                    </ul>\
\
                    <p><small><sup>*</sup>Unless your module IS or implements a State Machine</small></p>\
                '
            }, {
                title: 'A more modular function',
                uniqueContent: '
<pre><code>

var greeting = greeting(\'cn\');
name = \'Maria\';

function greeting(lang) {
    var greetings = {
        cn: \'Nǐ Hǎo\',
        en: \'Hello\',
        fr: \'Bonjour\',
        es: \'Hola\'
    };

    return greetings[lang] || greetings[\'en\'];
};
console.log(greeting + \' \' + name);

</code></pre>

                ',
                notes: 'This code is stateless.\
                It doesn\'t manipulate code external to itself and so has no side effects.\
                It is generally applicable because provides a specific function and does not rely on the existence of anything else\
                It is concerned with only one thing -- providing greetings in different languages.\
                One does not need to know the details of how it works, only the way to interact with it.'
            }]
        }, {
            title: 'Module Interface Patterns',
            subtitle: 'Singletons, Factories &amp; Objects',
            background: {
                image: 'Factory.svg',
                size: 'contain',
                repeat: 'no-repeat',
                position: 'center bottom'
            },
            slides: [{
                title: 'Singletons',
                background: {
                    image: 'singularity.png',
                    size: 'contain',
                    repeat: 'no-repeat'
                },
                uniqueContent: '\
                <p>Singletons are constructors that only allow one instance to be created.</p>\
                <p class="fragment">All node modules are effectively singletons since they are executed only once, regardless how many times they are reqired.</p>\
                '
            }, {
                title: 'Factories',
                background: {
                    image: 'Factory.svg',
                    size: 'contain',
                    repeat: 'no-repeat',
                    position: 'bottom center'
                },
                uniqueContent: '\
                <p>Factories are functions that create and return functions</p>
                <p class="fragment">Singletons can be factories!</p>
<pre class="fragment"><code>
//A compliment factory
module.exports = function (presentParticiples) {
    return function (name) {
        "My " + name
        + "you\'re so good at "
        + (getRandomItem(presentParticiples)) + "!"
    }
}

</code></pre>
                ',
                notes: ''
            }, {
                title: 'Objects',
                background: {
                    image: 'brackets.svg',
                    size: 'contain',
                    repeat: 'no-repeat'
                },
                uniqueContent: '\
                <p>Return an object to provide a collection of related activities.</p>
                <p class="fragment"><strong>Remember</strong>: node modules are effectively singletons. If you want a pristine object every <code>require</code>, use a factory</p>
<pre class="fragment"><code>
//A factory for plain objects
return function () {
    return {};
}

</code></pre>
                ',
                notes: ''
            }]
        }, {
            title: 'Convention!',
            subtitle: 'Get used to Async',
            background: {
                image: 'fiddler.svg',
                size: 'contain',
                repeat: 'no-repeat',
                position: 'bottom center'
            },
            slides: [{
                title: 'Be async by default',
                uniqueContent: '\
                <p class="fragment">Callbacks <small>( <code>function (err, data) {...}</code> )</small></p>\
                <p class="fragment">Promises <small>( A+ please )</small></p>\
                <p class="fragment">Streams <small>( streams are nice :)</small></p>'
            }]
        }, {
            title: 'Under the Hood',
            background: {
                image: 'hood.svg',
                size: 'contain',
                repeat: 'no-repeat',
                position: 'left bottom'
            },
            subtitle: '<code>require</code> and <code>exports</code> in node',
            slides: [{
                title: 'Module Syntax',
                uniqueContent: '
                <dl>
                    <dt>Tomorrow (ES2015 AKA ES6)</dt>
                    <dd><code>export function () {...}</code></dd>
                    <dd><code>import * as mod from \'./module\'</code></dd>
                </dl>
                '
            }, {
                title: 'Module Syntax',
                uniqueContent: '
                <dl>
                    <dt>Today</dt>
                    <dd><code>module.exports = mod</code></dd>
                    <dd><code>require(\'./mod\')</code></dd>
                </dl>
                '
            }, {
                title: 'When a module is <code>require</code>d in, a number of things happen.',
                uniqueContent: ''
            }, {
                title: '',
                uniqueContent: '\
                <ol>\
                    <li><code>require</code> is a wrapper around <code>module.require</code> which in turn is a wrapper around <code>Module._load</code></li>\
                    <li class="fragment"><code>Module._load</code> checks <code>Module._cache</code> for an existence of the <code>require</code>d module</li>\
                </ol>\
                '
            }, {
                title: '',
                uniqueContent: '\
                <ol start="3">\
                    <li>If empty, creates a new Module instance and saves it to <code>Module._cache</code></li>\
                    <li class="fragment">Calls <code>module.load()</code> with the <code>require</code>\'s filename.</li>\
                </ol>\
                '
            }, {
                title: '',
                uniqueContent: '\
                <ol start="5">\
                    <li>Removes the module from cache if there was a error loading or parsing the file</li>\
                    <li class="fragment">returns <code>module.exports</code> to the module</li>\
                </ol>\
                '
            }, {
                title: '<code>module.load</code>',
                uniqueContent: '\
                <p>It is what <code>module.load</code> does that makes <code>require</code>d modules work the way they do.</p>\
                '
            }, {
                title: '',
                uniqueContent: '
    <p>The module\'s code is wrapped in a function and passed a few parameters.</p>

    <pre><code>
    Module.wrap = function (script) {
        var wrap = [\'(function (exports, require, module, __filename, __dirname) {\',
                \'})\'];
        return wrap[0] + script + wrap[1];
    }

    var wrapper = Module.wrap(fileContent);
    var compiledWrapper = runInThisContext(wrapper, { filename: filename });
    var args = [self.exports, require, self, filename, dirname];
    return compiledWrapper.apply(self.exports, args);

    </code></pre>
                '
            }]
        }, {
        title: 'Walk Through',
        subtitle: 'Short on cache',
        background: {
            image: 'footprints.svg',
            size: 'contain',
            repeat: 'no-repeat'
        },
        slides: [{
            title: 'Fetch and Cache',
            uniqueContent: '\
<pre><code>
var resourceData,
otherResourceData;

...

//resource
if (!resourceData) {
    http.get(\'http://resource.app/data\', function (resp) {

        //cache it for later
        resourceData = resp;
        doStuff(resourceData);
    }).on(\'error\', function (err) {
        console.error(\'Error?!?!! (ノಠ益ಠ)ノ彡┻━┻\', err);
    });
} else {
    doStuff(resourceData);
}

</code></pre>
            ',
            notes: 'Local cache of single resource<br />
            Check for resource existence.<br />
            Fetch it if it\'s not there<br />
            Cache it when it comes back<br />
            doStuff'
        }, {
            title: 'Functionized',
            uniqueContent: '\
            <pre><code>
// somewhere.js
var getResourceData = function () {
    //resource cache
    var resourceData;
    return new Promise(function (resolve, reject) {
        if (resourceData) { resolve(resourceData); }
        http.get(\'http://resource.app/data\', function (resp) {
            resourceData = resp;
            resolve(resourceData);
        }).on(\'error\', function (err) {
            console.error(\'Error?!?!! (ノಠ益ಠ)ノ彡┻━┻\', err);
            reject(err);
        });
    });
}
getResourceData().then(doStuff);

            </code></pre>
            ',
            notes: 'Functional caching of a single resource<br />
            Check for resource existence.<br />
            Fetch it if it\'s not there<br />
            Cache it when it comes back<br />
            returns resource'
        }, {
            title: 'Modularized',
            uniqueContent: '\
            <pre><code>
//getResourceData.js
module.exports = function (resource) {
    //resource cache
    var resources = {};
    return new Promise(function (resolve, reject) {
        if (resources[resource]) { resolve(resourceData); }
        http.get(resource, function (resp) {
            resources[resource] = resp;
            resolve(resourceData);
        }).on(\'error\', function (err) {
            console.error(\'Error?!?!! (ノಠ益ಠ)ノ彡┻━┻\', err);
            reject(err);
        });
    });
}
//somewhere.js
var resources = require(\'./getResourceData\');
resources(\'http://resource1.app/data\').then(doStuff)
resources(\'http://resource2.app/data\').then(doOtherStuff)

            </code></pre>
            ',
            notes: 'Modularized caching of ANY resource<br />
            Check for resource existence.<br />
            Fetch it if it\'s not there<br />
            Cache it when it comes back<br />
            return resource'
        }]
    }]
};

var ElmCompiler = require('node-elm-compiler');
var UglifyJS = require('uglify-js');

module.exports = function elmLoader(content, map, meta) {
    var callback = this.async();

    var optimize = this.query.optimize;
    var opts = {};
    if (optimize) {
        opts.optimize = true;
    } else {
        opts.debug = true;
    }

    var addDependency = this.addDependency;

    ElmCompiler.findAllDependencies(this.resourcePath).then(function (dependencies) {
        dependencies.forEach(function (dependency) {
            addDependency(dependency);
        });
    });


    ElmCompiler.compileToString([this.resourcePath], opts).then(function (data) {
        if (optimize) {
            var result = minify(data);
            if (result.error) {
                console.log(result.error);
                data = "";
            } else {
                data = result.code;
            }
        };
        callback(null, data, map, meta);
    }).catch(function (err) {
        console.log(err);
        callback(null, "", map, meta);
    });
}

function minify(jsString) {
    const options = {
        compress: {
            pure_funcs: ['F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
            keep_fargs: false,
            pure_getters: true,
            unsafe_comps: true,
            unsafe: true
        },
    };
    return UglifyJS.minify(jsString, options);
}
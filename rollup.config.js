import glob from 'glob';
import path from 'path';
import paths from './paths';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodeBuiltins from 'rollup-plugin-node-builtins';

       
const config = [];
const scopes = glob.sync(path.join(paths.scripts, '**', 'scope', '*.js'));

const es5Plugins = [
        babel(
            {
                presets: [
                    [
                        'minify', {
                            builtIns: false
                        }
                    ], 
                    '@babel/preset-env'
                ]
            }
        ),
        nodeBuiltins(),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs()
      ],
      es6Plugins = [
        nodeBuiltins(),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs()
      ]


const getOutputFile = (scope, device, isEs6, isProd) => {
    const parsedPath = path.parse(scope);
    const subext = isEs6 ? '.es6' : '';

    let outputFile;

    if (isProd) {
        outputFile = path.join(paths.publish, device, `${parsedPath.name}Lib${subext}${parsedPath.ext}`);
    } else {
        outputFile = path.join(paths.dist, device, `${parsedPath.name}${subext}${parsedPath.ext}`)
    }

    return outputFile;
}

const getPlugins = (scope, isEs6) => {

    let plugins;
    const parsedScope = path.parse(scope);

    if (isEs6) {
        plugins = [...es6Plugins];
    } else {
        plugins = [...es5Plugins];
    }

    if ( parsedScope.name === 'a') {
        //plugins.push(...);
    }

    return plugins;
}

scopes.forEach(scope => {

    const device = scope.includes('desktop') ? 'desktop' : 'smartphone';

    config.push({
        input: scope,
        output: {
            file: getOutputFile(scope, device, false, false),
            format: 'iife'
        },
        plugins: getPlugins(scope, false)
    })

})

scopes.forEach(scope => {

    const device = scope.includes('desktop') ? 'desktop' : 'smartphone';

    config.push({
        input: scope,
        output: {
            file: getOutputFile(scope, device, true, false),
            format: 'esm'
        },
        plugins: getPlugins(scope, true)
    })

})

export default config;
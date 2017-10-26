import * as fs from 'fs';
import { ApplicationRef } from '@angular/core';
import { platformServer, platformDynamicServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';
/**
 * This holds a cached version of each index used.
 */
var templateCache = {};
/**
 * This is an express engine for handling Angular Applications
 */
export function ngExpressEngine(setupOptions) {
    setupOptions.providers = setupOptions.providers || [];
    return function (filePath, options, callback) {
        try {
            var moduleFactory = setupOptions.bootstrap;
            if (!moduleFactory) {
                throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
            }
            var extraProviders = setupOptions.providers.concat(getReqResProviders(options.req, options.res), [
                {
                    provide: INITIAL_CONFIG,
                    useValue: {
                        document: getDocument(filePath),
                        url: options.req.originalUrl
                    }
                }
            ]);
            var moduleRefPromise = setupOptions.aot ?
                platformServer(extraProviders).bootstrapModuleFactory(moduleFactory) :
                platformDynamicServer(extraProviders).bootstrapModule(moduleFactory);
            moduleRefPromise.then(function (moduleRef) {
                handleModuleRef(moduleRef, callback);
            });
        }
        catch (e) {
            callback(e);
        }
    };
}
function getReqResProviders(req, res) {
    var providers = [
        {
            provide: 'REQUEST',
            useValue: req
        }
    ];
    if (res) {
        providers.push({
            provide: 'RESPONSE',
            useValue: res
        });
    }
    return providers;
}
/**
 * Get the document at the file path
 */
function getDocument(filePath) {
    return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}
/**
 * Handle the request with a given NgModuleRef
 */
function handleModuleRef(moduleRef, callback) {
    var state = moduleRef.injector.get(PlatformState);
    var appRef = moduleRef.injector.get(ApplicationRef);
    appRef.isStable
        .filter(function (isStable) { return isStable; })
        .first()
        .subscribe(function (stable) {
        var bootstrap = moduleRef.instance['ngOnBootstrap'];
        bootstrap && bootstrap();
        callback(null, state.renderToString());
        moduleRef.destroy();
    });
}

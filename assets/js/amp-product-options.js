import 'babel-polyfill';

import $ from 'jquery';
import async from 'async';
import Product from './theme/product';

/**
 *
 * @param {Object} pageObj
 */
function series(pageObj) {
    async.series([
        pageObj.before.bind(pageObj), // Executed first after constructor()
        pageObj.loaded.bind(pageObj), // Main module logic
        pageObj.after.bind(pageObj), // Clean up method that can be overridden for cleanup.
    ], (err) => {
        if (err) {
            throw new Error(err);
        }
    });
}

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = (contextJSON) => {
    const context = JSON.parse(contextJSON);

    return {
        load() {
            $(() => {
                const product = new Product(context);
                product.context = context;

                console.log(123);

                series(product);
            });
        },
    };
};

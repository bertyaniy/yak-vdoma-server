/**
 * Extends router handlers with simple awaiters.
 * 
 * Allows to throw async errors in controllers
 */
class RouterProxy {
    constructor(router) {
        router.stack.forEach(layer => {
            layer.route.stack.forEach(routeLayer => {
                // Get original handler
                const handleFunction = routeLayer.handle;
                // And extend it with awaiter
                routeLayer.handle = this.getProxyFunction(handleFunction);
            });
        });

        // Return extended router
        return router;
    }

    // Returns route handler extended with awaiter
    getProxyFunction(handleFunction) {
        return async function (req, res, next) {
            try {
                await handleFunction(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    }
}

module.exports = { RouterProxy };
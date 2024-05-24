const { loadRoutes } = require('../routes/loadRoutes');
const { parseRequestBody } = require('../middlewares/parseRequestBodyMiddleware');
const routes = loadRoutes();
const routeMap = {};

routes.forEach((route) => {
    const { path, method, handler, middleware } = route;
    if (!routeMap[method]) {
        routeMap[method] = {};
    }
    routeMap[method][path] = { handler, middleware };
});

const handleRequest = async (req, res) => {
    try {
        const { method, url } = req;
        const routeMethods = routeMap[method] || {};
        let routeInfo = routeMethods[url];

        for (const path in routeMethods) {
            const routePath = path.split('/:')[0];
            if (url.startsWith(routePath)) {
                routeInfo = routeMethods[path];
                break;
            }
        }

        if (routeInfo) {
            const { handler, middleware } = routeInfo;
            const requestBody = await parseRequestBody(req);
            req.body = requestBody;

            const executeHandler = async () => {
                await handler(req, res);
            };

            const executeMiddlewares = async (middlewares, index = 0) => {
                if (index < middlewares.length) {
                    const nextMiddleware = middlewares[index];
                    nextMiddleware(req, res, () => executeMiddlewares(middlewares, index + 1));
                } else {
                    await executeHandler();
                }
            };

            if (middleware && middleware.length > 0) {
                await executeMiddlewares(middleware);
            } else {
                await executeHandler();
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
        console.error('Error handling request:', error);
    }
};

module.exports = { handleRequest };

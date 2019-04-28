import { BaseRoute } from './routes';

import { UserRoute } from './user/user.routes';

export class ApiRoutes extends BaseRoute {

    public static path = '/';
    private static instance: ApiRoutes;

    private constructor() {
        super();
        this.init();
    }

    static get router() {
        //applying singleton method to create only one instance of the router class
        if (!ApiRoutes.instance) {
            ApiRoutes.instance = new ApiRoutes();
        }
        return ApiRoutes.instance.router;
    }

    private init() {
        // Route handler for the user routes
        this.router.use(UserRoute.path, UserRoute.router);
    }
}
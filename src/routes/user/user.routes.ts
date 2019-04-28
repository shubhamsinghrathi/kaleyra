//this is the admin router file
import { BaseRoute } from '../routes';
import { UserController } from '../../controllers';
import { checkBody, checkEmail, checkBodyOptional, checkParamMongoId, numberCheck, numberCheckOptional, checkArrayOptional, checkMongoIdOptional, mongoIdChecker } from '../../middlewares';
import { validator, userCheckCookies, userSignupCheck } from '../../middlewares';

export class UserRoute extends BaseRoute {
    public static path = '/';
    private static instance: UserRoute;
    private userController = new UserController();

    private constructor() {
        super();
        //initiating the routers
        this.init();
    }

    static get router() {
        if (!UserRoute.instance) {
            UserRoute.instance = new UserRoute();
        }
        return UserRoute.instance.router;
    }

    private async init() {
        // User's Routes 

        /**
         * user's home page
         */
        this.router.get("/",
        userCheckCookies,
        (req, res) => {
            return this.userController.userHome(req, res);
        });

        /**
         * user's signup page
         */
        this.router.get("/signup",
        userSignupCheck,
        (req, res) => {
            return this.userController.userSignupGET(req, res);
        });

        /**
         * used for user's signup
         */
        this.router.post("/signup",
        userSignupCheck,
        [
            checkBody('name'),
            checkBody('mobileNumber'),
            checkBody('password'),
            validator,
        ],
        (req, res) => {
            this.userController.userSignupPOST(req, res)
        });

        /**
         * user's login page
         */
        this.router.get("/login",
        userSignupCheck,
        (req, res) => {
            return this.userController.userLoginGET(req, res);
        });

        /**
         * used for user's login
         */
        this.router.post("/login",
        userSignupCheck,
        [
            checkBody('mobileNumber'),
            checkBody('password'),
            validator,
        ],
        (req, res) => {
            this.userController.userLoginPOST(req, res)
        });

        /**
         * user logout
         */
        this.router.get("/logout",
        userCheckCookies,
        (req, res) => {
            return this.userController.userLogout(req, res);
        });

        /**
         * used to send message
         */
        this.router.post("/message",
        userCheckCookies,
        [
            checkBodyOptional('mobileNumber'),
            checkBody('message'),
            checkBody('isBroadcast'),
            validator,
        ],
        (req, res) => {
            this.userController.userMessage(req, res)
        });

        /**
         * used to make a call
         */
        this.router.post("/call",
        userCheckCookies,
        [
            checkBody('mobileNumber'),
            validator,
        ],
        (req, res) => {
            this.userController.userCall(req, res)
        });

        //page not found
        this.router.all('*', (req, res) => {
            res.status(404).json({
                success: false,
                message: 'Invalid route',
                result: {},
                statusCode: 404
            });
        })
    }
}
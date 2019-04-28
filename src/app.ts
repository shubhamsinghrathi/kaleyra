import {
    express,
    bodyParser,
    cors,
    helmet
} from './dependencies/index';
import { Request, Response, NextFunction } from 'express';
import { ApiRoutes } from './routes/index.routes';
import { MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD, bootInit } from "./util";
import * as mongoose from "mongoose";
import { initGlobals } from './util/globals';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

class App {
    constructor() {
        initGlobals(); //initialize new globals
        this.app = express();
        this.initDependency();
        this.connectMongo();
        mongoose.set('debug', true);
        this.routes();
        bootInit(); //initialize bootstrap methods
    }

    public app: express.Application;

    private initDependency(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser())
        this.app.use(cors());
        this.app.use(helmet());
        this.logger();
        this.errorHandler();
        this.app.use(express.static(path.join(__dirname, '../public'))); //creating public folder router
        this.app.use(express.static(path.join(__dirname, '../client')));
    }

    private routes(): void {
        //view engine setup
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "ejs");

        this.app.use(ApiRoutes.path, ApiRoutes.router);
        this.app.use((req, res, next) => {
            res.status(404).json({
                success: false,
                message: 'Invalid route',
                result: {},
                statusCode: 404
            });
        });
    }

    private logger(): void {
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            global.log('--------------------------------request Details----------------------------------------', req.originalUrl);
            global.log('Req Type', req.method);
            global.log('auth-token', req.headers['auth-token']);
            global.log('authorization', req.headers['authorization']);
            global.log('user-agent', req.headers['user-agent']);
            global.log('Host', req.headers['host']);
            global.log('Req Body', req.body);
            global.log('Req Params', req.params);
            global.log('Req Query', req.query);
            global.log('-----------------------------------------ENDS------------------------------------------');
            next();
        });
    }

    // Connect to mongodb
    private connectMongo(): void {
        if (!MONGODB_USER) {
            mongoose.connect(MONGODB_URI).then(
                () => {
                    global.logger.info('Connected to the database');
                },
            ).catch(err => {
                global.logger.error('Error in connecting to the database');
                process.exit();
            });
        } else {
            mongoose.connect(MONGODB_URI, {
                auth: {
                    user: MONGODB_USER,
                    password: MONGODB_PASSWORD
                }
            }).then(
                () => {
                    global.logger.info('Connected to the database');
                },
            ).catch(err => {
                global.logger.error('Error in connecting to the database');
                process.exit();
            });
        }
    }

    // Unexpected error handler
    private errorHandler(): void {
        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(err.status || 500);
            return res.json({
                success: false,
                message: err.message,
                result: {},
                statusCode: err.status
            });
        })
    }
}

export default new App().app;
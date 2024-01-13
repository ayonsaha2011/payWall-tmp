import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/typegraphql";
import "@tsed/passport";
import RedisStore from "connect-redis"
import { createClient } from "redis"
import nunjucks from "nunjucks";
import multer from "multer";
import nocache from "nocache";
import session from "express-session";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "./datasources/index";
import "./resolvers/index";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import * as pages from "./controllers/pages/index";
import * as admin from "./controllers/admin/index";
import { NotFoundMiddleware } from "./middlewares/NotFoundMiddleware";
import './protocols'
import { User } from "./models/User";

const nunjucksInstances = nunjucks.configure("./views", {
  watch: true,
  noCache: true
});
nunjucksInstances.addFilter("date", function (date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
});

// Initialize client.
export const redisClient = createClient({ url: process.env.REDIS_URL, })
redisClient.connect().catch(console.error)

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
  // ttl: 36000 // 10 hours
})
@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  logger: {
    ignoreUrlPatterns: [/\/favicon.ico$/, /\(.*?g'\)/ig, /([^\/.]+)$|([^\/]+)(\.[^\/.]+)$/g],
    debug: false,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/rest": [
      ...Object.values(rest)
    ],
    "/": [
      ...Object.values(pages)
    ],
    "/admin": [
      ...Object.values(admin)
    ]
  },
  middlewares: [
    "cors",
    "nocache",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
    session({
      store: redisStore,
      secret: "mysecretkey",
      resave: true,
      saveUninitialized: true,
      // maxAge: 36000, // 10 hours
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        // maxAge: 36000 // 10 hours
      }
    })
  ],
  statics: {
    "/": [
      {
        root: `./public`,
        // Optional
        hook: "$beforeRoutesInit" // Load statics on the expected hook. Default: $afterRoutesInit
        // ... statics options
      }
    ]
  },
  multer: {
    dest: `./public/uploads`,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./public/uploads`)
      },
      filename: function (req, file, cb) {
        const uniquePreFix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const re = /(?:\.([^.]+))?$/;
        const ext = file.originalname.split('.').pop();
        console.log("filename == file === ", uniquePreFix + ext);
        cb(null, uniquePreFix + ext)
      }
    }),
    preservePath: false,
  },
  views: {
    root: join(process.cwd(), "../views"),
    viewEngine: "nunjucks",
    extensions: {
      njk: "nunjucks"
    },
    options: {
      nunjucks: {
        requires: nunjucksInstances
      }
    }
  },
  exclude: [
    "**/*.spec.ts"
  ],
  passport: {
    /**
     * Set a custom user info model. By default Ts.ED use UserInfo. Set false to disable Ts.ED json-mapper.
     */
    userInfoModel: User
    // userInfoModel: false,
    // userProperty: string,
    // pauseStream: string,
    // disableSession: boolean
  }
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  public $afterRoutesInit() {
    this.app.use(NotFoundMiddleware);
  }
}

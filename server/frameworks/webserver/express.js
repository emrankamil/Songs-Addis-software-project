import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";

export default function expressConfig(app) {
  app.use(helmet());
  app.use(compression())
  app.use(bodyParser.json({limit:'50mb'}))
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization, Cache-control, Pragma"
    );
    next()
  })
  app.use(morgan('combined'))
}

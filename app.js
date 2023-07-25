const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//const s3Client = require("./config").s3Client;
//const minioConfig = require("./config").minioConfig;
//const objectsStream = require("./config").objectsStream;

//const dbConfig = require("./config").db[process.env.APP_ENV || "development"];
const minioConfig =
  require("./config").minio[process.env.APP_ENV || "development"];
//const db = pgp(dbConfig);
if (process.env.APP_ENV != "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}
var Minio = require("minio");

var s3Client = new Minio.Client({
  // endPoint: "192.168.7.254",
  // port: 9000,
  // accessKey: "Cqx3gio0QqHWzhD9iRHz",
  // secretKey: "opCSmEyyZOwZgo28jIOY04401XWLBW544FzYauYI",
  // useSSL: true,
  endPoint: minioConfig.endPoint,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey,
  port: parseInt(minioConfig.port),
  useSSL: minioConfig.useSSL === "true" ? true : false,
  // endPoint: "s3.amazonaws.com",
  // accessKey: "YOUR-ACCESSKEYID",
  // secretKey: "YOUR-SECRETACCESSKEY",
});

var objectsStream = s3Client.extensions.listObjectsV2WithMetadata(
  "minio-test",
  "",
  true,
  ""
);

//console.log("objectsStream", objectsStream);
objectsStream.on("data", function (obj) {
  console.log(obj);
});
objectsStream.on("error", function (e) {
  console.log(e);
});

//console.log("minioConfig", minioConfig);
//console.log("s3Client", s3Client);

const app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("viewengine", "ejs");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/presignedUrl", (req, res) => {
  s3Client.presignedPutObject("minio-test", req.query.name, (err, url) => {
    //client.presignedPutObject("uploads", req.query.name, (err, url) => {
    if (err) throw err;
    res.end(url);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});
app.listen(3000, () => console.log("Server started on port 3000"));

module.exports = app;

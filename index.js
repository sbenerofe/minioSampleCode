const dbConfig = require("./config").db[process.env.APP_ENV || "development"];
const minioConfig =
  require("./config").minio[process.env.APP_ENV || "development"];
//const db = pgp(dbConfig);

var Minio = require("minio");

var s3Client = new Minio.Client({
  endPoint: minioConfig.bucketName,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey,
  // endPoint: "s3.amazonaws.com",
  // accessKey: "YOUR-ACCESSKEYID",
  // secretKey: "YOUR-SECRETACCESSKEY",
});

var objectsStream = s3Client.extensions.listObjectsV2WithMetadata(
  minioConfig.bucketName,
  "",
  true,
  ""
);

module.exports = { minioConfig, s3Client, objectsStream };

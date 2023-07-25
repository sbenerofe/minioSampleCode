// import * as dotenv from 'dotenv';  see github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//dotenv.config();

require("dotenv").config();

module.exports = {
  db: {
    development: {
      user: process.env.DB_DEVELOPMENT_USERNAME,
      password: process.env.DB_DEVELOPMENT_PASSWORD,
      database: process.env.DB_DEVELOPMENT_DATABASE,
      host: process.env.DB_DEVELOPMENT_HOST_RPI,
      port: 5432,
    },
    test: {
      user: process.env.DB_TEST_USERNAME,
      password: process.env.DB_TEST_PASSWORD,
      database: process.env.DB_TEST_DATABASE,
      host: process.env.DB_TEST_HOST_RPI,
      port: process.env.DB_TEST_PORT || 5432,
      dialect: "postgres",
    },
    production: {
      user: process.env.DB_PRODUCTION_USERNAME,
      password: process.env.DB_PRODUCTION_PASSWORD,
      database: process.env.DB_PRODUCTION_DATABASE,
      host: process.env.DB_PRODUCTION_HOST_RPI,
      port: process.env.DB_PRODUCTION_PORT || 5432,
      dialect: "postgres",
    },
    local: {
      user: process.env.DB_LOCAL_USERNAME,
      password: process.env.DB_LOCAL_PASSWORD,
      database: process.env.DB_LOCAL_DATABASE,
      host: process.env.DB_LOCAL_HOST_RPI,
      port: process.env.DB_LOCAL_PORT || 5432,
      dialect: "postgres",
    },
  },
  minio: {
    development: {
      bucketName: process.env.MINIO_BUCKET_NAME,
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
    test: {
      bucketName: process.env.MINIO_BUCKET_NAME,
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
    local: {
      bucketName: process.env.MINIO_LOCAL_BUCKET_NAME,
      endPoint: process.env.MINIO_LOCAL_ENDPOINT,
      port: parseInt(process.env.MINIO_LOCAL_PORT),
      useSSL: process.env.MINIO_LOCAL_USE_SSL,
      accessKey: process.env.MINIO_LOCAL_ACCESS_KEY,
      secretKey: process.env.MINIO_LOCAL_SECRET_KEY,
      TLS_RejectUnauthorized: parseInt(
        process.env.MINIO_LOCAL_NODE_TLS_REJECT_UNAUTHORIZED
      ),
    },
    production: {
      bucketName: process.env.MINIO_BUCKET_NAME,
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
  },
};

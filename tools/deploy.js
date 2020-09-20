const path = require("path");
const mime = require("mime-types");
const fs = require("fs-extra");
const aws = require("aws-sdk");
const globby = require("globby");
const metadata = require("../package.json");

const s3 = new aws.S3({
  s3ForcePathStyle: true,
  endpoint: "https://s3.csh.rit.edu",
});

const config = {
  root: path.resolve(__dirname, "../dist"),
  artifacts: ["*.jar"],
  bucket: metadata.name,
  region: "",
  acl: "public-read",
};

async function ensureBucket() {
  const params = {
    Bucket: config.bucket,
  };

  return s3
    .headBucket(params)
    .promise()
    .catch((err) => {
      if (err.code === "NoSuchBucket" || err.code === "NotFound") {
        // Bucket does not exist, create it
        params.CreateBucketConfiguration = {
          LocationConstraint: config.region,
        };

        return s3.createBucket(params).promise();
      }

      // Unhandled error
      throw err;
    });
}

async function upload(srcPath, destPath) {
  return fs.readFile(srcPath).then((data) => {
    const params = {
      Bucket: config.bucket,
      Key: destPath,
      Body: data,
      ACL: config.acl,
    };

    const mimeType = mime.lookup(srcPath);
    if (mimeType) {
      params.ContentType = mimeType;
    }

    return s3.upload(params).promise();
  });
}

async function deploy() {
  const uploaders = [];

  // Ensure the upload bucket exists
  await ensureBucket();

  // Upload each artifact to the bucket
  for (const artifact of config.artifacts) {
    const filenames = await globby(path.resolve(config.root, artifact));

    for (const filename of filenames) {
      let destPath = `${path.dirname(artifact)}/${path.basename(filename)}`;

      if (path.dirname(artifact) === ".") {
        destPath = `${path.basename(filename)}`;
      }

      uploaders.push(upload(filename, destPath));
    }
  }

  return Promise.all(uploaders);
}

(async () => {
  try {
    if (!(await fs.pathExists(path.resolve(config.root)))) {
      console.error("❌ You must build the project before deploying");
      process.exit(1);
    }

    console.log("Uploading Artifacts to S3...");
    await deploy();
    console.log("🥳 Success!");
  } catch (err) {
    if (err.message) {
      if (err.code) {
        console.error(`${err.message} (${err.code})`);
      } else {
        console.error(err.message);
      }
    }

    console.error("❌ Failed to deploy artifacts");
    process.exit(1);
  }
})();

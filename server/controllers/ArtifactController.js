const { fse } = require("fs-extra");
const path = require("path");
const shortid = require("shortid");
const {
  isEmpty,
  messageFormat,
  docExt,
  musicExt,
  imageExt
} = require("../utils");
const Artifact = require("../models/Artifact");

const uploadDir = process.env.UPLOAD_DIR;

const createArtifact = async (userID, data) => {
  let returnData = messageFormat();

  let { artifactText, artifactLink, file: uploadedArtifactFile } = data;

  if (isEmpty(userID)) {
    returnData.message = "User ID is not available";
    return returnData;
  }

  if (
    isEmpty(artifactText) &&
    isEmpty(artifactLink) &&
    isEmpty(uploadedArtifactFile)
  ) {
    returnData.message = "No Artifact Information available";
    return returnData;
  }

  let artifactsCollection = [];

  if (!isEmpty(artifactLink)) {
    artifactsCollection.append({
      type: "link",
      value: encodeURIComponent(link)
    });
  }

  if (!isEmpty(artifactText)) {
    artifactsCollection.append({
      type: "text",
      value: encodeURIComponent(artifactText)
    });
  }

  if (!isEmpty(uploadedArtifactFile)) {
    let allowedExts = docExt + "," + musicExt + "," + imageExt;

    let { originalname, filename } = uploadedArtifactFile;
    let artifactFilePath = path.join(uploadDir, filename);
    let curFileExt = path.extname(originalname);

    let newFileName = shortid.generate() + curFileExt;
    let newFilePath = path.join(uploadDir, newFileName);

    try {
      let result = fs.rename(artifactFilePath, newFilePath);
      allowedExts = allowedExts.split(",");

      if (allowedExts.includes(curFileExt)) {
        let fileType = "other";
        if (docExt.split(",").includes(curFileExt)) {
          fileType = "Document";
        }
        if (musicExt.split(",").includes(curFileExt)) {
          fileType = "Music";
        }
        if (imageExt.split(",").includes(curFileExt)) {
          fileType = "Image";
        }
        artifactsCollection.append({
          type: fileType,
          value: originalname,
          filePath: newFilePath
        });
      }
    } catch (error) {}
  }

  const newArtifact = new Artifact({
    user: userID,
    artifacts: artifactsCollection
  });

  try {
    let savedArtifactData = await newArtifact.save();
    returnData.isError = false;
    returnData.message = "Artifact saved successfully!";
    returnData.data = savedArtifactData.toObject();

    // TODO: Send artifact upload email
    // TODO: Send artifact to blockchain

    return returnData;
  } catch (error) {
    returnData.message = "Artifact could not be saved";
    return returnData;
  }
};

module.exports = { createArtifact };

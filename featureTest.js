const path = require("path");
const mongoose = require("mongoose");
// load environment variables based on NODE_ENV value
if (process.env.NODE_ENV === "production") {
  // load .env file for production
  require("dotenv").config({ path: ".env" });
} else {
  // else load .env.development
  require("dotenv").config({ path: ".env.development" });
}

// APP_DIR Global variable
global.APP_DIR = path.join(__dirname, "./");

const { isEmpty, Cache, getLogger } = require("./server/utils");
const logger = getLogger("featureTesting"); // get logger
let {
  fetchUserFromDB,
  createUser,
  cleanUserData
} = require("./server/controllers/UserController");

const dbConnector = async () => {
  let dbConnection = null;

  try {
    dbConnection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    logger.debug("db connected successfully!");
  } catch (error) {
    logger.error("error connecting DB", error);
  }

  return dbConnection;
};

(async () => {
  let dbConn = await dbConnector();
  console.log(typeof dbConn);

  let userData2 = await fetchUserFromDB("nirajkvinit@gmail.com");
  console.log(userData2);

  if (userData2.isError) {
    logger.error("Error occured!", userData2.message);
  } else if (isEmpty(userData2.data)) {
    logger.info("User information is not available in the system");
    userData2 = await createUser("nirajkvinit@gmail.com");
  } else {
    logger.debug("User is found");
  }

  logger.debug(userData2);

  logger.debug(cleanUserData(userData2.data));

  mongoose.connection.close();
})();

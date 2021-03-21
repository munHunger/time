import Mongo from "mongodb";
const MongoClient = Mongo.MongoClient;

let mongo;

/**
 * @type {import("mongodb").Db}
 */
let client;

function connect() {
  // Connection URL
  const url = process.env.MONGO_URL || "mongodb://db:27017";

  // Database Name
  const dbName = "time";
  console.log("connecting to " + url);
  return MongoClient.connect(url, {
    auth: { user: "root", password: "example" },
  }).then((c) => {
    mongo = c;
    client = c.db(dbName);
  });
}

connect();

function disconnect() {
  console.log("disconnecting mongo");
  return mongo.close();
}

/**
 * @param {string} name
 * @returns {Promise<import("mongodb").Collection}
 */
function collection(name) {
  return new Promise((resolve, reject) => {
    if (!client) setTimeout(() => resolve(collection(name)), 20);
    else
      client.collection(name, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
  });
}

export default {
  connect,
  client,
  disconnect,
  collection,
};

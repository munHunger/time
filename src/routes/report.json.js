import mongo from "../service/mongo";

let user = "munhunger";

export async function post(request, context) {
  console.log(request.body);
  await (await mongo.collection("log")).updateOne(
    { user, type: request.body.type },
    { $push: { entry: request.body } },
    { upsert: true }
  );
  return {
    status: 200,
    body: "OK",
  };
}

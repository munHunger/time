import mongo from "../service/mongo";

let user = "munhunger";

export async function get(request, context) {
  console.log("fetching log list");

  let list = (await (await mongo.collection("log")).find({ user }).toArray());

  console.log(list);
  return {
    status: 200,
    body: JSON.stringify(list),
  };
}
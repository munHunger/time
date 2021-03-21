import mongo from "../service/mongo";

let user = "munhunger";

export async function get(request, context) {
  console.log("fetching entry list");

  let list = await (await mongo.collection("entries")).findOne({ user });

  console.log(list);
  if (!list) {
    console.log("entry list not found creating one");
    (await mongo.collection("entries")).insertOne({ user, items: [] });
    console.log("entry list created, returning empty list");
    return {
      status: 200,
      body: "[]",
    };
  }
  console.log("entry list found returning");
  console.log(list);
  return {
    status: 200,
    body: JSON.stringify(list.items.filter((v) => v)),
  };
}

export async function post(request, context) {
  console.log("post");
  console.log(request.body);
  (await mongo.collection("entries")).updateOne(
    { user },
    { $push: { items: request.body.tag } }
  );
  return {
    status: 200,
    body: "OK",
  };
}

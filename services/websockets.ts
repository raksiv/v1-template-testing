// Import necessary modules
import { schedule, websocket, kv } from "@nitric/sdk";

const connections = kv("connections").for("getting", "setting", "deleting");
const socket = websocket("example-websocket");

socket.on("connect", async (ctx) => {
  console.log(`connecting: ${ctx.req.connectionId}`);

  // getting existing connections
  const connectionList = await connections.get("connections");

  // add a connection
  await connections.set("connections", [
    connectionList,
    {
      // Can add additional metadata here later if we need to
      connectionId: ctx.req.connectionId,
    },
  ]);
});

socket.on("disconnect", async (ctx) => {
  console.log(`disconnecting: ${ctx.req.connectionId}`);

  // get existing connections
  const connectionList = await connections.get("connections");

  // remove specific connection by filtering it out
  await connections.set(
    "connections",
    connectionList.filter((c) => c.connectionId === ctx.req.connectionId)
  );
});

socket.on("message", async (ctx) => {
  const message = ctx.req.text();

  // broadcast our message to all other clients
  const connectionList = await connections.get("connections");

  await Promise.all(
    connectionList.map(async (c) => {
      // send message to everyone but message sender
      if (c.connectionId !== ctx.req.connectionId) {
        await socket.send(c.connectionId, message);
      }
    })
  );
});

// Schedule a task that runs every 2 hours
schedule("pizzaTimeNotification").every("2 hours", async (ctx) => {
  // Retrieve all user connections from the collection
  const connectionList = await connections.get("connections");

  const pizzaTimeMessage = { type: "notification", text: "It's pizza time!" };
  connectionList.on("data", async (connection) => {
    await socket.send(connection.id, pizzaTimeMessage);
  });
});

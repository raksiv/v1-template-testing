import { schedule } from "@nitric/sdk";
import { bookCreateTopic, bookRemovedTopic } from "../resources/resources";

// Run every day
schedule("inventory-report").every("24 hours", async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

bookCreateTopic.subscribe(async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

bookRemovedTopic.subscribe(async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

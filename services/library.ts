import { schedule } from "@nitric/sdk";
import { bookCreateTopic, bookRemovedTopic } from "../resources/resources";

// Run every day
schedule("inventory-report-daily").every("24 hours", async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

// Run at 22:00 Monday through Friday.
schedule("inventory-report-nightly").cron("0 22 * * 1-5", async (ctx) => {
  console.log(`reminder at ${new Date().toLocaleString()}`);
});

bookCreateTopic.subscribe(async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

bookRemovedTopic.subscribe(async (ctx) => {
  console.log(`processing at ${new Date().toLocaleString()}`);
});

import { v4 as uuid } from "uuid";
import {
  bookApi,
  booksKV,
  bookCreateTopic,
  bookRemovedTopic,
} from "../resources/resources";

const bookCreatePublish = bookCreateTopic.for("publishing");
const bookRemovedPublish = bookRemovedTopic.for("publishing");
const books = booksKV.for("getting", "setting");

bookApi.post("/books", async (ctx) => {
  let id = uuid();
  const { title, author } = ctx.req.json();

  console.log(ctx.req.json());

  // Store the new book in the books collection
  await books.set(id, {
    title,
    author,
  });

  // Set a JSON HTTP response
  ctx.res.json({
    msg: `book with id ${id} created.`,
  });

  await bookCreatePublish.publish({
    details: `${title} ${author}`,
  });
});

bookApi.get("/books/:id", async (ctx) => {
  const { id } = ctx.req.params;

  try {
    // Retrieve and return the book data
    const book = await books.get(id);
    return ctx.res.json(book);
  } catch (error) {
    // log errors and return a Not Found status.
    console.error(error);
    ctx.res.status = 404;
    ctx.res.json({
      msg: `book with id ${id} not found.`,
    });
  }
});

bookApi.delete("/books/:id", async (ctx) => {
  const { id } = ctx.req.params;

  // Delete the book
  try {
    books.delete(id);
  } catch (error) {
    ctx.res.status = 404;
    ctx.res.json({
      msg: `book with id ${id} not found.`,
    });
  }
  await bookRemovedPublish.publish({
    details: `${id}`,
  });
});

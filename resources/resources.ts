import { api, kv, bucket, topic } from "@nitric/sdk";

export const bookApi = api("book-store");
export const booksKV = kv("books");
export const bookCreateTopic = topic("book-created");
export const bookRemovedTopic = topic("book-removed");
export const bookCoverImgs = bucket("book-covers");

import { bookApi, bookCoverImgs } from "../resources/resources";

const bookCovers = bookCoverImgs.for("deleting", "writing", "reading");

bookApi.get("/books/:id/image/download", async (ctx) => {
  const id = ctx.req.params["id"];

  // Return a signed download URL, which provides temporary access to download a file.
  const photoUrl = await bookCovers
    .file(`images/${id}/cover.png`)
    .getDownloadUrl();
  ctx.res.json({
    url: photoUrl,
  });
});

bookApi.get("/books/:id/image/upload", async (ctx) => {
  const id = ctx.req.params["id"];

  // Return a signed upload URL, which provides temporary access to upload a file.
  const photoUrl = await bookCovers
    .file(`images/${id}/cover.png`)
    .getUploadUrl();
  ctx.res.json({
    url: photoUrl,
  });
});

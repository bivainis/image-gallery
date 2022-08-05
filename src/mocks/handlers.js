import { rest } from "msw";
import galleryData from "./gallery-data";
import { v4 as uuidv4 } from "uuid";

const getGalleryData = (req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      data: galleryData.map((item) => {
        return {
          ...item,
          key: uuidv4(),
        };
      }),
    })
  );
};

export const handlers = [rest.get("/api/gallery", getGalleryData)];

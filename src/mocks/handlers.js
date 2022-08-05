import { rest } from "msw";
import galleryData from "./gallery-data";
import { v4 as uuidv4 } from "uuid";

const getGalleryData = (req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      data: galleryData.map((item) => {
        // Image paths are using html entity ampersand instead of correct one.
        const fixedPath = item.imagePath.replace(/&amp;/gi, "&");

        return {
          ...item,
          imagePath: fixedPath,
          key: uuidv4(),
        };
      }),
    })
  );
};

export const handlers = [rest.get("/api/gallery", getGalleryData)];

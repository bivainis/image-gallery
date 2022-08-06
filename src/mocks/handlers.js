import { rest } from "msw";
import galleryData from "./gallery-data";
import { v4 as uuidv4 } from "uuid";
import { PAGINATION_PAGE_SIZE } from "ts/constants";

const getGalleryData = (req, res, ctx) => {
  const page = parseInt(req.url.searchParams.get("page"), 10) || 1;
  const pageSize =
    parseInt(req.url.searchParams.get("pageSize")) || PAGINATION_PAGE_SIZE;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = galleryData.slice(startIndex, endIndex);

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      data: paginated.map((item) => ({
        ...item,
        key: uuidv4(),
      })),
    })
  );
};

export const handlers = [rest.get("/api/gallery", getGalleryData)];

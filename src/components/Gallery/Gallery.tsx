import { PAGINATION_PAGE_SIZE } from "ts/constants";
import { Image } from "ts/interfaces";

import classes from "./Gallery.module.scss";

interface GalleryProps {
  data: Image[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const Gallery = ({ data, page, setPage, isLoading }: GalleryProps) => {
  const handlePageChange = (val: number) => {
    setPage((previousPage) => {
      return previousPage + val;
    });
  };

  return (
    <div>
      <button onClick={() => handlePageChange(-1)} disabled={page === 1}>
        prev
      </button>
      <span>{page}</span>
      <button
        onClick={() => handlePageChange(1)}
        disabled={data.length < PAGINATION_PAGE_SIZE}
      >
        next
      </button>

      {isLoading ? (
        <p>Loading, please wait...</p>
      ) : (
        <ul className={classes.Gallery}>
          {data.map((item) => {
            return (
              <li className={classes.GalleryItem} key={item.key}>
                <img
                  className={classes.GalleryImage}
                  src={item.imagePath}
                  alt={item.title}
                />

                <div className={classes.GalleryItemDescription}>
                  {item.description}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Gallery;

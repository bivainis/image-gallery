import { PAGINATION_PAGE_SIZE } from "ts/constants";
import { Image } from "ts/interfaces";
import { ReactComponent as PreviousIcon } from "assets/icons/previous.svg";
import { ReactComponent as NextIcon } from "assets/icons/next.svg";
import classes from "./Gallery.module.scss";
import { Button } from "components/Button";
import { Loading } from "components/Loading";

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
      <div className={classes.GalleryControls}>
        <Button
          onClick={() => handlePageChange(-1)}
          isDisabled={page === 1}
          label="Previous page"
        >
          <PreviousIcon />
        </Button>
        <Button
          onClick={() => handlePageChange(1)}
          isDisabled={data.length < PAGINATION_PAGE_SIZE}
          label="Next page"
        >
          <NextIcon />
        </Button>
      </div>

      {isLoading ? (
        <Loading />
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

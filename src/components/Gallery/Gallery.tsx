import { PAGINATION_PAGE_SIZE } from "ts/constants";
import { Image } from "ts/interfaces";
import { ReactComponent as PreviousIcon } from "assets/icons/previous.svg";
import { ReactComponent as NextIcon } from "assets/icons/next.svg";
import classes from "./Gallery.module.scss";
import { Button } from "components/Button";
import { Loading } from "components/Loading";
import { EmptyState } from "components/EmptyState";
import { GalleryList } from "./GalleryList";
import { GalleryItem } from "./GalleryList/GalleryItem";

interface GalleryProps {
  data: Image[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const Gallery = ({ data, page, setPage, isLoading }: GalleryProps) => {
  /**
   * Incrementes or decrements current page.
   * @param val - positive or negative number of how many pages to jump
   */
  const handlePageChange = (val: number) => {
    setPage((previousPage) => previousPage + val);
  };

  return (
    <>
      <div className={classes.GalleryControls}>
        <Button
          className={classes.GalleryControlsButton}
          onClick={() => handlePageChange(-1)}
          isDisabled={isLoading || page === 1}
          label="Previous page"
        >
          <PreviousIcon />
        </Button>
        <Button
          className={classes.GalleryControlsButton}
          onClick={() => handlePageChange(1)}
          isDisabled={isLoading || data.length < PAGINATION_PAGE_SIZE}
          label="Next page"
        >
          <NextIcon />
        </Button>
      </div>

      {!isLoading && data.length === 0 && (
        <EmptyState>There are no results matching your search</EmptyState>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <GalleryList>
          {data.map(({ ...props }) => (
            <GalleryItem {...props}></GalleryItem>
          ))}
        </GalleryList>
      )}
    </>
  );
};

export default Gallery;

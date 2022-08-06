import { Image } from "ts/interfaces";

import classes from "./Gallery.module.scss";

interface GalleryProps {
  data: Image[];
  searchQuery: string;
}

const Gallery = ({ data, searchQuery }: GalleryProps) => {
  const searchFilter = (item: Image) => {
    // test if string has search query, case insensitive
    const regexp = new RegExp(searchQuery, "i");
    const { title, description } = item;

    const variant1 = regexp.test(title);
    const variant2 = regexp.test(description);

    return variant1 || variant2;
  };

  return (
    <ul className={classes.Gallery}>
      {data.filter(searchFilter).map((item) => {
        return (
          <li className={classes.GalleryItem} key={item.key}>
            <img
              className={classes.GalleryImage}
              src="https://placehold.co/300x200"
              alt={item.title}
            />

            <div className={classes.GalleryItemDescription}>
              {item.description}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Gallery;

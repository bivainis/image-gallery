import classes from "./GalleryItem.module.scss";
interface GalleryItemProps {
  imagePath: string;
  title: string;
  description: string;
}
const GalleryItem = ({ imagePath, title, description }: GalleryItemProps) => (
  <li className={classes.GalleryItem}>
    <img className={classes.GalleryItemImage} src={imagePath} alt={title} />

    <div className={classes.GalleryItemDescription}>{description}</div>
  </li>
);

export default GalleryItem;

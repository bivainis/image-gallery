import { ReactNode } from "react";
import classes from "./GalleryList.module.scss";
interface GalleryListProps {
  children: ReactNode;
}
const GalleryList = ({ children }: GalleryListProps) => {
  return <ul className={classes.GalleryList}>{children}</ul>;
};

export default GalleryList;

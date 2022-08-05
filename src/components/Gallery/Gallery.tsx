import { Image } from "ts/interfaces";

interface GalleryProps {
  data: Image[];
}

const Gallery = ({ data }: GalleryProps) => {
  return <div>Gallery component</div>;
};

export default Gallery;

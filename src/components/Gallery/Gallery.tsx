import { Image } from "ts/interfaces";

interface GalleryProps {
  data: Image[];
}

const Gallery = ({ data }: GalleryProps) => {
  return (
    <ul>
      {data.map((item) => {
        return <li key={item.key}>{item.title}</li>;
      })}
    </ul>
  );
};

export default Gallery;

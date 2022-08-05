import { Image } from "ts/interfaces";

interface GalleryProps {
  data: Image[];
}

const Gallery = ({ data }: GalleryProps) => {
  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.key}>
            <img src={item.imagePath} alt={item.title} />
          </li>
        );
      })}
    </ul>
  );
};

export default Gallery;

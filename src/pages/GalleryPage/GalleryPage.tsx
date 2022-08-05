import { Gallery } from "components/Gallery";
import { Image } from "ts/interfaces";

const data: Image[] = [];

const GalleryPage = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <Gallery data={data} />
    </div>
  );
};

export default GalleryPage;

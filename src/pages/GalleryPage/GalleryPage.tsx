import { Gallery } from "components/Gallery";
import useFetchData from "hooks/useFetchData";
import { API_URL_PATH } from "ts/constants";

const GalleryPage = () => {
  const { data, loading, error } = useFetchData({ endpoint: API_URL_PATH });

  if (loading) {
    return "Loading, please wait...";
  }

  if (error) {
    return "There was an error loading images, please try again";
  }

  return (
    <div>
      <h1>Gallery</h1>

      <Gallery data={data} />
    </div>
  );
};

export default GalleryPage;

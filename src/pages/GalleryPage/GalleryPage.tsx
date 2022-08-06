import { Gallery } from "components/Gallery";
import { Search } from "components/Search";
import useFetchData from "hooks/useFetchData";
import { useState } from "react";
import { API_URL_PATH } from "ts/constants";

const GalleryPage = () => {
  const { data, loading, error } = useFetchData({ endpoint: API_URL_PATH });
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>There was an error loading images, please try again</p>;
  }

  return (
    <div>
      <h1>Gallery</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Gallery data={data} searchQuery={searchQuery} />
    </div>
  );
};

export default GalleryPage;

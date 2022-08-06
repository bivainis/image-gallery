import { Gallery } from "components/Gallery";
import { Search } from "components/Search";
import useFetchData from "hooks/useFetchData";
import { useState } from "react";
import { API_URL_PATH } from "ts/constants";

const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetchData({
    endpoint: API_URL_PATH,
    params: { page },
  });
  const [searchQuery, setSearchQuery] = useState("");

  if (error) {
    return <p>There was an error loading images, please try again</p>;
  }

  return (
    <div>
      <h1>Gallery</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Gallery
        isLoading={loading}
        data={data}
        searchQuery={searchQuery}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default GalleryPage;

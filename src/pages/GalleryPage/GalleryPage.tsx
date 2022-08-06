import queryString from "query-string";

import { Gallery } from "components/Gallery";
import { Search } from "components/Search";
import useFetchData from "hooks/useFetchData";
import { useEffect, useState } from "react";
import { API_URL_PATH } from "ts/constants";

const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetchData({
    endpoint: API_URL_PATH + "?" + queryString.stringify({ page, searchQuery }),
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (error) {
    return <p>There was an error loading images, please try again</p>;
  }

  return (
    <>
      <Search onSearch={setSearchQuery} />

      <Gallery isLoading={loading} data={data} page={page} setPage={setPage} />
    </>
  );
};

export default GalleryPage;

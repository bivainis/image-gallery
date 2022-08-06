import { useState } from "react";

import classes from "./Search.module.scss";

interface SearchProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const searchInputValue = target.search.value;

    onSearch(searchInputValue);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form className={classes.Search} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search images"
        value={searchQuery}
        onChange={handleOnInputChange}
      />
      <button type="button" onClick={handleClearSearch}>
        Clear
      </button>
      <button>Search</button>
    </form>
  );
};

export default Search;

import { Button } from "components/Button";
import { useState } from "react";
import { ReactComponent as ClearIcon } from "assets/icons/backspace.svg";

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
      <div className={classes.SearchInner}>
        <input
          className={classes.SearchInput}
          type="text"
          name="search"
          placeholder="Search images"
          value={searchQuery}
          onChange={handleOnInputChange}
        />
        <Button
          className={classes.SearchClearButton}
          type="button"
          onClick={handleClearSearch}
        >
          <ClearIcon fill="black" />
        </Button>
      </div>
    </form>
  );
};

export default Search;

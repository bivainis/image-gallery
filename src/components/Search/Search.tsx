interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search images"
        value={searchQuery}
        onChange={handleOnInputChange}
      />
    </div>
  );
};

export default Search;

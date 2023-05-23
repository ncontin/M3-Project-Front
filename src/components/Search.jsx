// Iteration 5
function Search({ searchText, setSearchText }) {
  return (
    <>
      <label>Search</label>
      <input
        value={searchText}
        type="text"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </>
  );
}

export default Search;

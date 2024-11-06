import "./FilterBar.css";

const FilterBar = ({ filters, onFilterChange }) => {
  // const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    console.log("Selected Filters:", filters);
    onFilterChange({ ...filters, category: e.target.value });
  };

  return (
    <div className="filter-bar">
      <select
        value={filters.category}
        onChange={(e) => {
          // setCategory(e.target.value);
          handleCategoryChange(e);
        }}
      >
        <option value="">All Categories</option>
        <option value="Chair">Chairs</option>
        <option value="Table">Tables</option>
        <option value="Bookshelf">Bookshelves</option>
        <option value="Wardrobe">Wardrobes</option>
        <option value="Bed">Beds</option>
        <option value="Sofa">Sofas</option>
      </select>
    </div>
  );
};

export default FilterBar;

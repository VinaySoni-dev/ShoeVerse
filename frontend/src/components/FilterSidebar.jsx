import React from "react";
import "../styles/Filterbar.css";

const FilterSidebar = ({
  category,
  setCategory,
  brand,
  setBrand,
}) => {
  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>

      {/* Categories */}
      <div className="filter-section">
        <h4>Categories</h4>

        <label>
          <input
            type="radio"
            name="category"
            value="All"
            checked={category === "All"}
            onChange={(e) => setCategory(e.target.value)}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Sneakers"
            checked={category === "Sneakers"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Sneakers
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Casual"
            checked={category === "Casual"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Casual
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Formal"
            checked={category === "Formal"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Formal
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Limited Edition"
            checked={category === "Limited Edition"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Limited Edition
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Sale"
            checked={category === "Sale"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Sale
        </label>
      </div>

      {/* Brands */}
      <div className="filter-section">
        <h4>Brands</h4>

        <label>
          <input
            type="radio"
            name="brand"
            value="All"
            checked={brand === "All"}
            onChange={(e) => setBrand(e.target.value)}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Nike"
            checked={brand === "Nike"}
            onChange={(e) => setBrand(e.target.value)}
          />
          Nike
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Adidas"
            checked={brand === "Adidas"}
            onChange={(e) => setBrand(e.target.value)}
          />
          Adidas
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Puma"
            checked={brand === "Puma"}
            onChange={(e) => setBrand(e.target.value)}
          />
          Puma
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Jordan"
            checked={brand === "Jordan"}
            onChange={(e) => setBrand(e.target.value)}
          />
          Jordan
        </label>
      </div>

      <button
        className="clear-btn"
        onClick={() => {
          setCategory("All");
          setBrand("All");
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
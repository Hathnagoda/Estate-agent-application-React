import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAdded: '',
    postcode: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value
    }));
  };

  // Handle form submission (search)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  // Reset the form fields to their initial state
  const handleReset = () => {
    setCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAdded: '',
      postcode: ''
    });
    // Reset the search criteria in the parent component
    onSearch({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAdded: '',
      postcode: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <select name="type" value={criteria.type} onChange={handleChange}>
        <option value="any">Any Type</option>
        <option value="house">House</option>
        <option value="flat">Flat</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={criteria.minPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={criteria.maxPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="minBedrooms"
        placeholder="Min Bedrooms"
        value={criteria.minBedrooms}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxBedrooms"
        placeholder="Max Bedrooms"
        value={criteria.maxBedrooms}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dateAdded"
        value={criteria.dateAdded}
        onChange={handleChange}
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode"
        value={criteria.postcode}
        onChange={handleChange}
      />
      <div className="button-container">
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
};

export default SearchForm;

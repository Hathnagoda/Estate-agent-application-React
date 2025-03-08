import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import propertiesData from './data/properties.json';

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]);
  const [propertyType, setPropertyType] = useState('any');

  // Function to handle the search
  const handleSearch = (criteria) => {
    const results = propertiesData.filter((property) => {
      return (
        (propertyType === 'any' || property.status === propertyType) && // Updated to match "status" (sale/rent)
        (criteria.type === 'any' || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= parseInt(criteria.minPrice)) &&
        (!criteria.maxPrice || property.price <= parseInt(criteria.maxPrice)) &&
        (!criteria.minBedrooms || property.bedrooms >= parseInt(criteria.minBedrooms)) &&
        (!criteria.maxBedrooms || property.bedrooms <= parseInt(criteria.maxBedrooms)) &&
        (!criteria.dateAdded || new Date(property.dateAdded) >= new Date(criteria.dateAdded)) &&
        (!criteria.postcode || property.postcode.startsWith(criteria.postcode))
      );
    });
    setFilteredProperties(results);
  };

  // Function to toggle favorite property
  const handleFavorite = (property) => {
    const isFavorite = favorites.some((fav) => fav.id === property.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  // Function to change the property type filter (Rent or Sale)
  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    // Filter properties based on type selection
    const results = propertiesData.filter(
      (property) => property.status === type || type === 'any'
    );
    setFilteredProperties(results);
  };

  return (
    <div className="app-container">
      <h1>Estate Agent </h1>

      {/* Buttons for Rent and Sale */}
      <div className="property-type-buttons">
        <button
          onClick={() => handlePropertyTypeChange('sell')}
          className={propertyType === 'sell' ? 'active' : ''}
        >
          For Sale
        </button>
        <button
          onClick={() => handlePropertyTypeChange('rent')}
          className={propertyType === 'rent' ? 'active' : ''}
        >
          For Rent
        </button>
        <button
          onClick={() => handlePropertyTypeChange('any')}
          className={propertyType === 'any' ? 'active' : ''}
        >
          All
        </button>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      <div className="property-list-wrapper">
        <h2>Properties</h2>
        {filteredProperties.length === 0 ? (
          <p>No properties found matching your criteria.</p>
        ) : (
          <PropertyList
            properties={filteredProperties}
            onFavorite={handleFavorite}
            isFavoriteList={false}
          />
        )}
      </div>

      {/* Fixed Position Favorites Section */}
      <div className="favorites-container">
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <PropertyList
            properties={favorites}
            onFavorite={handleFavorite}
            isFavoriteList={true}
          />
        )}
      </div>
    </div>
  );
};

export default App;

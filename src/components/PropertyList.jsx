import React, { useState } from 'react';

const PropertyList = ({ properties, onFavorite, isFavoriteList = false }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Open Modal for Property Details
  const openModal = (property) => {
    setSelectedProperty(property);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedProperty(null);
  };

  // Check if there are properties available
  if (properties.length === 0) {
    return (
      <p>{isFavoriteList ? 'No favorite properties yet.' : 'No properties match your criteria.'}</p>
    );
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img
            src={`/images/${property.image}`} // Ensure this path matches your image folder structure
            alt={property.description}
            className="property-image"
          />
          <h3>{property.description}</h3>
          <p>Price: Rs{property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Postcode: {property.postcode}</p>

          {/* View Property Button */}
          <button onClick={() => openModal(property)}>View Property</button>

          {/* Favorite Button */}
          <button onClick={() => onFavorite(property)}>
            {isFavoriteList ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}

      {/* Modal for Property Details */}
      {selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              ×
            </span>

            {/* Property Title and Basic Info */}
            <h2>{selectedProperty.description}</h2>
            <p>Price: Rs{selectedProperty.price}</p>
            <p>Bedrooms: {selectedProperty.bedrooms}</p>
            <p>Postcode: {selectedProperty.postcode}</p>

            {/* Detailed Description */}
            <div className="property-description">
              <h3>Property Details</h3>
              <p>
                {selectedProperty.longDescription ||
                  'This property features modern amenities and a spacious design, perfect for families or professionals looking for a comfortable living space.'}
              </p>
            </div>

            {/* Scrollable Photos Section */}
            <div className="property-photos">
              <h3>Photos</h3>
              {selectedProperty.photos &&
              Array.isArray(selectedProperty.photos) &&
              selectedProperty.photos.length > 0 ? (
                <div className="photo-scroll">
                  {selectedProperty.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`/images/${photo}`} // Ensure this path matches your image folder structure
                      alt={`${selectedProperty.description} photo ${index + 1}`}
                      className="modal-photo"
                    />
                  ))}
                </div>
              ) : (
                <p>No photos available for this property.</p>
              )}
            </div>

            {/* Map Section */}
            <div className="property-map">
              <h3>Location on Map</h3>
              <iframe
                src={`https://maps.google.com/maps?q=${selectedProperty.postcode}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                title={`Map of ${selectedProperty.description}`}
                allowFullScreen
                width="100%"
                height="300"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

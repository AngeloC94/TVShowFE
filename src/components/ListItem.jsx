import React from 'react';

const ListItem = ({name, genres, country, network, language, status, rating }) => {
  return (
    <div style={{display: 'flex'}} >
        <h2>{name}</h2>
      <div className="userWatchListRow">
      
        <div className="info-item">
          <h4>Genres:</h4>
          <p>{genres}</p>
        </div>
        <div className="info-item">
          <h4>Country:</h4>
          <p>{country}</p>
        </div>
        <div className="info-item">
          <h4>Network:</h4>
          <p>{network}</p>
        </div>
      </div>
      <div className="userWatchListRow">
        <div className="info-item">
          <h4>Language:</h4>
          <p>{language}</p>
        </div>
        <div className="info-item">
          <h4>Status:</h4>
          <p>{status}</p>
        </div>
        <div className="info-item">
          <h4>Rating:</h4>
          <p>{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

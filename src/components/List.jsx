import React from 'react';
import ListItem from './ListItem';

const List = ({ items }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li className="list-item" key={index}>
          <ListItem
          name={item.name}
            genres={item.genres}
            country={item.country}
            network={item.network}
            language={item.language}
            status={item.status}
            rating={item.rating}
          />
        </li>
      ))}
    </ul>
  );
};

{/* <List
key={index}
items={[
  {
   name: item.name,
    genres: item.genres,
    country: item.network?.country.name,
    network: item.network.name,
    language: item.language,
    status: item.status,
    rating: item.rating.average,
  },
]}
/> */}

export default List;

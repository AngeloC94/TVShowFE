import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchNext } from "../reducers/watchListReducer";
import { addToNotStartedYet } from "../reducers/watchListReducer";

export default function CardSearchResult(props) {
  const dispatch = useDispatch();
  const notStartedYet = useSelector((state) => state.watchList.notStartedYet) || [];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleAdd = (show) => {
    const showExists = notStartedYet.some((item) => item.id === show.id);

    if (showExists) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      dispatch(addToNotStartedYet(show));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
    console.log('Show exists:', showExists);
    console.log('Show to add:', show);
    console.log('Not started yet:', notStartedYet);
    

  };

  return (
    <div className={`${props.className} cardSearchResultContainer`}>
      <div className="cardContainer">
        {success && (
          <div className="success-message">Show added to your watchlist!</div>
        )}
        {error && (
          <div className="error-message">
            Show already exists in your watchlist!
          </div>
        )}
        <div onClick={() => handleAdd(props.show)} className="iconContainer">
          <AiOutlinePlus className="addShowSearchResult plus" size={20} />
        </div>
        <img
          onClick={props.onClick}
          className="cardSearchResultImg"
          src={props.img}
          alt={props.title}
        />
        <h4 className="cardSearchResultTitle">{props.title} </h4>
        <p className="cardSearchResultDescription"> {props.year} </p>
      </div>
    </div>
  );
}

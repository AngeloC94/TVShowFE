import { useEffect, useState } from "react";
import { AiOutlineCheckSquare, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeShow, addToWatchNext, addToAlreadyWatched } from "../reducers/watchListReducer";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function UserCardEpisode({
  name,
  image,
  deleteShow,
  id,
  BtnDeleteShow,
  ShowDetail,
  season,
  number,
  episode,
}) {
  const dispatch = useDispatch();
  const watchNext = useSelector((state) => state.watchList.watchNext || []);
  const alreadyWatched = useSelector((state) => state.watchList.alreadyWatched || []);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleRemoveShow = (showId) => {
    dispatch(removeShow(showId));
  };

  const handleAddEpisode = () => {
    if (!episode) {
      return;
    }
  
    const episodeExists = alreadyWatched.some((alreadyWatchedItem) => {
      console.log("episode id:", episode.id);
      return alreadyWatchedItem.id === episode.id;
    });
  
    if (episodeExists) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      dispatch(addToAlreadyWatched(episode)); // Pass the selected episode object as the payload
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
    console.log("Episode exists:", episodeExists);
    console.log("Episode:", episode);
    console.log("Episode to add:", episode.id);
    console.log("Season:", episode.season);
    console.log("Already watched:", alreadyWatched);
  };

  return (
    <div className="episodeItem">
     
      <div onClick={ShowDetail} className="episodeItemImg">
      {success && (
        <div className="success-message-episode">Show added to your watchlist!</div>
      )}
      {error && (
        <div className="error-message-episode">
          Show already exists in your watchlist!
        </div>
      )}
        <img src={image} />
      </div>
      <div className="episodeItemInfo">
        <div style={{ display: "flex" }}>
          <h4>S{season}</h4>
          <p>E{number}</p>
        </div>
        <div>
          <RiDeleteBin6Line
            onClick={() => handleRemoveShow(id)}
            className="removeIcon"
            size={20}
          />
          <AiOutlineCheck
            onClick={() => handleAddEpisode(id)}
            className="checkedIcon"
            size={20}
          />
        </div>
      </div>
      <div className="episodeItemTitle">
        <h5>{name}</h5>
      </div>
    </div>
  );
}

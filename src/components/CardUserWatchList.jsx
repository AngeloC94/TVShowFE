import { useEffect, useState } from "react";
import { AiOutlineCheckSquare, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeShow } from "../reducers/watchListReducer";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CardUserWatchList({
  name,
  image,
  deleteShow,
  id,
  BtnDeleteShow,
  ShowDetail,
  handleAddEpisode,
  episodes,
}) {
  const dispatch = useDispatch();

  const handleRemoveShow = (showId) => {
    dispatch(removeShow(showId));
  };
 

  const findNextEpisode = () => {
    if (!episodes) {
      return null;
    }

    const unwatchedEpisode = episodes.find((episode) => !episode.watched);

    if (!unwatchedEpisode) {
      return null;
    }

    return unwatchedEpisode;
  };

  const [nextEpisode, setNextEpisode] = useState(null);

  useEffect(() => {
    setNextEpisode(findNextEpisode());
  }, [episodes]);

  return (
    <div className="episodeItem">
      <div onClick={ShowDetail} className="episodeItemImg">
        <img src={image} />
      </div>
      <div className="episodeItemInfo">
        <div style={{ display: "flex" }}>
          <h4>S{nextEpisode ? nextEpisode.season : "N/A"}</h4>
          <p>E{nextEpisode ? nextEpisode.number : "N/A"}</p>
        </div>
        <div>
          <RiDeleteBin6Line
            onClick={() => handleRemoveShow(id)}
            className="removeIcon"
            size={20}
          />
           <AiOutlineCheck
           onClick={handleAddEpisode}
           className="checkedIcon"
           size={20}
         />
          {/* {BtnDeleteShow === true ? (
           <AiOutlineCheck
           onClick={handleAddEpisode}
           className="checkedIcon"
           size={20}
         />
          ) : (
            <></>
          )} */}
        </div>
      </div>
      <div className="episodeItemTitle"><h5>{name}</h5></div>
    </div>
  );
}
{
  /* <div className="userWatchListRight">
        <h2>{props.name}</h2>
        <div className="userWatchListRow">
          <div className="info-item">
            <h4>Genres:</h4>
            <p>{props.genres}</p>
          </div>
          <div className="info-item">
            <h4>Country:</h4>
            <p>{props.country}</p>
          </div>
          <div className="info-item">
            <h4>Network:</h4>
            <p>{props.network}</p>
          </div>
        </div>
        <div className="info-item">
            <h4>Language:</h4>
            <p>{props.language}</p>
          </div>
          <div className="info-item">
            <h4>Status:</h4>
            <p>{props.status}</p>
          </div>
          <div className="info-item">
            <h4>Rating:</h4>
            <p>{props.rating}</p>
          </div>
        <div className="userWatchListRow">
        
        </div>
        <div className="buttonContainer">
          <div className="checkIconContainer">
            <AiOutlineCheckSquare className="checkIcon" size={25} />
          </div>
          <div
            className="remove-show-button"
            onClick={() => handleRemoveShow(props.id)}
          >
            <RiDeleteBin6Line className="removeIcon" size={25} />
          </div>
        </div> */
}

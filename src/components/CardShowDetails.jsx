import { AiOutlinePlus } from "react-icons/ai";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToWatchNext, addToNotStartedYet, addToNotWatchedForAWhile } from "../reducers/watchListReducer";
export default function CardShowDetails(props) {
  const dispatch = useDispatch()
  const castData = props.castData;

  const handleAdd = (show) => {
    dispatch(addToNotStartedYet(show))
  }

  return (
    <>
      {props.switchTab ? (
        <div className="cardShowDetailContainer">
          <div className="cardShowDetailTitle">
            <h2>{props.name}</h2>
          </div>
          <div className="cardShowDetailWrapper">
            <div className="cardShowDetailHeader ">
              <img
                onClick={props.onClick}
                width={"300px"}
                className="cardShowDetailImg"
                src={props.img}
              />
            </div>
            <div className="cardShowDetailContent">
              <div style={{ display: "flex", gap: "10%" }}>
                <div className="firstColumnCardShowDetailContent">
                  <h4 style={{ textAlign: "center" }}>Info</h4>
                  <p>Genre: {props.genre} </p>
                  <p>Language: {props.language} </p>
                  <p>Country: {props.country} </p>
                  <p>Episode: {props.number} </p>
                  <div>Average Rating: {props.rating}</div>
                </div>
                <div className="secondColumnCardShowDetailContent">
                  <h4 style={{ textAlign: "center" }}>Cast</h4>
                  {castData.map((actor, index) => (
                    <div className="castFlex" key={index}>
                      <p style={{ fontWeight: "bold" }}>
                        {actor.character.name}:
                      </p>
                      <p>{actor.person.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="averageScore">
                
              </div> */}
              <div onClick={() => handleAdd(props.show)} className="addShow">
                Add Show
                <AiOutlinePlus className="plus" size={20} />
                {/* <p style={{ fontSize: "14px" }}>Add show</p> */}
              </div>
            </div>
          </div>
          <div>
            <RiArrowLeftSLine
              style={{ cursor: "pointer" }}
              onClick={props.handleBackShow}
              size={50}
              className="arrowCardShowDetail"
            />

            <RiArrowRightSLine
              style={{ cursor: "pointer" }}
              onClick={props.handleNextShow}
              size={50}
              className="arrowCardShowDetail"
            />
          </div>
        </div>
      ) : (
        <div className="episodeCard">
          <div className="cardShowDetailWrapper">
            <div className="cardShowDetailHeader ">
              <img
                onClick={props.onClick}
                width={"300px"}
                className="cardShowDetailImg"
                src={props.img}
              />
            </div>
            <div className="episodeInfo">
              <div className="seasonEpisodeContainer">
                <p>S{props.season}</p>
                <p>E{props.number}</p>
              </div>
              <div>
                <p>{props.episodeName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

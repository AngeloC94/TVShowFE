export default function CardShowDetails(props) {
  return (
    <div>
      <div className="cardEpisodeContainer">
        <div className="cardEpisodeHeader ">
          <div className="blackOverlayCard"></div>

          <h3 className="cardEpisodeTitle">{props.title} </h3>
          <img width={"350px"} className="cardEpisodeImg" src={props.img} />
        </div>

        <div className="cardEpisodesContent">
          <p dangerouslySetInnerHTML={props.description}></p>
          <div className="cardEpisodeDate">
            <p>{props.airdate} </p>
            <p>{props.airtime} </p>
          </div>
          <div className="cardEpisodeDate">
            <p>Season: {props.season} </p>
            <p>Episode: {props.number} </p>
          </div>
        </div>
        <div className="averageScore">Average Rating: {props.rating} </div>
      </div>
    </div>
  );
}

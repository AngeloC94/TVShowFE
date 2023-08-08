import { useNavigate, useParams } from "react-router-dom";

export default function CardFilm(props) {
  return (
    <div className="cardHomeContainer">
      <div className="blackOverlayHomeCard"></div>

      <div onClick={props.onClick} className="cardHomeHeader ">
        <h4 className="cardHomeTitle">{props.title} </h4>
        <img className="cardHomeImg" src={props.img} />
        <p> {props.year} </p>
      </div>
    </div>
  );
}

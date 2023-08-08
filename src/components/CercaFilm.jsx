import { AiOutlineSearch } from "react-icons/ai";

export default function CercaFilm(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="searchBarContainer">
        <input
          autoFocus
          type="text"
          value={props.value}
          onChange={props.onChange}
          className="cercaFilm"
        />
        <AiOutlineSearch
          onClick={props.onSubmit}
          className="searchIcon"
          size={30}
        />
      </div>
    </form>
  );
}

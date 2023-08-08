import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardShowDetails from "../components/CardShowDetails";

function SearchResult(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState([]);
    

  const { id } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      const json = await res.json();
      setSearchResults(json);
      // setTitles(searchResults[id].name)
      console.log(searchResults);
    };
    // const fetchTitle = async () => {
    //   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    //   const json = await res.json();
    //   setTitle(json);
    //   // setTitles(Title[id].name)
    //   console.log(title.show.name);
    // };
    // fetchTitle()
    fetchSearchResults();
  }, []);

  return (
    <>
      <div className="showEpisodesWrapper">
        {/* <h2>{title.name} Episodes</h2> */}
        <section className="showEpisodesCardSection">
          {searchResults.map((item, index) => (
            <CardShowDetails
              key={index}
              img={item.image.medium}
              episodeName={item.name}
              season={item.season}
              number={item.number}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default SearchResult;

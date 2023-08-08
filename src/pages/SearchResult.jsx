import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardSearchResult from "../components/CardSearchResult";

function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${id}`);
      const json = await res.json();
      const filteredOnlyImg = json.filter((item) => item.show.image !== null);
      setSearchResults(filteredOnlyImg);

      console.log(json);
    };

    fetchSearchResults();
  }, [id]);

  const handleShowEpisodes = async (id) => {
    const res = await fetch(
      // "http://www.omdbapi.com/?s=Batman&page=2&Season=1&apikey=34ab68e9"
      `https://api.tvmaze.com/shows/${id}`
    );
    const json = await res.json();
    setData(json);
    console.log(json);
    navigate(`/shows/${id}`);
  };


  return (
    <>
      <div className="searchResultWrapper">
        <h2>Search Results for: {id}</h2>
        <section className="searchCardSection">
          {searchResults.map((item, index) => (
            <CardSearchResult
              show={item.show}
              key={index}
              id={item.show.id}
              onClick={() => handleShowEpisodes(item.show.id)}
              img={item.show.image?.medium}
              title={item.show.name}
              description={item.show.summary}
              year={item.Year}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default SearchResult;

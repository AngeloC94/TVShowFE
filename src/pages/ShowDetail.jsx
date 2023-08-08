import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardShowDetails from "../components/CardShowDetails";
import { useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import CardUserWatchList from "../components/CardUserWatchList";
import UserCardEpisode from "../components/UserCardEpisode";
import { addToWatchNext } from "../reducers/watchListReducer";
import { useDispatch } from "react-redux";

export default function ShowDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [BtnDeleteShow, setBtnDeleteShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCast, setSearchResultsCast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [bg, setBg] = useState();
  const { id } = useParams();
  const [switchTab, setSwitchTab] = useState(true);

  useEffect(() => {
    setBtnDeleteShow(true);
  }, []);

  

  function handleEpisodesTab() {
    const fetchEpisodes = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      const json = await res.json();
      const allEpisodes = setAllEpisodes(json);
      const organizedEpisodes = organizeEpisodesBySeason(json);
      setEpisodes(organizedEpisodes);
    };

    const organizeEpisodesBySeason = (episodes) => {
      const seasons = {};

      episodes.forEach((episode) => {
        const season = episode.season;
        if (!seasons[season]) {
          seasons[season] = [];
        }
        seasons[season].push(episode);
      });

      return seasons;
    };

    fetchEpisodes();
    setSwitchTab(false);
  }

  function handleInfoTab() {
    setSwitchTab(true);
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const json = await res.json();
      setSearchResults(json);
      // setTitles(searchResults[id].name)
    };
    const fetchSearchResultsCast = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
      const json = await res.json();
      const slicedJson = json.slice(0, 5);
      setSearchResultsCast(slicedJson);
    };
    const fetchAllImg = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/images`);
      const json = await res.json();
      const bg = json.find(
        (item) => item.type === "poster"
        // && item.resolutions.original.width >= "1200"
      );
      setBg(bg);
    };
    Promise.all([fetchSearchResults(), fetchSearchResultsCast(), fetchAllImg()])
      .then(() => setFetchStatus(true))
      .catch((err) => console.error(err));
  }, [id]);

  function handleBackShow() {
    navigate(`/shows/${id - 1}`);
  }

  function handleNextShow() {
    const nextId = parseInt(id) + 1;
    navigate(`/shows/${nextId}`);
  }
  const handleShowDetail = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const json = res.json();

    navigate(`/shows/${id}`);
  };
  console.log("All Episodes:", allEpisodes);
  // console.log(
  //   "Episodes and Season:",
  //   episodes[2].forEach((obj, index) => {
  //     console.log(`Object ${index}:`, obj.id);
  //   })
  // );

  return (
    <>
      <div className="showDetailWrapper">
        <div className="navShowDetail">
          <ul className="tabBarShowDetail">
            <li onClick={handleInfoTab}>Info</li>
            <li onClick={handleEpisodesTab}>Episodi</li>
          </ul>
        </div>

        <section className="showDetailCardSection">
          {switchTab ? (
            <CardShowDetails
              show={searchResults}
              onClick={handleEpisodesTab}
              key={searchResults.id}
              name={searchResults.name}
              img={searchResults.image?.medium}
              country={searchResults.network?.country?.name}
              language={searchResults.language}
              genre={searchResults.genres}
              castData={searchResultsCast}
              // description={{ __html: searchResults.summary }}
              switchTab={switchTab}
              handleBackShow={handleBackShow}
              handleNextShow={handleNextShow}
            />
          ) : (
            <div className="showEpisodesWrapper">
              <section className="showEpisodesCardSection">
                <div className="episodeCardsContainer">
                  {Object.keys(episodes).map((season) => (
                    <Accordion key={season} title={`Season ${season}`}>
                      {episodes[season].map((item, index) => (
                        <UserCardEpisode
                          key={index}
                          id={item.id}
                          BtnDeleteShow={BtnDeleteShow}
                          season={item.season}
                          number={item.number}
                          onClick={() => handleShowDetail(item.id)}
                          image={item.image?.medium}
                          name={item.name}
                          episode={item}
                          // handleAddEpisode={() => handleAddEpisode(id)}
                        />
                      ))}
                    </Accordion>
                  ))}
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import CardUserWatchList from "../../components/CardUserWatchList";
import UserCardEpisode from "../../components/UserCardEpisode";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function UserWatchList() {
  const alreadyWatchedRef = useRef();
  const watchListSectionRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
  const [watchNextEpisodes, setWatchNextEpisodes] = useState([]);
  const [BtnDeleteShow, setBtnDeleteShow] = useState(false);
  const [showAlreadyWatched, setShowAlreadyWatched] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  const watchNext = useSelector((state) => state.watchList.watchNext);
  const alreadyWatched = useSelector((state) => state.watchList.alreadyWatched);
  const notWatchedForAWhile = useSelector(
    (state) => state.watchList.notWatchedForAWhile
  );
  const notStartedYet = useSelector((state) => state.watchList.notStartedYet);

  const handleShowDetail = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const json = res.json();

    navigate(`/shows/${id}`);
  };

  useEffect(() => {
    setBtnDeleteShow(false);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      const res = await fetch("https://api.tvmaze.com/show");
      const json = await res.json();
      const sortedJson = json.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
console.log(sortedJson)
      setAllData(sortedJson);
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!alreadyWatchedRef.current) return;
  
    const showWatched = () => {
      gsap.to(alreadyWatchedRef.current, {
        opacity: 0.5,
        duration: 1,
      });
      setShowAlreadyWatched(true);
    };
  
    // const hideWatched = () => {
    //   gsap.to(alreadyWatchedRef.current, {
    //     opacity: 0,
    //     duration: 1,
    //   });
    //   setShowAlreadyWatched(false);
    // };
  
    const trigger = ScrollTrigger.create({
      trigger: alreadyWatchedRef.current,
      start: "top top",
      end: "bottom top",
      toggleActions: "play",
      
      onLeaveBack: showWatched,
      
    });
  
    return () => {
      trigger.kill();
    };
  }, []);
  

  useEffect(() => {
    gsap.fromTo(
      watchListSectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);


  
  const getNextEpisodes = (watchedEpisodes) => {
    const lastEpisodes = {};
  
    watchedEpisodes.forEach((episode) => {
      const showId = episode.id;
      const season = episode.season;
      const number = episode.number;
  
      if (!lastEpisodes[showId]) {
        lastEpisodes[showId] = episode;
      } else if (
        lastEpisodes[showId].season < season ||
        (lastEpisodes[showId].season === season &&
          lastEpisodes[showId].number < number)
      ) {
        lastEpisodes[showId] = episode;
      }
    });
  
    const nextEpisodes = Object.values(lastEpisodes).map((episode) => {
      return {
        ...episode,
        number: episode.number + 1,
      };
    });
  
    return nextEpisodes;
  };

  const filterWatchNext = (watchNextEpisodes) => {
    const filtered = watchNextEpisodes.filter((episode, index, self) =>
      index === self.findIndex((e) => e.id === episode.id)
    );
    return filtered;
  };

  useEffect(() => {
    const nextEpisodes = getNextEpisodes(alreadyWatched);
    const filteredWatchNext = filterWatchNext(nextEpisodes);
    setWatchNextEpisodes(filteredWatchNext);
  }, [alreadyWatched]);

  return (
    <section className="userWatchListSection" ref={watchListSectionRef}>
      <div
        className="watchNextSection"
        ref={alreadyWatchedRef}
        style={{
          display: showAlreadyWatched ? "flex" : "none", // Hide the section based on the state
        }}
      >
        <h2>Already Watched</h2>
        <div className="episodeCardsContainer">
          {alreadyWatched
            .filter((item) => item)
            .map((item, index) => (
              <UserCardEpisode
                key={index}
                index={index}
                id={item.id}
                BtnDeleteShow={BtnDeleteShow}
                season={item.season}
                number={item.number}
                ShowDetail={() => handleShowDetail(item.id)}
                image={item.image?.medium}
                name={item.name}
                // episodes={allEpisodes}
                // handleAddEpisode={() => handleAddEpisode(id)}
              />
            ))}
        </div>
      </div>
      <div className="watchNextSection">
        <h2>Watch Next</h2>
        <div className="episodeCardsContainer">
          {watchNextEpisodes
            .filter((item) => item)
            .map((item, index) => (
              <UserCardEpisode
                key={index}
                index={index}
                id={item.id}
                BtnDeleteShow={BtnDeleteShow}
                season={item.season}
                number={item.number}
                ShowDetail={() => handleShowDetail(item.id)}
                image={item.image?.medium}
                name={item.name}
                // episodes={allEpisodes}
                // handleAddEpisode={() => handleAddEpisode(id)}
              />
            ))}
        </div>
      </div>
      <div className="watchNextSection">
        <h2>Not Watched for a While</h2>
        {notWatchedForAWhile.map((item, index) => (
          <CardUserWatchList
            key={index}
            id={item.id}
            ShowDetail={() => handleShowDetail(item.id)}
            image={item.image?.medium}
            name={item.name}
            language={item.language}
            genres={item.genres}
            // rating={item.rating.average}
            country={item.network?.country.name}
          />
        ))}
      </div>
      <div className="watchNextSection">
        <h2>Not Started Yet</h2>
        <div className="episodeCardsContainer">
          {notStartedYet
            .filter((item) => item)
            .map((item, index) => (
              <CardUserWatchList
                key={index}
                id={item.id}
                ShowDetail={() => handleShowDetail(item.id)}
                image={item.image?.medium}
                name={item.name}
                language={item.language}
                genres={item.genres}
                network={item.network?.name}
                status={item.status}
                // rating={item.rating.average}
                country={item.network?.country.name}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default UserWatchList;

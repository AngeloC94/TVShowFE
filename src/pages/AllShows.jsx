import { useEffect, useState, useCallback, useRef } from "react";
import CardSearchResult from "../components/CardSearchResult";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function AllShows() {
  const allShowSectionRef = useRef();
  const lastAnimatedIndex = useRef(0);
  const visibleItemsRef = useRef(12);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(24);
  gsap.registerPlugin(ScrollTrigger);

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

      setAllData(sortedJson);
      console.log(json);
    };
    fetchAllData();
  }, []);

  // const initScrollAnimation = useCallback(() => {
  //   const cards = document.querySelectorAll(".card");

  //   for (let i = lastAnimatedIndex.current; i < visibleItemsRef.current; i++) {
  //     const card = cards[i];

  //     gsap.fromTo(
  //       card,
  //       {
  //         y: 50,
  //         opacity: 0,
  //       },
  //       {
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top bottom",
  //           end: "bottom top",
  //         },
  //         y: 0,
  //         opacity: 1,
  //         duration: 2,
  //         ease: "power2.out",
  //       }
  //     );
  //   }

  //   lastAnimatedIndex.current = visibleItemsRef.current;
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 5) {
        setVisibleItems((prevVisibleItems) => {
          visibleItemsRef.current = prevVisibleItems + 24;
          return prevVisibleItems + 24;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowEpisodes = async (id) => {
    const res = await fetch(
      // "http://www.omdbapi.com/?s=Batman&page=2&Season=1&apikey=34ab68e9"
      `https://api.tvmaze.com/shows/${id}`
    );
    const json = await res.json();

    console.log(json);
    navigate(`/shows/${id}`);
  };
  useEffect(() => {
    gsap.fromTo(
      allShowSectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2 }
    );
  }, []);
  return (
      <div ref={allShowSectionRef} className="allShowsWrapper">
        <h2>All Shows</h2>
        <section className="allShowsCardSection">
          {allData.slice(0, visibleItems).map((item, index) => (
            <CardSearchResult
              className="card"
              show={item}
              key={index}
              id={item.id}
              onClick={() => handleShowEpisodes(item.id)}
              img={item.image?.medium}
              title={item.name}
              description={item.summary}
              year={item.Year}
            />
          ))}
        </section>
      </div>
  );
}

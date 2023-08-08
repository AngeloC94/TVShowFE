import CardTvShow from "../components/CardTvShow";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import DemonSlayerBG from "../img/demonslayer1920.jpg";
import ArcaneBG from "../img/arcane1920.jpg";
import TwdBG from "../img/twd1920.jpg";
import TwdCityBG from "../img/twdCity1920.jpg";
import TheLastOfUs from "../img/thelastofus1920.jpg";
import CarouselCustom from "../components/CarouselCustom";
import { useNavigate, useParams } from "react-router-dom";
import CarouselHero from "../components/CarouselHero";
import { BsChevronDown } from "react-icons/bs";
import tvPhoto from "../img/tvPhoto.jpg";
import Loader from "../components/Loader";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataNews, setDataNews] = useState([]);
  const [dataTvShows, setDataTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef();
  const newShowsCardSectionRef = useRef();
const tvSeriesCardSectionRef = useRef();

  const secondSectionRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let count = 0;
    const handleLoad = () => {
      count++;
      if (count === images.length) {
        setIsLoaded(true);
      }
    };
    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
      });
    };
  }, []);
  useEffect(() => {
    const fetchDataNews = async () => {
      const res = await fetch("https://api.tvmaze.com/show");
      const json = await res.json();
      const taglio = json.slice(0, 20);
      setDataNews(taglio);
    };
    const fetchDataTvShows = async () => {
      const res = await fetch("https://api.tvmaze.com/show");
      const json = await res.json();
      const taglio = json.slice(20, 40);
      setDataTvShows(taglio);
    };
    document.body.style.overflow = "";
    fetchDataNews();
    fetchDataTvShows();
  }, []);

  // const handleShowEpisodes = async (id) => {
  //   const res = await fetch(
  //     // "http://www.omdbapi.com/?s=Batman&page=2&Season=1&apikey=34ab68e9"
  //     `https://api.tvmaze.com/shows/${id}/episodes`
  //   );
  //   const json = await res.json();
  //   setData(json);
  //   navigate(`/shows/${id}/episodes`);
  // };
  const handleShowDetail = async (id) => {
    const res = await fetch(
      // "http://www.omdbapi.com/?s=Batman&page=2&Season=1&apikey=34ab68e9"
      `https://api.tvmaze.com/shows/${id}`
    );
    const json = await res.json();
    setData(json);
    navigate(`/shows/${id}`);
  };

  function handleFindMore() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      secondSectionRef.current,
      { opacity: 2, y: 300, x: 300 },
      {
        opacity: 2,
        y: 0,
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
    gsap.fromTo(
      newShowsCardSectionRef.current,
      { opacity: 2, y: 300, x: -300 },
      {
        opacity: 2,
        y: 0,
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: newShowsCardSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
    gsap.fromTo(
      tvSeriesCardSectionRef.current,
      { opacity: 2, y: 300 },
      {
        opacity: 2,
        y: 0,
        duration: 3,
        scrollTrigger: {
          trigger: tvSeriesCardSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <>
      {isLoaded ? null : <Loader />}
      <div className="mainWrapper">
        <section ref={heroRef} className="heroWrapper">
          <h1 className="heroTitle">Welcome to our show tracking web app!</h1>
          {/* <p className="heroSubTitle">
            With our app, you can keep track of all the shows you've watched in
            one place. Never again will you have to struggle to remember which
            episode you left off on or which show you need to catch up on.
          </p> */}

          <div onClick={handleFindMore} className="heroFindMore">
            <p>Find More!</p>
            <BsChevronDown className="chevronAnimation" />
          </div>
          <div className="blackOverlay"></div>
          <CarouselHero>
            <img className="heroImg" src={TheLastOfUs} alt="Hero" />
            <img className="heroImg" src={TwdCityBG} alt="Hero" />
            <img className="heroImg" src={ArcaneBG} alt="Hero" />
            <img className="heroImg" src={DemonSlayerBG} alt="Hero" />

            <img className="heroImg" src={TwdBG} alt="Hero" />
          </CarouselHero>
        </section>
        <section ref={secondSectionRef} className="secondSection">
          <img src={tvPhoto} width={"350px"} height={"350px"} />
          <div>
            <h2 style={{ fontSize: "35px" }}>Smooth interface!</h2>
            <p className="heroDescription">
              With our user-friendly interface, you can easily add and manage
              all the shows you're currently watching, as well as the ones
              you've completed.Not only that, but our app also provides
              personalized recommendations based on the shows you've watched and
              enjoyed. Discover new shows you're sure to love and add them to
              your watchlist with just a click. Say goodbye to the hassle of
              keeping track of your favorite shows and say hello to effortless
              show tracking with our web app. Sign up today and start keeping
              track of your shows like a pro!
            </p>
          </div>
        </section>

        <h2>NEW SHOWS</h2>

        <section ref={newShowsCardSectionRef} className="cardSection">
          <CarouselCustom>
            {dataNews.map((item, index) => {
              return (
                <CardTvShow
                  key={index}
                  id={item.id}
                  onClick={() => handleShowDetail(item.id)}
                  img={item.image?.medium}
                  title={item.name}
                  description={item.summary}
                  year={item.Year}
                />
              );
            })}
          </CarouselCustom>
        </section>

        {/* <Banner /> */}

        <h2>Serie TV</h2>
        <section ref={tvSeriesCardSectionRef} className="cardSection">
          <CarouselCustom>
            {dataTvShows.map((item, index) => {
              return (
                <CardTvShow
                  key={index}
                  onClick={() => handleShowDetail(item.id)}
                  img={item.image?.medium}
                  title={item.name}
                  description={item.summary}
                  year={item.Year}
                />
              );
            })}
          </CarouselCustom>
        </section>
      </div>
    </>
  );
}

export default Home;

import "./App.scss";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CercaFilm from "./components/CercaFilm";
import { useNavigate, useParams } from "react-router-dom";
import RoutesCustom from "./Routes";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import LeftSidebar from "./components/LeftSideBar";
import { useSelector } from "react-redux";
import SwitchButton from "./components/SwitchButton";

function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [dataNews, setDataNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Get loggedIn state from Redux store

  function handleNavSearch() {
    setIsSearching(true);
    document.body.style.overflow = "hidden";
  }
  function handleIsSearching() {
    setIsSearching(false);
    document.body.style.overflow = "";
  }

  const handleSearchInputChange = (event) => {
    setInputSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true); // Set loading state to true before making the API call
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${id}`);
    const json = await res.json();
    setDataNews(json);
    setIsSearching(false);
    setIsLoading(false); // Set loading state to false after the API response is received

    document.body.style.overflow = "";
    console.log(json);
    navigate(`/SearchResult/${inputSearchValue}`);
  };

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="THEBIGWRAP">
          {!isLoggedIn && (
            <Navbar
              handleNavSearch={handleNavSearch}
              isSearching={isSearching}
            />
          )}

          {isSearching ? (
            <div
              onClick={handleIsSearching}
              className="blackOverlaySearch"
            ></div>
          ) : null}
          {isSearching ? (
            <div className="heroContent ">
              {/* <h1>SEARCH A TV SHOW</h1> */}
              <CercaFilm
                onClick={handleSearch}
                onSubmit={handleSearch}
                onChange={handleSearchInputChange}
              />
            </div>
          ) : (
            <></>
          )}
          {isLoggedIn && (
            <>
              {" "}
              <SwitchButton />
              <LeftSidebar
                handleNavSearch={handleNavSearch}
                isSearching={isSearching}
              />
            </>
          )}
          <RoutesCustom />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;

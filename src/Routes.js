import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import ShowEpisodes from "./pages/ShowEpisodes";
import Login from "./pages/Login";
import  ShowDetail from "./pages/ShowDetail";
import AllShows from "./pages/AllShows";
import UserWatchList from "./pages/user/UserWatchList";
import UserProfile from "./pages/user/UserProfile";
import Register from "./pages/Register";

function RoutesCustom() {
 
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<AllShows />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
        <Route path="/shows/:id/episodes" element={<ShowEpisodes />} />
        <Route path="/SearchResult/:id" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userwatchlist" element={<UserWatchList />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
   
  );
}

export default RoutesCustom;

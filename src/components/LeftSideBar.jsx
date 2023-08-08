import React, { useState } from "react";
import "./LeftSidebar.scss";
import {
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { ImFilm } from "react-icons/im";
import { BsListCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../reducers/userReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const LeftSidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  function handleNavHome() {
    navigate("/");
  }

  function handleNavAllShows() {
    navigate("/shows");
  }

  function handleNavUserProfile() {
    navigate("/userprofile");
  }

  function handleUserWatchList() {
    navigate("/userwatchlist");
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setUser({ token: null }));
    navigate("/");
  };

  function handleOpenSidebar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className="left-sidebar"
      style={isOpen === false ? { width: "50px" } : { width: "200px" }}
    >
      <ul
        style={
          isOpen === false ? { alignItems: "center" } : { alignItems: "start" }
        }
        className="sideBarMenu"
      >
        <li className="logo">
          {/* <img src={Logo} width="65px" /> */}
          <h2 style={{ textDecoration: "line-through" }}>Logo</h2>
        </li>

        <li className="sidebarLink">
          <AiOutlineHome
            className={`userIcon ${
              location.pathname === "/" ? "activeIcon" : ""
            }`}
            size={25}
            onClick={handleNavHome}
          />
          <span
            className={`${isOpen === false ? "sideBarIconTextClosed" : ""} ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={handleNavHome}
          >
            Home
          </span>
        </li>

        <li className="sidebarLink">
          <AiOutlineUser
            className={`userIcon ${
              location.pathname === "/userprofile" ? "activeIcon" : ""
            }`}
            size={25}
            onClick={handleNavUserProfile}
          />

          <span
            className={`${isOpen === false ? "sideBarIconTextClosed" : ""} ${
              location.pathname === "/userprofile" ? "active" : ""
            }`}
            onClick={handleNavUserProfile}
          >
            Profile
          </span>
        </li>
        <li className="sidebarLink">
          <BsListCheck
            className={`userIcon ${
              location.pathname === "/userwatchlist" ? "activeIcon" : ""
            }`}
            size={25}
            onClick={handleUserWatchList}
          />

          <span
            className={`${isOpen === false ? "sideBarIconTextClosed" : ""} ${
              location.pathname === "/userwatchlist" ? "active" : ""
            }`}
            onClick={handleUserWatchList}
          >
            Watchlist
          </span>
        </li>
        <li className="sidebarLink">
          <AiOutlineSearch
            className={`userIcon ${
              props.isSearching === true ? "activeIcon" : ""
            }`}
            size={25}
            onClick={props.handleNavSearch}
          />
         <span
            className={`${isOpen === false ? "sideBarIconTextClosed" : ""}`}
            onClick={props.handleNavSearch}
          >
            Search
          </span>
        </li>
        <li className="sidebarLink">
          <ImFilm
            className={`userIcon ${
              location.pathname === "/shows" ? "activeIcon" : ""
            }`}
            size={25}
            onClick={handleNavAllShows}
          />

          <span
            className={`${isOpen === false ? "sideBarIconTextClosed" : ""} ${
              location.pathname === "/shows" ? "active" : ""
            }`}
            onClick={handleNavAllShows}
          >
            All Shows
          </span>
        </li>

        <li className="sidebarLink">
          <AiOutlineLogout
            className="userIcon"
            size={25}
            onClick={handleLogout}
          />
          <span
            className={isOpen === false ? "sideBarIconTextClosed" : ""}
            onClick={handleLogout}
          >
            Log Out
          </span>
        </li>
      </ul>
      <div className="openSideBar">
        <FiChevronRight onClick={handleOpenSidebar} size={25} />
      </div>
    </div>
  );
};

export default LeftSidebar;

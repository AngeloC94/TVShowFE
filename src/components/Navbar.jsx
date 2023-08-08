import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  function handleNavLogin() {
    navigate("/login");
  }
  function handleNavHome() {
    navigate("/");
  }

  function handleNavAllShows() {
    navigate("/shows");
  }
  function handleNavRegister() {
    navigate("/register");
  }

  return (
    <nav id="navbar" className="navbar">
      <div className="logo">
        {/* <img src={Logo} width="65px" /> */}
        <h2 onClick={handleNavHome} style={{ textDecoration: "line-through" }}>Logo</h2>
      </div>
      <ul className="navbarLinks">
        <li className="links" onClick={handleNavAllShows}>
          All Shows
        </li>
        <li className="links" onClick={handleNavAllShows}>
          Genres
        </li>

        <li className="links" onClick={handleNavAllShows}>
          Contacts
        </li>
        <li onClick={handleNavRegister} className="links">
          Register
          {/* <AiOutline size={25} onClick={handleNavRegister} /> */}
        </li>
      </ul>

      {isLoggedIn ? (
        <div className="navIcons">
          <div className="userIcon">
            <span onClick={props.handleNavSearch}>Search</span>
            <AiOutlineSearch size={25} onClick={props.handleNavSearch} />
          </div>
        </div>
      ) : (
        <div className="navIcons">
          {/* <span onClick={handleNavHome}>Home</span>
          <div className="userIcon">
            <AiOutlineHome
              className="userIcon"
              size={20}
              onClick={handleNavHome}
            />
          </div> */}
          <div className="userIcon">
            <span onClick={props.handleNavSearch}>Search</span>
            <AiOutlineSearch size={25} onClick={props.handleNavSearch} />
          </div>
          <div className="userIcon">
            <span onClick={handleNavLogin}>Log in</span>
            <AiOutlineLogin size={25} onClick={handleNavLogin} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

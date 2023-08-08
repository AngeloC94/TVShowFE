import React from "react";
import {
    AiOutlineInstagram,
    AiOutlineFacebook,
    AiOutlineTwitter,
  } from "react-icons/ai";
function Footer() {
  return (
    <footer id="mainFooter">
      <p>&copy; 2023 MyTVShows. All rights reserved.</p>
      <div className="socialsIconsSections">
        <AiOutlineInstagram className="socialsIcon" size={25} />
        <AiOutlineFacebook className="socialsIcon" size={25} />
        <AiOutlineTwitter className="socialsIcon" size={25} />
      </div>
    </footer>
  );
}

export default Footer;

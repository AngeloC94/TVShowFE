import React from 'react';
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLink } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import{AiOutlineSetting} from "react-icons/ai"
import "./UserProfile.scss"
import { useSelector } from 'react-redux';


const UserProfile = () => {
  const username = useSelector((state) => state.user.username);
  const city = useSelector((state) => state.user.city);
  return (
    <div className="profile-container">
      <FaUserCircle className="profile-image" />
      <AiOutlineSetting size={25} className="edit-button" />
      <h1 className="name">{username}</h1>
      <p className="bio">Short bio or tagline</p>
      
      <div className="info-container">
        <div className="info-item">
          <FaMapMarkerAlt className="info-icon" />
          {city}
        </div>
        <div className="info-item">
          <FaEnvelope className="info-icon" />
          Email
        </div>
        <div className="info-item">
          <FaPhone className="info-icon" />
          Phone
        </div>
        <div className="info-item">
          <FaLink className="info-icon" />
          Website
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

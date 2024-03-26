import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faImages } from "@fortawesome/free-solid-svg-icons";

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const defaultActiveTab = activeTab || "profile";

  const handleClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className="profile-tabs-container">
      <ul style={{ position: "absolute", bottom: 280, width: "100%" }}>
        <li
          style={{
            padding: "15px 20px",
            cursor: "pointer",
            display: "inline-block",
            backgroundColor:
              defaultActiveTab === "profile" ? "#eee" : "inherit",
            fontWeight: defaultActiveTab === "profile" ? "bold" : "normal",
            color: "#333",
            transition: "background-color 0.2s ease-in-out",
            marginLeft: "900px",
          }}
          onClick={() => handleClick("profile")}
        >
          <FontAwesomeIcon icon={faUser} /> Profile
        </li>
        <li
          style={{
            padding: "15px 20px",
            cursor: "pointer",
            display: "inline-block",
            backgroundColor:
              defaultActiveTab === "followers" ? "#eee" : "inherit",
            fontWeight: defaultActiveTab === "followers" ? "bold" : "normal",
            color: "#333",
            transition: "background-color 0.2s ease-in-out",
            marginRight: "10px",
          }}
          onClick={() => handleClick("followers")}
        >
          <FontAwesomeIcon icon={faUsers} /> Followers
        </li>
        <li
          style={{
            padding: "15px 20px",
            cursor: "pointer",
            display: "inline-block",
            backgroundColor:
              defaultActiveTab === "friends" ? "#eee" : "inherit",
            fontWeight: defaultActiveTab === "friends" ? "bold" : "normal",
            color: "#333",
            transition: "background-color 0.2s ease-in-out",
            marginRight: "10px",
          }}
          onClick={() => handleClick("friends")}
        >
          <FontAwesomeIcon icon={faUsers} /> Friends
        </li>
        <li
          style={{
            padding: "15px 20px",
            cursor: "pointer",
            display: "inline-block",
            backgroundColor:
              defaultActiveTab === "gallery" ? "#eee" : "inherit",
            fontWeight: defaultActiveTab === "gallery" ? "bold" : "normal",
            color: "#333",
            transition: "background-color 0.2s ease-in-out",
            marginLeft: "10px",
          }}
          onClick={() => handleClick("gallery")}
        >
          <FontAwesomeIcon icon={faImages} /> Gallery
        </li>
      </ul>
    </div>
  );
};

export default ProfileTabs;

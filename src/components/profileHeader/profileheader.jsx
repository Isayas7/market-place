import React from "react";
import Image from "next/image";
const ProfileHeader = ({ name, bio, profilePicture, backgroundImage }) => {
  return (
    <headerProfileHeader
      className="profile-header"
      style={{
        backgroundImage: `url("/green.jpg")`,
        backgroundSize: "cover",
        height: 200,
        width: 1500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        marginTop: -17,
      }}
    >
      <div className="profile-picture">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt={`${name}'s profile picture`}
            width={80}
            height={80}
            style={{ borderRadius: "50%", marginBottom: "-500px" }}
          />
        ) : (
          <i className="far fa-user"></i>
        )}
      </div>
      <div className="profile-info">
        <h3
          style={{
            marginLeft: "-1350px",
            marginTop: "130px",
            fontWeight: "bold",
          }}
        >
          {name}
        </h3>{" "}
        <p
          style={{
            marginLeft: "-1350px",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {bio}
        </p>{" "}
      </div>
    </headerProfileHeader>
  );
};

export default ProfileHeader;

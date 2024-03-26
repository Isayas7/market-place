import React from "react";
import Image from "next/image";
const ProfileHeader = ({ name, bio, profilePicture, backgroundImage }) => {
  return (
    <div className="">
      <Image
        className="w-full size-64 relative"
        width={500}
        height={500}
        src={"/green.jpg"}
      />
      <Image
        src={profilePicture}
        alt={`${name}'s profile picture`}
        width={80}
        height={80}
        className="absolute b-[-10] l-10"
      />
      <div className=""></div>
    </div>
  );
};

export default ProfileHeader;

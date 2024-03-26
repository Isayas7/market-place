import React from "react";
import Image from "next/image";
const ProfileHeader = ({ name, bio, profilePicture, backgroundImage }) => {
  return (
    <div className="relative p-1">
      <div className="absolute bottom-[-40px] right-40">
        <Image
          src={profilePicture}
          alt={`${name}'s profile picture`}
          width={80}
          height={80}
          className=" size-28 rounded-full object-cover"
        />
        {name}
      </div>
      <Image
        className="w-full size-64 object-cover bg-black "
        width={1500}
        height={1500}
        src={"/banner.jpg"}
      />

      <div className=""></div>
    </div>
  );
};

export default ProfileHeader;

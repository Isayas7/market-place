import React from "react";
import Image from "next/image";
const ProfileHeader = ({ name, bio, profilePicture, backgroundImage }) => {
  return (
    <div className="relative p-1">
      <div className="absolute bottom-[0px] right-20 bg-white dark:bg-mirage p-4 rounded-sm">
        <Image
          src={profilePicture}
          alt={`${name}'s profile picture`}
          width={80}
          height={80}
          className=" size-28 rounded-full object-cover z-50"
        />
        {name}
      </div>
      <div className="bg-jade  rounded-sm">
        <Image
          className="w-full size-64 object-cover rounded-sm "
          width={1500}
          height={1500}
          src={"/banner.png"}
        />
      </div>

      <div className=""></div>
    </div>
  );
};

export default ProfileHeader;

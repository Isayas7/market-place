"use client";

import ProfileHeader from "@/components/profileHeader/profileheader";
import ProfileTabs from "@/components/profileTabs/profiletabs";

import React, { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="profile-page">
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ProfileHeader
        name="Isayas Melkamu"
        bio="Seller"
        profilePicture="/profile.jpg"
        backgroundImage="/dashboard.png"
      />
    </div>
  );
}

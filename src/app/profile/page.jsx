"use client";

import ProfileHeader from "@/components/profile/profileheader/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImProfile } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

import React, { useState } from "react";
import PersonalInformation from "@/components/profile/personal-info";
import Setting from "@/components/profile/setting";
import Security from "@/components/profile/security";

export default function Profile() {
  return (
    <div className="flex flex-col">
      <ProfileHeader
        name="Isayas Melkamu"
        bio="Seller"
        profilePicture="/profile.jpg"
        backgroundImage="/dashboard.png"
      />
      <div className="w-full flex justify-between">
        <div></div>
        <Tabs defaultValue="personal-info" className="w-[80%]">
          <TabsList>
            <TabsTrigger value="personal-info">
              <ImProfile />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="setting">
              <IoSettingsOutline /> Setting
            </TabsTrigger>
            <TabsTrigger value="security">
              <MdOutlineSecurity /> Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-info">
            <PersonalInformation />
          </TabsContent>
          <TabsContent value="setting">
            <Setting />
          </TabsContent>
          <TabsContent value="security">
            <Security />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

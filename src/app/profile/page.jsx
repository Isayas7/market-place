"use client";

import ProfileHeader from "@/components/profile/profileheader/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImProfile } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

import React, { useState } from "react";
import Setting from "@/components/profile/setting";
import Security from "@/components/profile/security";
import dynamic from "next/dynamic";

const PersonalInformation = dynamic(
  () => import("@/components/profile/personal-info"),
  {
    ssr: false,
  }
);

export default function Profile() {
  return (
    <div className="flex flex-col">
      <ProfileHeader bio="Seller" backgroundImage="/dashboard.png" />
      <div className="w-full flex ">
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList>
            <TabsTrigger value="personal-info">
              <ImProfile className="mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="setting">
              <IoSettingsOutline className="mr-2" /> Setting
            </TabsTrigger>
            <TabsTrigger value="security">
              <MdOutlineSecurity className="mr-2" /> Security
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

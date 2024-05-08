"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { storefrontSchema } from "@/validationschema/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { StoreFrontCrationForm } from "@/form/form-data";
import { useUserUpdateQuery, UseBankQuery } from "@/hooks/use-users-query";
import CustomSingleImageIpload from "@/components/single-image-uploader";
import { useSession } from "next-auth/react";
import { UseRoleQuery } from "@/hooks/use-role-query";
import { notificationType, roleData } from "@/utils/permission";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { address } from "@/utils/constant";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import React, { useState, useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "@/hooks/use-geolocation";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useCreateNotification } from "@/hooks/use-notification-query";
import { useSocket } from "../socketprovider/socket-provider";

const StorefrontForm = () => {
  const [coord, setCoord] = useState([8.9914, 38.7693]);

  const router = useRouter();

  const session = useSession();

  const socket = useSocket();

  const {
    mutate: updateUserToSeller,
    isSuccess,
    isLoading,
  } = useUserUpdateQuery();
  const { data: banks } = UseBankQuery();

  const { mutate: pushNotification } = useCreateNotification();

  const { data: rolesData, isFetching } = UseRoleQuery();

  const form = useForm({
    resolver: zodResolver(storefrontSchema),
    defaultValues: {
      profileImage: "",
      identificationCard: "",
      nationalId: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      bankInfo: "",
      accountNumber: "",
      location: [],
    },
  });

  const sellerRole = () => {
    const role = rolesData.data.find((item) => item.role === roleData.Seller);
    return role ? role._id : null;
  };

  const onSubmit = (formValues) => {
    const role = [...session?.data.user.role, sellerRole()];
    formValues = {
      ...formValues,
      role: role,
    };

    const notification = {
      user: session?.data?.user?.id,
      notificationType: notificationType.approvalRequest,
      notificationTitle: "store approval request",
    };

    pushNotification(notification);

    socket?.emit("sendStoreApprovalRequest", {
      user: session?.data?.user.id,
      type: notificationType.message,
      createdAt: Date.now(),
    });

    updateUserToSeller({ userInfo: formValues, id: session?.data.user.id });
    form.reset({
      profileImage: "",
      identificationCard: "",
      nationalId: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      bankInfo: "",
      accountNumber: "",
      location: [],
    });
  };

  if (isSuccess) {
    router.push(`/seller`);
  }

  // map information
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location?.coordinates.lat, location?.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
      setCoord([location?.coordinates?.lat, location?.coordinates?.lng]);
      form.setValue("location", [
        location?.coordinates?.lat,
        location?.coordinates?.lng,
      ]);
    } else {
      alert(location?.error.message);
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setCoord([e?.latlng?.lat, e?.latlng?.lng]);
        form.setValue("location", [e?.latlng?.lat, e?.latlng?.lng]);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className=" w-full  md:w-2/5 flex flex-col  gap-5">
            <Card className=" py-4 w-full   h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Uplaod profile Image"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
            <Card className=" py-4 w-full  h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="identificationCard"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Upload Identification Card"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
            <Card className="py-4 w-full   h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Upload National Id"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className=" w-full md:w-3/5 space-y-8 ">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-7    ">
              {StoreFrontCrationForm.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          type={item.type}
                          placeholder={item.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className=" flex flex-col justify-center mt-2">
                    <FormLabel>Address</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : "Select address"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0 h-64 ">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No address found.</CommandEmpty>
                          <CommandGroup className="overflow-y-scroll">
                            {address.map((add, index) => (
                              <CommandItem
                                value={add.city}
                                key={index}
                                onSelect={() => {
                                  form.setValue("address", add.city);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    add.city === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {add.city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Bank</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {banks?.data?.data?.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <>
                    <div className="row">
                      <div className="col ">
                        <h2> Get your location</h2>
                        <div className="col">
                          <MapContainer
                            ref={mapRef}
                            center={coord}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="flex-1 w-full h-[300px] z-0"
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {location?.loaded && !location?.error && (
                              <Marker
                                icon={
                                  new L.Icon({
                                    iconUrl: MarkerIcon.src,
                                    iconRetinaUrl: MarkerIcon.src,
                                    iconSize: [25, 41],
                                    iconAnchor: [12.5, 41],
                                    popupAnchor: [0, -41],
                                    shadowUrl: MarkerShadow.src,
                                    shadowSize: [41, 41],
                                  })
                                }
                                position={coord}
                              ></Marker>
                            )}
                            <LocationMarker />
                          </MapContainer>
                        </div>
                      </div>
                    </div>

                    <div className="row my-4">
                      <div className="col d-flex justify-content-center">
                        <Button type="button" onClick={showMyLocation}>
                          Locate Me
                        </Button>
                      </div>
                    </div>
                  </>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button className="w-full ml-auto text-xl" type="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StorefrontForm;

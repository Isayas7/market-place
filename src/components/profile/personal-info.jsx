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
import { deliveryPersonnelSchema } from "@/validationschema/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { deliveryPersonnelsForm } from "@/form/form-data";
import { UseBankQuery, useUserUpdateQuery } from "@/hooks/use-users-query";
import CustomSingleImageIpload from "@/components/single-image-uploader";

import axios from "axios";

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
import React, { useEffect, useRef, useState } from "react";

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
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { hasBuyerRole } from "@/middleware";

const PersonalInformation = () => {
  const session = useSession();

  const { toast } = useToast();

  const userId = session?.data?.user?.id;

  const [coord, setCoord] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");

  const {
    mutate: updateDP,
    isSuccess,
    isLoading,
    isError,
    data,
  } = useUserUpdateQuery();
  const { data: banks } = UseBankQuery();

  const form = useForm({
    // resolver: zodResolver(deliveryPersonnelSchema),
    defaultValues: async () => {
      const user = await axios.get(
        `${process.env.BASE_URL}/api/user/${userId}`
      );
      setSelectedBank(user?.data?.bankInfo);

      if (user?.data?.location && user?.data?.location?.length > 0) {
        setCoord(user?.data?.location);
      } else {
        const defaultCoordinates = [8.9914, 38.7693];
        setCoord(defaultCoordinates);
      }
      return {
        _id: user?.data._id,
        profileImage: user?.data?.profileImage,
        firstName: user?.data?.firstName,
        middleName: user?.data?.middleName,
        lastName: user?.data?.lastName,
        email: user?.data?.email,
        address: user?.data?.address,
        phoneNumber: user?.data?.phoneNumber,
        bankInfo: user?.data?.bankInfo,
        accountNumber: user?.data?.accountNumber,
        location: user?.data?.location,
      };
    },
  });

  const onSubmit = (formValues) => {
    updateDP({ userInfo: formValues, id: formValues._id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        className: " border-2 text-black bg-[#D4F4E7]",
        description: "Your Information updated successfully",
      });
      form.reset({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } else if (isError) {
      toast({
        variant: "destructive",
        title: "Failed to update",
      });
    }
  }, [isSuccess, isError, toast, form]);

  const selectedBankName = banks?.data?.data?.find(
    (b) => b.name === selectedBank
  )?.name;

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
        location?.coordinates.lat,
        location?.coordinates.lng,
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
          </div>

          <div className=" w-full md:w-3/5 space-y-8 ">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-7    ">
              {deliveryPersonnelsForm.map((item, index) => (
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
                  <FormItem className="mt-2 flex flex-col justify-center">
                    <FormLabel>Address</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              " justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : "Select address"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 h-64 ">
                        <Command>
                          <CommandInput placeholder="Search Address..." />
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
                      defaultValue={selectedBankName}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              banks?.data?.data?.find(
                                (b) => b.id === selectedBank
                              )?.name
                            }
                          />
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

                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {coord && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <>
                      {coord &&
                        hasBuyerRole(session?.data?.user) &&
                        session?.data?.user.myrole.length > 1 && (
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
                        )}
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
            )}

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

export default PersonalInformation;

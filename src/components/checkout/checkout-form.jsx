"use client";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useOrderStore } from "@/store/order-store";
import { useStore } from "zustand";

import { Check, ChevronsUpDown } from "lucide-react";
import { address } from "@/utils/constant";
import { cn } from "@/lib/utils";
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
import { usePayoutStore } from "@/store/payout-store";
import { useRouter } from "next/navigation";
import { shippingInformation } from "@/form/form-data";
import { useForm } from "react-hook-form";

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
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/validationschema/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CheckoutForm() {
  const [coord, setCoord] = useState([8.9914, 38.7693]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const myorders = useStore(useOrderStore, (state) => state);
  const setPayoutData = useStore(usePayoutStore, (state) => state);

  const form = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      secretCode: "",
      location: [],
    },
  });

  const onSubmit = (formValues) => {
    const ordersWithShipping = calculateTotalPriceWithShipping(
      myorders?.orders,
      formValues
    );
    console.log(ordersWithShipping);
    setPayoutData.addPayout(ordersWithShipping);
    router.push("payment");
  };

  let totalPrice = 0;

  myorders?.orders.forEach((order) => {
    totalPrice += order.totalPrice;
  });

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
    <div>
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review your order categorize to complete the checkout process.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          The order is catagorized by address you order
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className=" w-full  space-y-8 ">
            <Card className="">
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myorders?.orders?.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{order.quantityPrice}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{order.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className=" grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-7    ">
              {shippingInformation.map((item, index) => (
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
            </Card>
            <Card className="p-4">
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
            </Card>
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div className="font-medium">{totalPrice} ETB</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>Shipping per KM</div>
                  <div className="font-medium">5.00 ETB/1KM</div>
                </div>
                <Separator />
                <div className="flex flex-col">
                  <div>Where you want to order?</div>
                  <Separator />

                  <Separator />
                  <div className={`font-medium flex `}>
                    Location:
                    <div
                      className={`font-medium ${
                        form.getValues("location").length !== 0
                          ? "text-jade"
                          : "text-red-500"
                      }`}
                    >
                      {form.getValues("location").length !== 0
                        ? "Selected"
                        : "Not Selceted"}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setLoading(!loading)}
                  type="submit"
                  className="w-full"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                  ) : (
                    "Next"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateTotalPriceWithShipping(orders, receiverInformation) {
  const userLocation = receiverInformation?.location;
  orders.forEach((order) => {
    let totalDistance = 0;
    let smallestDistance = Infinity;

    order.items.forEach((item, index) => {
      const itemLocation = item?.location;
      const distanceToItem = calculateDistance(
        userLocation[0],
        userLocation[1],
        itemLocation[0],
        itemLocation[1]
      );
      smallestDistance > distanceToItem
        ? (smallestDistance = distanceToItem)
        : smallestDistance;

      if (index > 0) {
        const previousItemLocation = order?.items[index - 1].location;
        const distanceBetweenItems = calculateDistance(
          previousItemLocation[0],
          previousItemLocation[1],
          itemLocation[0],
          itemLocation[1]
        );
        totalDistance += distanceBetweenItems;
      }
    });

    const shippingPrice = calculateShippingPrice(
      totalDistance + smallestDistance
    );
    order.distance = Math.ceil(totalDistance + smallestDistance);
    order.shippingPrice = Math.ceil(shippingPrice);
    order.receiverInformation = receiverInformation;
  });

  return orders;
}

// Function to calculate shipping price based on distance
function calculateShippingPrice(distance) {
  const shippingRate = 5; // 5 ETB per kilometer
  return distance * shippingRate;
}

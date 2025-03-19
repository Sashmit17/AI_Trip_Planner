import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
import { debounce } from "lodash";

function InfoSection({ trip }) {

  const [photoUrl,SetPhotoUrl]=useState();

  useEffect(()=>{
    if(trip) {
        const debouncedGetPhoto = debounce(GetPlacePhoto, 1000); // Delay API call by 500ms
        debouncedGetPhoto();
        return () => debouncedGetPhoto.cancel();
    }
},[trip]);

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[4].name);

      {/*const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      SetPhotoUrl(PhotoUrl);*/}
      
      const photos = resp?.data?.places?.[0]?.photos;
      const PhotoUrl = photos && photos.length > 3 ? 
          PHOTO_REF_URL.replace('{NAME}', photos[3].name) : 
          "/placeholder.jpg"; // Use default image if no photo
      SetPhotoUrl(PhotoUrl);

      console.log(PhotoUrl);
      console.log(trip?.userSelection?.location?.label);
    })
  }

  return (
    <div>
      <img
        src={photoUrl?photoUrl:"/placeholder.jpg"}alt={trip?.userSelection?.location?.label }
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.noOfDays} Day
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂No. of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          {" "}
          <IoIosSend />{" "}
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

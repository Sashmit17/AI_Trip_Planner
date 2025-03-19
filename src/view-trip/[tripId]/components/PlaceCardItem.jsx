import React from 'react'

import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { debounce } from 'lodash';

function PlaceCardItem({place}) {

  const [photoUrl,SetPhotoUrl]=useState();
  useEffect(()=>{
    if (place) {
        const debouncedGetPhoto = debounce(GetPlacePhoto, 1000);
        debouncedGetPhoto();
        return () => debouncedGetPhoto.cancel();
    }
}, [place]);
  
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:place.placeName
      }
      const result=await GetPlaceDetails(data).then(resp=>{
        console.log(resp.data.places[0].photos[4].name);
  

        const photos = resp?.data?.places?.[0]?.photos;
        const PhotoUrl = photos && photos.length > 3 ? 
            PHOTO_REF_URL.replace('{NAME}', photos[3].name) : 
            "/placeholder.jpg"; // Use default image if no photo
        SetPhotoUrl(PhotoUrl);

        {/*const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        SetPhotoUrl(PhotoUrl);
        console.log("...............................  "+PhotoUrl);*/}
        
      })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeName+place?.PlaceAddress} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='w-[130px] h-[130px] rounded-xl object-cover' />
    
        <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-700'>{place.PlaceDetails}</p>
        <h2 className='mt-2'>🕙{place.timeToTravel}</h2>
        
        {/*
        import { FaMapLocationDot } from "react-icons/fa6";
        <Button size="sm"><FaMapLocationDot /></Button>
        */}
        
        </div>
    
    </div>
    </Link>
  )
}

export default PlaceCardItem

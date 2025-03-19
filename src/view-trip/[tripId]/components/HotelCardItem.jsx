import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { debounce } from 'lodash';

function HotelCardItem({hotel }) {

     const [photoUrl,SetPhotoUrl]=useState();
     useEffect(()=>{
      if (hotel) {
          const debouncedGetPhoto = debounce(GetPlacePhoto, 1000);
          debouncedGetPhoto();
          return () => debouncedGetPhoto.cancel();
      }
  }, [hotel]);
  
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:hotel?.HotelName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[4].name);
          
          const photos = resp?.data?.places?.[0]?.photos;
          const PhotoUrl = photos && photos.length > 3 ? 
              PHOTO_REF_URL.replace('{NAME}', photos[3].name) : 
              "/placeholder.jpg"; // Use default image if no photo
          SetPhotoUrl(PhotoUrl);

          {/*const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          SetPhotoUrl(PhotoUrl);*/}
          console.log(PhotoUrl);
        })
      }

      

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.HotelAddress+","+hotel?.HotelName} target='_blank'>
    <div className='hover:scale-105 transition-all cursor-pointer'>
        <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='rounded-xl h-[180px] w-full object-cover'/>
    
        <div className='my-2 flex flex-col gap-2'>
            
            <h2 className='font-medium'>{hotel?.HotelName}</h2>
            <h2 className='text-xs text-gray-500'>📍{hotel?.HotelAddress}</h2>
            <h2 className="text-sm">
              {/^(from\s)?(\$|RS\s|₹)\d+(\/night)?$/i.test(hotel?.Price) ? hotel?.Price : "Price not available"}
            </h2>
            <h2 className='text-sm'>⭐{hotel?.rating}</h2>
        </div>
    </div>
    </Link>
  )
}

export default HotelCardItem

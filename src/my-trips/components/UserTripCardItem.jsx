import React from 'react'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';
function UserTripCardItem({trip}) {

    const [photoUrl,SetPhotoUrl]=useState();
      useEffect(()=>{
        trip&&GetPlacePhoto();
      },[trip])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[4].name);
    
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          SetPhotoUrl(PhotoUrl);
          console.log(PhotoUrl);
          console.log(trip?.userSelection?.location?.label);
        })
      }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt={trip?.userSelection?.location?.label } 
      className="h-[220px] w-full object-cover rounded-xl"  />

        <div className='my-5'>

            <h2 className='font-bold text-lg'>
                {trip?.userSelection?.location?.label}
            </h2>
            <h2 className='text-sm text-gray-500'>
                {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget.
            </h2>
        </div>
    
    </div>
    </Link>
  )
}

export default UserTripCardItem

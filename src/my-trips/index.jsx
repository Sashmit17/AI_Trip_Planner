import React, { useState,useEffect } from 'react'
import { useNavigation } from 'react-router-dom';
import { getDocs,collection,query,where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
function MyTrips() {

    const navigation=useNavigation();
    const [userTrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])

    /**
     * Used to Get All User Trips
     * @returns 
     */
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }
        
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
    
        const querySnapshot = await getDocs(q);
            setUserTrips([]);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
            });
    }

  return (
    <div className='max-w-3xl mx-auto px-6 mt-16'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        { userTrips?.length>0?userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip}/>
        )):[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

            </div>
        ))}
      </div>
    </div>
  )
}

export default MyTrips

import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
    <h2 className='font-bold text-lg my-3'>Places to Visit</h2>
   
    {/* Render the itinerary */}
    <div>
      {trip?.tripData?.itinerary ? (
        // Sort the keys (day1, day2, etc.) before mapping
        Object.keys(trip.tripData.itinerary)
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) // Sort keys numerically
          .map((dayKey) => {
            const day = trip.tripData.itinerary[dayKey];
            return (
              <div key={dayKey} className="mt-3">
                <h2 className='font-semibold'>{dayKey.toUpperCase()}</h2>
                <h2 className="font-medium text-lg text-orange-600">Best Time: {day.bestTime}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {day.plan.map((place, index) => (

                    <div key={index} className="my-3">

                     {/* <h2 className="font-medium text-sm text-orange-600">Time to Travel: {place.timeToTravel}</h2>*/}
                      <PlaceCardItem place={place}/> 
                      
                    </div>

))}
                </div>
              </div>
            );
          })
      ) : (
          <p>No itinerary data available.</p>
          )}
    </div>
  </div>
  );
  }
  
  export default PlacesToVisit;
  
  {/*<h2>{place.PlaceName}</h2>
    <img src={place.PlaceImageUrl} alt={place.PlaceName} className='w-32 h-32' />

    <p>{place.PlaceDetails}</p>
    <p>Address: {place.PlaceAddress}</p>
    <p>Ticket Pricing: {place.ticketPricing}</p>

*/}
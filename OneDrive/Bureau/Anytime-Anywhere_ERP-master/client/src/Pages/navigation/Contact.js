import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function Contact() {
  const { isLoaded} = useLoadScript({
    googleMapsApiKey : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,  });
    if( !isLoaded) return <div>Loading ...</div>;
    function Map(){
      return <GoogleMap zoom={10} center={ {lat: 44, lng: -80 }} ></GoogleMap>
    }
  return (
    <Map />
  );
}

export default Contact;

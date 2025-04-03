
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Map container style
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

// Default center position (will be replaced by user's location when available)
const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

interface GoogleMapProps {
  apiKey: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ apiKey }) => {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(pos);
          
          // If the map is already loaded, center it on the user's position
          if (map) {
            map.panTo(pos);
          }
          
          toast.success("Location found successfully");
        },
        () => {
          toast.error("Error: The Geolocation service failed");
        }
      );

      // Watch position for real-time updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(pos);
          
          // If the map is already loaded, center it on the user's position
          if (map) {
            map.panTo(pos);
          }
        },
        () => {
          toast.error("Error: The Geolocation service failed");
        }
      );

      // Clear the watch when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      toast.error("Error: Your browser doesn't support geolocation");
    }
  }, [map]);

  // Store a reference to the Google Map instance
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Clear the reference when the component unmounts
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
      <p>Error loading maps</p>
    </div>;
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2">Loading Maps...</p>
    </div>;
  }

  return (
    <div className="relative rounded-lg overflow-hidden border shadow-sm">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || defaultCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {currentPosition && (
          <Marker
            position={currentPosition}
            title="Your location"
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;

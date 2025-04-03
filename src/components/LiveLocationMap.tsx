
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoogleMapComponent from './GoogleMap';
import { MapPin } from 'lucide-react';

const LiveLocationMap: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from local storage if available
    return localStorage.getItem('google_maps_api_key') || '';
  });
  const [showMap, setShowMap] = useState<boolean>(!!localStorage.getItem('google_maps_api_key'));
  
  const handleSubmitKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('google_maps_api_key', apiKey);
      setShowMap(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Location</h2>
        </div>
      </div>

      {!showMap ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            To use the live location feature, please enter your Google Maps API key below:
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Google Maps API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubmitKey}>
              Submit
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Your API key will be stored locally and not sent to our servers.
          </p>
        </div>
      ) : (
        <GoogleMapComponent apiKey={apiKey} />
      )}
    </div>
  );
};

export default LiveLocationMap;


import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Info, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParkingMap from '@/components/ParkingMap';
import LiveLocationMap from '@/components/LiveLocationMap';

const MapPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Parking Map</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              View and select available parking spots
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <LiveLocationMap />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-4">
            <ParkingMap />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                About This Garage
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Location:</span>
                  123 Parking Avenue, City Center
                </p>
                <p>
                  <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Operating Hours:</span>
                  24/7
                </p>
                <p>
                  <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Total Spaces:</span>
                  120 (Standard & Premium)
                </p>
                <p>
                  <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Security:</span>
                  CCTV monitoring, 24/7 security personnel
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                Garage Amenities
              </h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>✓ Electric Vehicle Charging</p>
                <p>✓ Accessible Parking</p>
                <p>✓ Car Wash Services</p>
                <p>✓ Restrooms</p>
                <p>✓ 24/7 Assistance</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-green-500" />
                Quick Booking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Looking for a spot now? Use quick booking without selecting a specific spot.
              </p>
              <Link to="/book">
                <Button className="w-full">
                  Book Any Available Spot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

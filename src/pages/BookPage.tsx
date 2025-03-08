
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/BookingForm';
import { ArrowLeft, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BookPage = () => {
  const [bookingType, setBookingType] = useState<'standard' | 'premium'>('standard');
  
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book a Parking Spot</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <Tabs defaultValue="standard" onValueChange={(value) => setBookingType(value as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="standard">Standard Parking</TabsTrigger>
                  <TabsTrigger value="premium">Premium Parking</TabsTrigger>
                </TabsList>
                <TabsContent value="standard" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 mb-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Standard Parking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Regular parking spaces suitable for most vehicles. Conveniently located throughout the facility.
                    </p>
                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">$3.00/hour</div>
                  </div>
                </TabsContent>
                <TabsContent value="premium" className="mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 p-4 mb-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Premium Parking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Wider spaces with enhanced security, located closer to entrances and elevators. Includes complementary car wash.
                    </p>
                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">$5.00/hour</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">✓ Prime location ✓ Extra wide spaces ✓ Car wash</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 mb-6">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Need help finding a spot?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Check our interactive parking map to see real-time availability and select your preferred spot.
              </p>
              <Link to="/map">
                <Button variant="outline" className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  View Parking Map
                </Button>
              </Link>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Parking Tips</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2 list-disc pl-5">
                <li>Book in advance for guaranteed availability</li>
                <li>Check your vehicle dimensions for the right spot</li>
                <li>Arrive 10-15 minutes before your booking time</li>
                <li>Keep your booking confirmation handy</li>
              </ul>
            </div>
          </div>
          
          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;


import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Clock, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'completed' | 'failed'>('processing');

  useEffect(() => {
    // Get booking data from location state (passed by BookingForm)
    if (location.state) {
      setBookingData(location.state);
      
      // Simulate payment processing
      const timer = setTimeout(() => {
        // Mock successful payment (in a real app, this would be handled by actual payment gateway)
        setPaymentStatus('completed');
        toast.success('Payment processed successfully!');
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // If no booking data is present, redirect to booking page
      toast.error('No booking information found');
      navigate('/book');
    }
  }, [location.state, navigate]);

  if (!bookingData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/book">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Booking
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Confirmation</h1>
        </div>

        {paymentStatus === 'processing' ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Processing Payment</CardTitle>
              <CardDescription>Please wait while we process your payment...</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        ) : paymentStatus === 'completed' ? (
          <div className="space-y-6">
            <Card className="border-green-500 dark:border-green-700">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-center text-green-700 dark:text-green-400">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-center">
                  Your booking has been confirmed. Please check your email for the receipt.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-semibold text-xl">{bookingData.bookingId}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Booking Reference</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-xl">${bookingData.price}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Parking Spot</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {bookingData.parkingSlot}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Date & Time</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {bookingData.entryDate} at {bookingData.entryTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {bookingData.duration} hour(s)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Payment Method</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {bookingData.paymentMethod === 'credit-card' ? 'Credit Card' : 
                           bookingData.paymentMethod === 'debit-card' ? 'Debit Card' : 
                           bookingData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Arrival'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button className="w-full" onClick={() => navigate('/')}>
                  Return to Home
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                  Print Receipt
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="border-red-500 dark:border-red-700">
            <CardHeader className="bg-red-50 dark:bg-red-900/20">
              <CardTitle className="text-center text-red-700 dark:text-red-400">
                Payment Failed
              </CardTitle>
              <CardDescription className="text-center">
                We couldn't process your payment. Please try again.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/book')}>
                Return to Booking
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;

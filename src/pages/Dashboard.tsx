
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, Car, CalendarDays, CreditCard, History, MapPin, ArrowRight } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { toast } from 'sonner';

interface Booking {
  id: string;
  slot: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  vehicleType: string;
  licensePlate: string;
  startTime: string;
  endTime: string;
  amount: number;
}

const Dashboard = () => {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch user bookings
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockActiveBookings: Booking[] = [
          {
            id: 'BK1234',
            slot: 'P7',
            status: 'active',
            vehicleType: 'sedan',
            licensePlate: 'ABC123',
            startTime: new Date(Date.now() - 3600000).toLocaleString(),
            endTime: new Date(Date.now() + 3600000).toLocaleString(),
            amount: 15.00
          }
        ];
        
        const mockUpcomingBookings: Booking[] = [
          {
            id: 'BK2345',
            slot: 'P12',
            status: 'upcoming',
            vehicleType: 'suv',
            licensePlate: 'XYZ789',
            startTime: new Date(Date.now() + 86400000).toLocaleString(),
            endTime: new Date(Date.now() + 100800000).toLocaleString(),
            amount: 22.50
          }
        ];
        
        const mockBookingHistory: Booking[] = [
          {
            id: 'BK0987',
            slot: 'P3',
            status: 'completed',
            vehicleType: 'sedan',
            licensePlate: 'ABC123',
            startTime: new Date(Date.now() - 604800000).toLocaleString(),
            endTime: new Date(Date.now() - 590000000).toLocaleString(),
            amount: 12.00
          },
          {
            id: 'BK0876',
            slot: 'P9',
            status: 'completed',
            vehicleType: 'sedan',
            licensePlate: 'ABC123',
            startTime: new Date(Date.now() - 1209600000).toLocaleString(),
            endTime: new Date(Date.now() - 1195200000).toLocaleString(),
            amount: 18.00
          },
          {
            id: 'BK0765',
            slot: 'P2',
            status: 'cancelled',
            vehicleType: 'sedan',
            licensePlate: 'ABC123',
            startTime: new Date(Date.now() - 2419200000).toLocaleString(),
            endTime: new Date(Date.now() - 2404800000).toLocaleString(),
            amount: 15.00
          }
        ];
        
        setActiveBookings(mockActiveBookings);
        setUpcomingBookings(mockUpcomingBookings);
        setBookingHistory(mockBookingHistory);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load booking data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleExtendBooking = (bookingId: string) => {
    toast.success(`Extending booking ${bookingId}`);
    // This would open a dialog or redirect to extend booking page
  };
  
  const handleCancelBooking = (bookingId: string) => {
    // In a real app, would send a request to cancel the booking
    toast.success(`Booking ${bookingId} cancelled`);
    
    // Update the state to reflect cancellation
    setUpcomingBookings(prev => 
      prev.filter(booking => booking.id !== bookingId)
    );
    
    setBookingHistory(prev => [
      ...prev,
      {
        ...(upcomingBookings.find(b => b.id === bookingId) as Booking),
        status: 'cancelled'
      }
    ]);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const calculateStats = () => {
    return {
      total: activeBookings.length + upcomingBookings.length + bookingHistory.length,
      active: activeBookings.length,
      upcoming: upcomingBookings.length,
      spent: bookingHistory
        .filter(b => b.status === 'completed')
        .reduce((total, booking) => total + booking.amount, 0)
    };
  };
  
  const stats = calculateStats();
  
  const renderBookingItem = (booking: Booking, type: 'active' | 'upcoming' | 'history') => (
    <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">Slot {booking.slot}</h3>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Booking #{booking.id}</p>
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">${booking.amount.toFixed(2)}</p>
      </div>
      
      <div className="space-y-1 text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Car className="h-4 w-4 mr-2" />
          <span>{booking.vehicleType.charAt(0).toUpperCase() + booking.vehicleType.slice(1)} • {booking.licensePlate}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>From {booking.startTime}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-2" />
          <span>To {booking.endTime}</span>
        </div>
      </div>
      
      {type === 'active' && (
        <div className="mt-4 flex justify-end">
          <Button 
            size="sm" 
            variant="outline" 
            className="mr-2"
            onClick={() => handleExtendBooking(booking.id)}
          >
            Extend Time
          </Button>
          <Link to={`/map?highlight=${booking.slot}`}>
            <Button size="sm">View on Map</Button>
          </Link>
        </div>
      )}
      
      {type === 'upcoming' && (
        <div className="mt-4 flex justify-end">
          <Button 
            size="sm" 
            variant="outline" 
            className="mr-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => handleCancelBooking(booking.id)}
          >
            Cancel
          </Button>
          <Link to={`/booking/${booking.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      )}
    </div>
  );
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.total}
            icon={<BarChart className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatCard
            title="Active Bookings"
            value={stats.active}
            icon={<Clock className="h-6 w-6" />}
          />
          
          <StatCard
            title="Upcoming Bookings"
            value={stats.upcoming}
            icon={<CalendarDays className="h-6 w-6" />}
          />
          
          <StatCard
            title="Total Spent"
            value={`$${stats.spent.toFixed(2)}`}
            icon={<CreditCard className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-muted w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeBookings.length > 0 ? (
              activeBookings.map(booking => renderBookingItem(booking, 'active'))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-xl">No Active Bookings</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You don't have any active parking bookings at the moment.
                  </p>
                  <Link to="/book">
                    <Button>
                      Book a Parking Spot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => renderBookingItem(booking, 'upcoming'))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-xl">No Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You don't have any upcoming parking reservations.
                  </p>
                  <Link to="/book">
                    <Button>
                      Book a Parking Spot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            {bookingHistory.length > 0 ? (
              bookingHistory.map(booking => renderBookingItem(booking, 'history'))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-xl">No Booking History</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your booking history will appear here once you've used our parking services.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

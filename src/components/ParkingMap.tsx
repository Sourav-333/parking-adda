
import { useState, useEffect } from 'react';
import ParkingSlot, { SlotStatus } from './ParkingSlot';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Car, Info, RefreshCw } from 'lucide-react';

interface ParkingSlotData {
  id: string;
  status: SlotStatus;
  position: { x: number; y: number };
  price: number;
  vehicleInfo?: {
    licensePlate?: string;
    entryTime?: string;
    exitTime?: string;
  };
}

// Mock data for the parking slots
const generateMockParkingData = (): ParkingSlotData[] => {
  const statuses: SlotStatus[] = ['available', 'occupied', 'reserved'];
  const slots: ParkingSlotData[] = [];
  
  // Create slots in a grid pattern
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      // Randomly assign status with higher probability for available
      const randomStatus = Math.random() < 0.6 
        ? 'available' 
        : statuses[Math.floor(Math.random() * 3)];
      
      // Calculate position in a grid
      const x = col * 80 + 20;
      const y = row * 80 + 20;
      
      // Generate random price between $2 and $5
      const price = Math.floor(Math.random() * 3) + 2;
      
      // Vehicle info for occupied slots
      const vehicleInfo = randomStatus === 'occupied' || randomStatus === 'reserved'
        ? {
            licensePlate: `ABC${Math.floor(Math.random() * 1000)}`,
            entryTime: new Date(Date.now() - Math.random() * 3600000 * 8).toLocaleTimeString(),
            exitTime: randomStatus === 'reserved' 
              ? new Date(Date.now() + Math.random() * 3600000 * 4).toLocaleTimeString() 
              : undefined
          }
        : undefined;
        
      slots.push({
        id: `P${row * 5 + col + 1}`,
        status: randomStatus,
        position: { x, y },
        price,
        vehicleInfo
      });
    }
  }
  
  return slots;
};

const ParkingMap = () => {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlotData[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setParkingSlots(generateMockParkingData());
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
    toast.success(`Selected parking slot ${slotId}`);
  };
  
  const handleBookSlot = () => {
    if (selectedSlot) {
      // In a real app, this would make an API call
      navigate(`/book?slot=${selectedSlot}`);
    }
  };
  
  const handleRefresh = () => {
    setLoading(true);
    setSelectedSlot(null);
    toast.info("Refreshing parking data...");
    
    // Simulate API call
    setTimeout(() => {
      setParkingSlots(generateMockParkingData());
      setLoading(false);
      toast.success("Parking data updated");
    }, 1000);
  };
  
  const getAvailableCount = () => {
    return parkingSlots.filter(slot => slot.status === 'available').length;
  };
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Car className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Parking Map</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-green-700 dark:text-green-400 font-medium">
              {loading ? '...' : getAvailableCount()} Available
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-1"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <RefreshCw className="h-10 w-10 text-gray-400 animate-spin" />
            <p className="mt-2 text-gray-500">Loading parking data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 mb-4 relative min-h-[400px]">
            <div className="absolute top-4 right-4 flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <Info className="h-3 w-3 mr-1" />
              <span>Click on an available slot to select it</span>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-col space-y-2 bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-500"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-500"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm bg-yellow-100 border border-yellow-500"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">Reserved</span>
              </div>
              {selectedSlot && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-blue-100 border border-blue-500"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Selected</span>
                </div>
              )}
            </div>
            
            {/* Parking layout */}
            <div className="relative" style={{ width: '100%', height: '400px' }}>
              {parkingSlots.map((slot) => (
                <ParkingSlot
                  key={slot.id}
                  id={slot.id}
                  status={selectedSlot === slot.id ? 'selected' : slot.status}
                  position={slot.position}
                  onClick={handleSlotClick}
                  price={slot.price}
                  vehicleInfo={slot.vehicleInfo}
                />
              ))}
            </div>
          </div>
          
          {selectedSlot && (
            <div className="flex justify-end animate-fade-in">
              <Button onClick={handleBookSlot}>
                Book Slot {selectedSlot}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ParkingMap;

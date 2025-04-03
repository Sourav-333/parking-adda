import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowRight, Calendar, Clock, CreditCard } from 'lucide-react';

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedSlot = searchParams.get('slot');
  
  const [formData, setFormData] = useState({
    parkingSlot: preselectedSlot || '',
    vehicleType: '',
    licensePlate: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryTime: '10:00',
    duration: '1',
    paymentMethod: 'credit-card',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const calculatePrice = () => {
    const basePrice = 250; // ₹250 per hour
    const hours = parseInt(formData.duration);
    
    let vehicleMultiplier = 1;
    if (formData.vehicleType === 'suv') vehicleMultiplier = 1.5;
    if (formData.vehicleType === 'truck') vehicleMultiplier = 2;
    
    return (basePrice * hours * vehicleMultiplier).toFixed(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.parkingSlot || !formData.vehicleType || !formData.licensePlate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Booking successful!');
      navigate('/confirmation', { 
        state: { 
          ...formData,
          price: calculatePrice(),
          bookingId: 'BK' + Math.floor(Math.random() * 10000)
        } 
      });
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Book a Parking Spot</CardTitle>
        <CardDescription>
          Complete the form below to reserve your parking space
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parkingSlot">Parking Slot</Label>
            {preselectedSlot ? (
              <div className="flex items-center">
                <Input
                  id="parkingSlot"
                  name="parkingSlot"
                  value={formData.parkingSlot}
                  disabled
                  className="bg-muted"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="ml-2" 
                  onClick={() => navigate('/map')}
                >
                  Change
                </Button>
              </div>
            ) : (
              <Select
                name="parkingSlot"
                value={formData.parkingSlot}
                onValueChange={(value) => handleSelectChange('parkingSlot', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parking slot" />
                </SelectTrigger>
                <SelectContent>
                  {/* This would ideally come from an API with available slots */}
                  <SelectItem value="P1">P1</SelectItem>
                  <SelectItem value="P2">P2</SelectItem>
                  <SelectItem value="P3">P3</SelectItem>
                  <SelectItem value="P5">P5</SelectItem>
                  <SelectItem value="P8">P8</SelectItem>
                  <SelectItem value="P12">P12</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select
              name="vehicleType"
              value={formData.vehicleType}
              onValueChange={(value) => handleSelectChange('vehicleType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV/Crossover</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              name="licensePlate"
              placeholder="Enter your license plate"
              value={formData.licensePlate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entryDate">Entry Date</Label>
              <div className="relative">
                <Calendar className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
                <Input
                  id="entryDate"
                  name="entryDate"
                  type="date"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="entryTime">Entry Time</Label>
              <div className="relative">
                <Clock className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
                <Input
                  id="entryTime"
                  name="entryTime"
                  type="time"
                  value={formData.entryTime}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Parking Duration (hours)</Label>
            <Select
              name="duration"
              value={formData.duration}
              onValueChange={(value) => handleSelectChange('duration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onValueChange={(value) => handleSelectChange('paymentMethod', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="debit-card">Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="cash">Cash on Arrival</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="my-4" />
          
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Base Rate</span>
              <span>₹250.00/hour</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Duration</span>
              <span>{formData.duration} hour(s)</span>
            </div>
            {formData.vehicleType === 'suv' && (
              <div className="flex justify-between text-sm">
                <span>SUV Surcharge</span>
                <span>+50%</span>
              </div>
            )}
            {formData.vehicleType === 'truck' && (
              <div className="flex justify-between text-sm">
                <span>Truck Surcharge</span>
                <span>+100%</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Price</span>
              <span>₹{calculatePrice()}</span>
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Booking'}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;

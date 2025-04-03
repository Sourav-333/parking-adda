import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowRight, Calendar, Clock, CreditCard, QrCode } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

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
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    debitCardNumber: '',
    debitCardExpiry: '',
    debitCardCvv: '',
    debitCardName: '',
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
  
  const validatePaymentDetails = () => {
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardName) {
        toast.error('Please fill all credit card details');
        return false;
      }
    } else if (formData.paymentMethod === 'debit-card') {
      if (!formData.debitCardNumber || !formData.debitCardExpiry || !formData.debitCardCvv || !formData.debitCardName) {
        toast.error('Please fill all debit card details');
        return false;
      }
    }
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.parkingSlot || !formData.vehicleType || !formData.licensePlate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Validate payment details if card payment
    if ((formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && !validatePaymentDetails()) {
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
  
  const renderPaymentDetails = () => {
    switch (formData.paymentMethod) {
      case 'credit-card':
        return (
          <div className="space-y-3 mt-3 p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="Enter name on card"
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="pl-10"
                  maxLength={19}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cardExpiry">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  name="cardCvv"
                  placeholder="XXX"
                  value={formData.cardCvv}
                  onChange={handleInputChange}
                  type="password"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        );
      case 'debit-card':
        return (
          <div className="space-y-3 mt-3 p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
            <div>
              <Label htmlFor="debitCardName">Name on Card</Label>
              <Input
                id="debitCardName"
                name="debitCardName"
                placeholder="Enter name on card"
                value={formData.debitCardName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="debitCardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
                <Input
                  id="debitCardNumber"
                  name="debitCardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={formData.debitCardNumber}
                  onChange={handleInputChange}
                  className="pl-10"
                  maxLength={19}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="debitCardExpiry">Expiry Date</Label>
                <Input
                  id="debitCardExpiry"
                  name="debitCardExpiry"
                  placeholder="MM/YY"
                  value={formData.debitCardExpiry}
                  onChange={handleInputChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="debitCardCvv">CVV</Label>
                <Input
                  id="debitCardCvv"
                  name="debitCardCvv"
                  placeholder="XXX"
                  value={formData.debitCardCvv}
                  onChange={handleInputChange}
                  type="password"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-3">
                <QrCode className="h-4 w-4 mr-2" /> Show UPI QR Code
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Scan QR Code to Pay</AlertDialogTitle>
                <AlertDialogDescription>
                  Scan this QR code with your UPI app to make the payment.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex justify-center p-4">
                <img 
                  src="/lovable-uploads/e84a381d-cbd4-4e25-a2b7-7813baf841f1.png" 
                  alt="UPI QR Code" 
                  className="max-w-[250px] border p-2 rounded-md"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.success('Payment verified!')}>
                  I've made the payment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      case 'cash':
        return (
          <div className="mt-3 p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please pay the amount in cash at the parking facility upon arrival.
            </p>
          </div>
        );
      default:
        return null;
    }
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
              <SelectTrigger className="flex-grow">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="debit-card">Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="cash">Cash on Arrival</SelectItem>
              </SelectContent>
            </Select>
            
            {renderPaymentDetails()}
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

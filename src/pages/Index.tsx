
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Clock, MapPin, ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src="public/lovable-uploads/d458f658-3431-4849-9190-4e79a5300260.png"
            alt="Parking lot"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Smart Parking Management for Modern Drivers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Reserve, track, and manage parking spots with ease. Never worry about parking again.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Parking Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Simplifying Your Parking Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our intelligent parking management system makes parking hassle-free with intuitive features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Real-time Availability</h3>
              <p className="text-gray-600 dark:text-gray-400">
                View available parking spaces in real-time and find the perfect spot for your vehicle.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Effortless Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reserve parking spots in advance, choose entry time, and manage your bookings from anywhere.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Process payments securely through multiple payment options for a worry-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to transform your parking experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of drivers who've simplified their parking with ParkEase.
            </p>
            <Link to="/book">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Parking made simple in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Find a Spot</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through our interactive map to find available parking spaces near your destination.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Book & Pay</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your desired spot, enter vehicle details, choose your duration, and pay securely.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Park & Go</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use your booking confirmation to enter the parking area. Your spot is guaranteed!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Car, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'selected';

interface ParkingSlotProps {
  id: string;
  status: SlotStatus;
  position: { x: number; y: number };
  onClick?: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  price?: number;
  vehicleInfo?: {
    licensePlate?: string;
    entryTime?: string;
    exitTime?: string;
  };
}

const ParkingSlot = ({
  id,
  status,
  position,
  onClick,
  size = 'md',
  price,
  vehicleInfo,
}: ParkingSlotProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-20 h-32',
    lg: 'w-24 h-40',
  };

  const getStatusColor = () => {
    switch (status) {
      case 'available':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'occupied':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'reserved':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'selected':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'available':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'occupied':
        return <Car className="h-5 w-5 text-red-500" />;
      case 'reserved':
        return <Car className="h-5 w-5 text-yellow-500" />;
      case 'selected':
        return <Car className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (status === 'available' && onClick) {
      onClick(id);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`
              relative ${sizeClasses[size]} border-2 rounded-md 
              ${getStatusColor()} 
              ${status === 'available' ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-1 transition-all' : 'cursor-default'}
              flex flex-col items-center justify-center
            `}
            style={{ 
              top: `${position.y}px`, 
              left: `${position.x}px` 
            }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="absolute top-1 left-0 right-0 text-center text-xs font-semibold">
              {id}
            </span>
            
            <div className="mt-2">
              {getStatusIcon()}
            </div>
            
            {price && status === 'available' && (
              <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
                ${price}/hr
              </span>
            )}

            {status === 'available' && isHovered && (
              <Button 
                size="sm" 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs py-0 h-7 animate-fade-in"
                onClick={handleClick}
              >
                Book
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-xs">
            <p className="font-bold mb-1">Spot {id}</p>
            <p>Status: <span className="capitalize">{status}</span></p>
            {price && <p>Price: ${price}/hr</p>}
            {vehicleInfo && vehicleInfo.licensePlate && (
              <>
                <p className="mt-1">License: {vehicleInfo.licensePlate}</p>
                {vehicleInfo.entryTime && <p>Entry: {vehicleInfo.entryTime}</p>}
                {vehicleInfo.exitTime && <p>Exit: {vehicleInfo.exitTime}</p>}
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ParkingSlot;

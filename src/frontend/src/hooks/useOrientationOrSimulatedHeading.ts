import { useState, useEffect } from 'react';

export function useOrientationOrSimulatedHeading() {
  const [heading, setHeading] = useState(0);
  const [simulatedHeading, setSimulatedHeading] = useState(0);
  const [isSimulated, setIsSimulated] = useState(true);

  useEffect(() => {
    // Check for device orientation support
    if (typeof DeviceOrientationEvent === 'undefined') {
      setIsSimulated(true);
      return;
    }

    // Try to use device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setIsSimulated(false);
        setHeading(event.alpha);
      }
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            setIsSimulated(false);
          } else {
            setIsSimulated(true);
          }
        })
        .catch(() => {
          setIsSimulated(true);
        });
    } else {
      // Non-iOS or older browsers
      window.addEventListener('deviceorientation', handleOrientation);
      
      // Fallback to simulated after timeout if no events received
      const timeout = setTimeout(() => {
        setIsSimulated(true);
      }, 1000);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    }
  }, []);

  // Use simulated heading when device orientation unavailable
  useEffect(() => {
    if (isSimulated) {
      setHeading(simulatedHeading);
    }
  }, [isSimulated, simulatedHeading]);

  return {
    heading,
    isSimulated,
    simulatedHeading,
    setSimulatedHeading,
  };
}

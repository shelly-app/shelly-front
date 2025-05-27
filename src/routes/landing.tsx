import { Button } from '@/components/ui/button';
import { useState } from 'react';

const LandingRoute = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Shelly App!</h1>
      <p className="mt-4 text-lg">
        This is the landing page of our application.
      </p>
      <p className="mt-4 text-lg">Current Counter: {counter}</p>
      <Button
        className="mt-6 cursor-pointer"
        onClick={() => {
          // Handle button click
          setCounter((prev) => prev + 1);
        }}
      >
        Click Me
      </Button>
    </div>
  );
};

export default LandingRoute;

import { Button } from '@/components/ui/button';

const LandingRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Shelly App!</h1>
      <p className="mt-4 text-lg">
        This is the landing page of our application.
      </p>
      <Button
        className="mt-6 cursor-pointer"
        onClick={() => {
          // Handle button click
          console.log('Button clicked!');
        }}
      >
        Click Me
      </Button>
    </div>
  );
};

export default LandingRoute;

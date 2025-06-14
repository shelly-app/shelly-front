import { Link } from 'react-router';
import { paths } from '@/config/paths';
import { NavigationLayout } from '@/components/layouts/navigation-layout';

export const NotFoundRoute = () => {
  return (
    <NavigationLayout>
      <div className="flex h-full w-full flex-col items-center justify-center font-semibold">
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to={paths.home.getHref()} replace>
          Go to Home
        </Link>
      </div>
    </NavigationLayout>
  );
};

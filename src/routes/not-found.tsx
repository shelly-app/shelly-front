import { Link } from 'react-router';
import { paths } from '@/config/paths';
import { NavigationLayout } from '@/components/layouts/navigation-layout';

export const NotFoundRoute = () => {
  return (
    <NavigationLayout>
      <div className="flex h-full w-full flex-col items-center justify-center font-semibold">
        <h1>404 - No encontrado</h1>
        <p>Perdón, la página que estás buscando no existe.</p>
        <Link to={paths.home.getHref()} replace>
          Ir al inicio
        </Link>
      </div>
    </NavigationLayout>
  );
};

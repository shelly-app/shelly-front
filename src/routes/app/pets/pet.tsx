import { useParams } from 'react-router';

const PetRoute = () => {
  const params = useParams();
  const petId = params.petId as string;
  return (
    <h1>
      <strong>Pet Id:</strong>
      {petId}
    </h1>
  );
};

export default PetRoute;

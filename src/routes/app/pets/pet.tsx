import { useParams } from 'react-router';

export const PetRoute = () => {
  const params = useParams();
  const petId = params.petId as string;
  return (
    <h1>
      <strong>Pet Id:</strong>
      {petId}
    </h1>
  );
};

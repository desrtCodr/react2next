import { useRouter } from 'next/router';
import Results from '../components/Results';

const withSearchParams = () => {
  const router = useRouter();
  const { searchParams } = router.query;

  return <Results router={{ searchParams }} />;
};

export default withSearchParams;

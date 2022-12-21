import * as React from 'react';
import { useRouter } from 'next/router';

export default function withSearchParams(Component) {
  return function ComponentWithSearchParams(props) {
    const router = useRouter();
    const { playerOne, playerTwo } = router.query;
    const query = router.query;

    return (
      <>
        <Component {...props} router={query} />
      </>
    );
  };
}

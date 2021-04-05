import { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';

function Index({ children }: any) {
  const location = useLocation();

  useEffect(
    () => {
      window.scroll(0, 0);
    },
    [location.pathname]);

  return children;
}

export default withRouter(Index);

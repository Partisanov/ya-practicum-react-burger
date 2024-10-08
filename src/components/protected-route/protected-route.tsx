import { Navigate, useLocation } from 'react-router-dom';
import { Pages } from '../../utils/constants.ts';
import { useSelector } from '../../hooks/redux.ts';
import React from 'react';

interface IProtectedRoute {
  children: JSX.Element;
  forAnonymous?: boolean;
  redirectPath?: Pages;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  forAnonymous = false,
  redirectPath,
}) => {
  const location = useLocation();

  const { isLogIn } = useSelector((state) => state.auth);
  const from = location.state?.from || '/';

  if (forAnonymous && isLogIn) {
    return <Navigate to={redirectPath || from} />;
  }

  if (!forAnonymous && !isLogIn) {
    return (
      <Navigate
        to={redirectPath || Pages.login}
        state={{ from: location }}
      />
    );
  }

  return children;
};

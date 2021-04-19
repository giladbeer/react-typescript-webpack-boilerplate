import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';

export const App: React.FC = () => {
  return (
    <div className="router">
      <Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
    </div>
  );
};

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { React } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';

export const UserLayout = ({ loggedIn, setLoggedIn, children }) => {
  return (
    <Fragment>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {children}
      <Footer />
    </Fragment>
  );
};

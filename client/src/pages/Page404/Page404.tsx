import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/Wrapper';
import { PATH } from '../../constants/common.dictionary';
import { Header } from '../../components/Header';

export function Page404() {
  return (
    <Wrapper>
      <Header />
      <main>
        <h1>The Crawler - The school</h1>
        <h2>404 Error Page</h2>
        <h2>Oops... something went wrong...</h2>
        <h2>This page not found</h2>
        <Link to={PATH.HOME}>
          {'<--HOME-->'}
        </Link>
      </main>
      <footer>Footer</footer>
    </Wrapper>
  );
}

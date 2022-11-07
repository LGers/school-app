import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/Wrapper';
import { PATH } from '../../constants/common.dictionary';

export function Main() {
  return (
    <Wrapper>
      <header><p>Header</p></header>
      <main>
        <h1>The Crawler - The school</h1>
        <h2>Main Page</h2>
        <Link to={PATH.SIGN_UP}> Sign Up</Link>
        <Link to={PATH.SIGN_IN}> Sign In</Link>
        <Link to={PATH.RESTORE_PASSWORD}>Restore Password</Link>
      </main>
      <footer>Footer</footer>
    </Wrapper>
  );
}

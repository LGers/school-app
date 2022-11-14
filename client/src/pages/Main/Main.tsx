import React from 'react';
import { Header } from '../../components/Header';
import { Wrapper } from '../../components/Wrapper';

export function Main() {
  return (
    <Wrapper>
      <Header />
      <main>
        <h1>The Crawler - The school</h1>
        <h2>Main Page</h2>
      </main>
      <footer>Footer</footer>
    </Wrapper>
  );
}

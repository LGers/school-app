import * as React from 'react';
import s from './ContentWrapper.module.scss';
import { Props } from './ContentWrapper.types';
import { Wrapper } from '../Wrapper';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ContentWrapper({ children }: Props) {
  return (
    <Wrapper>
      <div className={s.contentWrapper}>
        <Header />
        <main className={s.contentWrapperMain}>
          <div className={s.contentWrapperContent}>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Wrapper>
  );
}

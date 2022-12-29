import * as React from 'react';
import s from './UserWrapper.module.scss';
import { Props } from './UserWrapper.types';
import { Wrapper } from '../Wrapper';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function UserWrapper({ children }: Props) {
  return (
    <Wrapper>
      <div className={s.userWrapper}>
        <Header />
        <main className={s.userWrapperMain}>
          <div className={s.userWrapperContent}>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Wrapper>
  );
}

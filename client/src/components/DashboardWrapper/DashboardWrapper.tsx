import * as React from 'react';
import s from './DashboardWrapper.module.scss';
import { Props } from './DashboardWrapper.types';
import { Wrapper } from '../Wrapper';
import { Header } from '../Header';
import { DashboardMenu } from '../DashboardMenu';
import { Footer } from '../Footer';

export function DashboardWrapper({ children }: Props) {
  return (
    <Wrapper>
      <div className={s.dashboardWrapper}>
        <Header />
        <main className={s.dashboardWrapperMain}>
          <DashboardMenu currentPage="classes" />
          <div className={s.dashboardWrapperContent}>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Wrapper>
  );
}

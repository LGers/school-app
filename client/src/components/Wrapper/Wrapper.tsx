import React from 'react';
import s from './Wrapper.module.scss';

type Props = {
  children: JSX.Element[] | JSX.Element
};

export function Wrapper({ children } : Props) {
  return (
    <div className={s.wrapper}>
      {children}
    </div>
  );
}

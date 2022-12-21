import * as React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardWrapper } from '../../components/DashboardWrapper';
import { DashboardTitle } from '../../components/DashboardTitle';

export function OneClass() {
  const { id } = useParams();

  return (
    <DashboardWrapper currentPage="classes">
      <DashboardTitle title={`Class id: ${id}`} />
    </DashboardWrapper>
  );
}

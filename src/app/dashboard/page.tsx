'use client';

import DashboardSummary from '@/components/DashboardSummary'
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

function DashboardPage() {

    const { transactions } = useSelector(
        (store: RootState) => store.TransactionReducer
      );

  return (
    <div className='mt-20 px-10'>
      <h1>Dashboard</h1>
      <DashboardSummary transactions={transactions}/>
    </div>
  )
}

export default DashboardPage

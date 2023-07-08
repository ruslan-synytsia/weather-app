import { MainLayout } from './layouts/mainLayout'
import { useSelector } from 'react-redux'
import { Preloader } from './components/preloader/preloader'

import React, { useEffect, useState } from 'react';

export const App = () => {
  const fetching = useSelector(state => state.weatherData.isFetching);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    let timeout

    if (fetching) {
      setShowPreloader(true)
    }
    
    if (!fetching) {
      timeout = setTimeout(() => {
        setShowPreloader(false)
      }, 500)
    }

    return () => {
      clearTimeout(timeout)
    };
  }, [fetching])

  return (
    <>
      {showPreloader && <Preloader />}
      <MainLayout />
    </>
  );
};
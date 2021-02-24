import React ,{ useState,useEffect }from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import InputScreen from './Screen/InputScreen/InputScreen';

const App = () => {





  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <InputScreen />
    </ApplicationProvider>
  )
}

export default App;

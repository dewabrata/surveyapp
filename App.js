import React ,{ useState,useEffect }from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import InputScreen from './Screen/InputScreen/InputScreen';
import UpdateScreen from './Screen/UpdateScreen/UpdateScreen';

const App = () => {





  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <UpdateScreen />
    </ApplicationProvider>
  )
}

export default App;

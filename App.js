import React ,{ useState,useEffect }from 'react'
import * as eva from '@eva-design/eva';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import InputScreen from './Screen/InputScreen/InputScreen';
import UpdateScreen from './Screen/UpdateScreen/UpdateScreen';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const App = () => {





  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
    </ApplicationProvider>
    </>
  )
}

export default App;

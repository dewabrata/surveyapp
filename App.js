import React ,{ useState,useEffect }from 'react'
import * as eva from '@eva-design/eva';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import InputScreen from './Screen/InputScreen/InputScreen';
import UpdateScreen from './Screen/UpdateScreen/UpdateScreen';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {





  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainPage">
          <Stack.Screen name="MainPage" component={HomeScreen}/>
          <Stack.Screen name="UpdateScreen" component={UpdateScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </>
  )
}

export default App;

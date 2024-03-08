/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ToDoScreen from './src/screens/ToDoScreen';
import AppScreen from './src/screens/AppScreen';
import DebugWrapper from './src/wrapper/DebugWrapper';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  ToDo: undefined;
};

function App(): React.JSX.Element {
  return (
    <DebugWrapper>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={AppScreen} />
          <Stack.Screen name="ToDo" component={ToDoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DebugWrapper>
  );
}

export default App;

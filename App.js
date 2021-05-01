import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Registro from './components/Registro';
import Home from './components/Home';
const Stack = createStackNavigator();

import { Card } from 'react-native-paper';

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator>
  
        <Stack.Screen name='Entrar' component={Login}
           options={{
          title: 'Entrarr',
          headerStyle: {
            backgroundColor: '#54d0e4cf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
       /
        >
       <Stack.Screen name="Registre-se" component={Registro} 
       options={{
          title: 'Registre-se',
          headerStyle: {
            backgroundColor: '#54d0e4cf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
       />
         <Stack.Screen name="Minha agenda" component={Home} 
          options={{
          title: 'Minha agenda',
          headerStyle: {
            backgroundColor: '#54d0e4cf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
         /> 
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  
});
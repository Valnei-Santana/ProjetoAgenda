import * as React from 'react';
import { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Registro from './components/Registro';
import Home from './components/Home';
const Stack = createStackNavigator();
import MyContext from './contexts/MyContext'
import { Card } from 'react-native-paper';

export default function App() {

const[email, setEmail] = useState('')
const[password, setPassword] = useState('')
  return (
   <NavigationContainer>
   <MyContext.Provider value={{email, setEmail, password, setPassword}}>
      <Stack.Navigator>
        <Stack.Screen name='Entrar' component={Login}
           options={{
          title: 'Entrar',
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
    </MyContext.Provider>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  
});

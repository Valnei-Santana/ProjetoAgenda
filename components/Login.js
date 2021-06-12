import * as React from 'react';
import {useState, useContext} from 'react';
import { ImageBackground, Text, View, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements'
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import firebase from './../firebase';
import errorTranslate from './Translate'
import MyContext from './../contexts/MyContext'

export default function Login({navigation}) {
  const image = { uri: "https://cdn2.vectorstock.com/i/1000x1000/82/26/background-time-clock-calendar-idea-vector-24348226.jpg" };
  const {email, setEmail, password, setPassword} = useContext(MyContext)
  const [erro, setErro] = useState('')
    function navegarSucess(){
        navigation.navigate('Minha agenda')
    }
   
    function register(){
        navigation.navigate('Registre-se')
    }
  const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }
    const onChangePassword = (txtPassword) =>{
        setPassword(txtPassword)
    }

  const login = () =>{
 
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            navegarSucess()
        }).catch((error)=>{
            setErro(errorTranslate(error.code))
        })
  
    }
  return (
    <View style={styles.container}>
     <ImageBackground source={image} style={styles.image}>
    <Text style={styles.paragraph}>
        Entre e/ou registre-se!
    </Text>
     <Text style={styles.erro}>
     {erro}
     </Text>
    <TextInput
         mode='outlined'
      label="Email"
      value={email}
      onChangeText={txtEmail => onChangeEmail(txtEmail)}
    />
    <TextInput
         mode='outlined'
      label="Senha"
      value={password}
      secureTextEntry={true}
      onChangeText={txtPassword => onChangePassword(txtPassword)}
    />
    <View style={styles.buttonFix}>
     <Button
     containerStyle={styles.button}
  title="Entrar"
   onPress={login}
/>
<Button
containerStyle={styles.button}
 
onPress={register}
  title="Registre-se"
/>
  </View>
   </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
   buttonFix: {
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row'
  },
   button: {
  padding: 10
  
   },
  container: {
    flex: 1,
    flexDirection: "column"
  },
   erro: {
    color: '#d63939'
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 1
  },
 image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingTop: 0,
    padding: 10,
    opacity: 0.7
  }
});

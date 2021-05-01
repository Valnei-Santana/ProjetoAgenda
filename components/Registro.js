import * as React from 'react';
import {useState} from 'react';
import { ImageBackground, Text, View, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements'
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import firebase from './../firebase';
import errorTranslate from './Translate';

export default function Registro({navigation}) {
  const image = { uri: "https://cdn2.vectorstock.com/i/1000x1000/82/26/background-time-clock-calendar-idea-vector-24348226.jpg" };
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
    function navegarSucess(){
        navigation.navigate('Minha agenda')
    }
   
 const onChangeNome = (txtNome) => {
        setNome(txtNome)
    }
  const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }
    const onChangePassword = (txtPassword) =>{
        setPassword(txtPassword)
    }

  const Cadastration = () => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
             firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
               firebase.auth().currentUser.updateProfile({
  displayName: nome
}).then(function() {
  // Update successful.
}).catch(function(error) {
   setErro(errorTranslate(error.code))
});
            navegarSucess()
        }).catch((error)=>{
             setErro(errorTranslate(error.code))
        })
        }).catch((error)=>{
     setErro(errorTranslate(error.code))
        })
    }
  return (
    <View style={styles.container}>
     <ImageBackground source={image} style={styles.image}>
    <Text style={styles.paragraph}>
        Registre-se!
    </Text>
     <Text style={styles.erro}>
     {erro}
     </Text>
      <TextInput
         mode='outlined'
      label="Nome completo"
      value={nome}
      onChangeText={txtNome => onChangeNome(txtNome)}
    />
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
  title="Voltar"
   onPress={navigation.navigate('Entrar')}
/>
<Button
containerStyle={styles.button}
 
onPress={Cadastration}
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
    flexDirection: 'row',
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

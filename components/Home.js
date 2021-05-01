import React, { useState, useEffect} from 'react';
import { StyleSheet ,Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import firebase from './../firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, FontAwesome, Feather, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ListItem, Avatar, Input, Button, Overlay } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import errorTranslate from './Translate'
import AddHorario from './AddHorario'
import HorariosList from './Horarios'
import AlarmeList from './Alarmes'


function Horarios({navigation}) {

 const [diaSemana, setDiaSemana] = useState(false);
 const [horario, setHorario] = useState(false);
 const [isAddHorarioModalOpen, setIsAddHorarioModalOpen] = useState(false)
 const [clientes, setClientes] = useState([{}])

 function addHorarioTipo(dia) {
   setIsAddHorarioModalOpen(!isAddHorarioModalOpen)
   setDiaSemana(dia)
 }
 const toggleAddHorario = () => {
    setIsAddHorarioModalOpen(!isAddHorarioModalOpen)
  }

 
 const Lista = () => {
  return (
    <View>
  <Text style={Style.data}>Segunda-feira <TouchableOpacity onPress={() => addHorarioTipo('Segunda')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> <HorariosList diaSemana='Segunda' />

  <Text style={Style.data}>Terça-feira <TouchableOpacity onPress={() => addHorarioTipo('Terça')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text>
   <HorariosList diaSemana='Terça' />

   <Text style={Style.data}>Quarta-feira <TouchableOpacity onPress={() => addHorarioTipo('Quarta')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> 
   <HorariosList diaSemana='Quarta' />

  <Text style={Style.data}>Quinta-feira <TouchableOpacity onPress={() => addHorarioTipo('Quinta')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> 
   <HorariosList diaSemana='Quinta' />
   
 <Text style={Style.data}>Sexta-feira <TouchableOpacity onPress={() => addHorarioTipo('Sexta')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> 
   <HorariosList diaSemana='Sexta' />

 <Text style={Style.data}>Sábado <TouchableOpacity onPress={() => addHorarioTipo('Sábado')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> 
   <HorariosList diaSemana='Sábado' />

  <Text style={Style.data}>Domingo <TouchableOpacity onPress={() => addHorarioTipo('Domingo')}><Feather name="plus-circle" size={14} color="black" /></TouchableOpacity></Text> 
   <HorariosList diaSemana='Domingo' /></View>
  );
}
  
  
 var userid = firebase.auth().currentUser.uid;

  return (
  <ScrollView>
    <View>
    {isAddHorarioModalOpen ?
    <AddHorario 
            isOpen={isAddHorarioModalOpen}
            diaSemana={diaSemana}
            closeModal={toggleAddHorario}
          //  addCliente={addCliente}
          />: <Lista />}
</View>
 </ScrollView>
  );
}

function Perfil({navigation}) {
  var user = firebase.auth().currentUser;
  const [success, setSuccess] = useState('')
   const [erro, setErro] = useState('')
  const [email, setEmail] = useState(user.email)
  const [nome, setNome] = useState(user.displayName)
  const [password, setPassword] = useState('')
  const onChangeNome = (txtNome) => {
        setNome(txtNome)
    }
 const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }
    const onChangePassword = (txtPassword) =>{
        setPassword(txtPassword)
    }
   
const changeInfos = () => {
  setErro('')
  setSuccess('')
    user.updateEmail(email).then(function() {
  user.updateProfile({
  displayName: nome
}).then(function() {
  setSuccess('Informações salvas com sucesso!')
}).catch(function(error) {
  setErro(errorTranslate(error.code))
});
}).catch(function(error) {
   setErro(errorTranslate(error.code))
});
}

const changePassword = () => {
  user.updatePassword(password).then(function() {
  setSuccess('Senha alterada com sucesso!')
}).catch(function(error) {
    setErro(errorTranslate(error.code))
});
}

const confirmDelet = () => {
 user.delete().then(function() {
 navigation.navigate('Entrar')
}).catch(function(error) {
  setErro(errorTranslate(error.code))
});
}

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  }
  return ( <ScrollView>
    <View style={Style.data}>
    <Text style={Style.coluna}>Minhas Informações</Text>
     <Text style={Style.erro}>
     {erro}
     </Text>
      <Text style={Style.success}>
     {success}
     </Text>
    <View>
    <TextInput
         mode='outlined'
      label="Nome completo"
      style={Style.input}
      value={nome}
      onChangeText={txtNome => onChangeNome(txtNome)}
    />
    <TextInput
         mode='outlined'
      label="Email"
      style={Style.input}
      value={email}
      onChangeText={txtEmail => onChangeEmail(txtEmail)}
    />
    <TextInput
         mode='outlined'
      label="Código de Segurança"
      style={Style.input}
      value={user.uid}
      disabled
    />
        <Button
  title="Salvar"
   onPress={changeInfos}
/>
    </View>
     <Text style={Style.coluna}>Alterar senha</Text>
    <View>
   
    <TextInput
         mode='outlined'
      label="Senha nova"
      style={Style.input}
     value={password}
      secureTextEntry={true}
      onChangeText={txtPassword => onChangePassword(txtPassword)}
      
    />
        <Button
  title="Alterar"
   onPress={toggleOverlay}
/>
        <TouchableOpacity onPress={toggleOverlay}>
     <Text style={Style.deleteAccount}>Apagar minha conta</Text>
       </TouchableOpacity>
         {visible ? 
    <Overlay isVisible={false} onBackdropPress={toggleOverlay}>
        <Text>Confirme se deseja apagar sua conta</Text>
         <View style={Style.buttonFix}>
      <Button
  title="Cancelar"
   onPress={toggleOverlay}
   containerStyle={Style.button}
/>  <Button
  title="Confirmar"
  containerStyle={Style.button}
   onPress={confirmDelet}
/>
      </View>
    </Overlay>: null }
    </View>
   
</View>
     </ScrollView>
  );
}
export default function Home({navigation}){


 var user = firebase.auth().currentUser;

 const Tab = createBottomTabNavigator(); 
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="Meus horários" component={Horarios} 
      options={{
          tabBarLabel: 'Meus horários',
          tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen name="Alarmes" component={AlarmeList}
       options={{
          tabBarLabel: 'Alarmes',
          tabBarIcon: ({ color, size }) => (
             <Fontisto name="stopwatch" size={size} color={color} />
          ),
       }}
       />
    <Tab.Screen name="Meu Perfil" component={Perfil}
       options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => (
             <FontAwesome name="gear" size={size} color={color} />
          ),
       }}
       />
    </Tab.Navigator>
  )
 }
 
 const Style = StyleSheet.create({
data:{
 padding:15
},
 success: {
    color: '#56bb4f'
  },
 erro: {
    color: '#d63939'
  },
input:{
 marginBottom: 5
},
deleteAccount:{
alignSelf: 'center',
padding: 5,
paddingTop: 20,
fontWeight: 'bold',
color: '#dc3545'
},
 button: {
  padding: 10
  
   },
coluna:{
alignSelf: 'center',
padding: 5,
fontWeight: 'bold'
},
    buttonDelete: {
    backgroundColor: '#dc3545',
   borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    padding: 2
    },
     buttonEdit: {
    backgroundColor: '#3ebb4d',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    padding: 4
    },
     buttonAlarm: {
    backgroundColor: '#17a2b8',
    padding: 4
    },
 buttonFix: {
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row'
  },
    action: {
      
     padding: 0,
      position: 'absolute', 
      right: 0,
      alignSelf: 'center',
       flexDirection: 'row',
     
    }
})
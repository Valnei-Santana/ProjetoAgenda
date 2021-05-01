import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  FlatList
} from 'react-native';
import { TextInput } from 'react-native-paper';
import TimePicker from 'react-native-simple-time-picker';
import { Fontisto, FontAwesome, Feather, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ListItem, Avatar, Input, Button, Overlay } from 'react-native-elements';
import firebase from './../firebase';
import { Snackbar } from 'react-native-paper';
import EditHorario from './EditHorario'

const Horarios = (props) => {
   var userid = firebase.auth().currentUser.uid;
     const { isOpen, closeModal, diaSemana } = props;
    const [data, setData] = useState('');
      const [key, setKey] = useState('');
    const [visible, setVisible] = React.useState(false);

 
     const deleteHorario = (key) =>
  {
     firebase.firestore().collection('horarios').doc(key).delete();
  }

   const definirAlarme = (key) =>
  {
     firebase.firestore().collection('horarios').doc(key).update({alarme: true});
  }
    const editHorario = (txtKey) =>
  {
    setVisible(!visible)
    setKey(txtKey)
  }
  useEffect(()=>{
        let ref = firebase.firestore().collection('horarios').where("userId", "==",userid).where("diaSemana", "==", diaSemana).onSnapshot(querySnapshot =>{
        const data = []
        querySnapshot.forEach(doc =>{
          data.push({
            ...doc.data(),
               key:doc.id
          })
        })
          setData(data)
      })
        return () => ref()
        
    }, [])
 const Items = () =>
 {
  return (
     <FlatList
          data={data}
          renderItem={({item}) => (
             <View>
            <ListItem bottomDivider>
        <Avatar rounded source={{uri: 'https://image.freepik.com/vetores-gratis/calendario-ou-agenda-icone-plana-dos-desenhos-animados-simbolo-isolado_101884-760.jpg'}} />
        <ListItem.Content>
          <ListItem.Title>{item.titulo}</ListItem.Title>
           <ListItem.Subtitle>{item.professor}</ListItem.Subtitle>
          <ListItem.Subtitle>Horário: {item.inicio} às {item.fim}</ListItem.Subtitle>
          <View style={Style.action}>
     <TouchableOpacity style={Style.buttonEdit} onPress={() => editHorario(item.key)}> <Entypo name="edit" size={20} color="#FFF" />  </TouchableOpacity>  <TouchableOpacity style={Style.buttonAlarm} onPress={() => definirAlarme(item.key)}><Fontisto name="stopwatch" size={20} color='#FFF' />
      </TouchableOpacity>
      <TouchableOpacity style={Style.buttonDelete} onPress={() => deleteHorario(item.key)}><MaterialIcons name="delete" size={24} color="#FFF" /> </TouchableOpacity>
      </View>
        </ListItem.Content>
      </ListItem>
    </View>
        )}
        />
  )
 }
  return (
 <View>
 {visible ?
    <EditHorario closeModal={editHorario} chave={key} />: <Items />}
      </View>
  );
};

const Style = StyleSheet.create({

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
    padding: 4,
    paddingRight: 6,
    paddingLeft: 6
    },
 
    action: {
      
     padding: 0,
      position: 'absolute', 
      right: 0,
      alignSelf: 'center',
       flexDirection: 'row',
     
    }
});

export default Horarios;

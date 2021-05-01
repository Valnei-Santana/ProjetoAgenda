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
import { firestore } from 'firebase';
import { Snackbar } from 'react-native-paper';

const Alarmes = (props) => {
   var userid = firebase.auth().currentUser.uid;
     const { isOpen, closeModal, diaSemana } = props;
    const [data, setData] = useState('');
    const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
     const deleteHorario = (key) =>
  {
     firebase.firestore().collection('horarios').doc(key).delete();
  }
  useEffect(()=>{
        let ref = firebase.firestore().collection('horarios').where("userId", "==",userid).where("alarme", "==", true).onSnapshot(querySnapshot =>{
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

  return (
  <FlatList
          data={data}
          renderItem={({item}) => (
             <View>
            <ListItem bottomDivider>
        <Avatar rounded source={{uri: 'http://cdn5.colorir.com/desenhos/color/201846/relogio-velho-a-casa-1499829.jpg'}} />
        <ListItem.Content>
          <ListItem.Title>{item.titulo} ({item.diaSemana})</ListItem.Title>
           <ListItem.Subtitle>{item.professor}</ListItem.Subtitle>
          <ListItem.Subtitle>Horário: {item.inicio} às {item.fim}</ListItem.Subtitle>
          <View style={Style.action}>
      <TouchableOpacity style={Style.buttonDelete} onPress={() => deleteHorario(item.key)}><MaterialIcons name="delete" size={24} color="#FFF" /> </TouchableOpacity>
      </View>
        </ListItem.Content>
      </ListItem>
    </View>
          )}
        />
  );
};

const Style = StyleSheet.create({

    buttonDelete: {
    backgroundColor: '#dc3545',
   borderRadius: 4,
    padding: 2
    },
    action: {
      
     padding: 0,
      position: 'absolute', 
      right: 0,
      alignSelf: 'center',
       flexDirection: 'row',
     
    }
});

export default Alarmes;

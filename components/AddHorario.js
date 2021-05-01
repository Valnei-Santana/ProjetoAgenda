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
import firebase from './../firebase';
import { firestore } from 'firebase';
import { Button } from 'react-native-elements'

const AddHorario = (props) => {
   var userid = firebase.auth().currentUser.uid;
     const { isOpen, closeModal, diaSemana } = props;
  const [data, setData] = useState('')
    const [fim, setFim] = useState('')
    const [inicio, setInicio] = useState('')
    const [professor, setProfessor] = useState('')
    const [titulo, setTitulo] = useState('')

     const InsertProduto = () => {
        firebase.firestore().collection('horarios').add({
    diaSemana: diaSemana,
    fim: fim,
    inicio: inicio,
    professor: selectedValue+' '+professor,
    titulo: titulo,
    userId: userid,
    alarme: false
  });
    }

 
  const [selectedValue, setSelectedValue] = useState("Professor");

   const onChangeTitulo = (txtTitulo) => {
        setTitulo(txtTitulo)
    }
    const onChangeFim = (txtFim) => {
        setFim(txtFim)
    }
    const onChangeInicio = (txtInicio) => {
        setInicio(txtInicio)
    }
    const onChangeProfessor = (txtProfessor) => {
        setProfessor(txtProfessor)
    }

 

  return (
    <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
      <View style={styles.container}>
      
        <Text style={styles.coluna}>Adicionar horário ({diaSemana})</Text>
        <TextInput
          mode="outlined"
          label="Titulo"
          onChangeText={txtTitulo => onChangeTitulo(txtTitulo)}
        />
        <View style={styles.fixInput}>
<Picker
        selectedValue={selectedValue}
        style={{ height: 55, width: 90, marginTop: 8 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Professor" value="Professor" />
        <Picker.Item label="Professora" value="Professora" />
      </Picker>
        <TextInput
          mode="outlined"
          label="Nome do responsável"
          onChangeText={txtProfessor => onChangeProfessor(txtProfessor)}
        />
        </View>
        <TextInput
          mode="outlined"
          label="Horário inicial"
          onChangeText={txtInicio => onChangeInicio(txtInicio)}
        />
        <TextInput
          mode="outlined"
          label="Horário final"
          // style={Style.input}
          // value={nome}
          onChangeText={txtFim => onChangeFim(txtFim)}
        />

        <View style={styles.buttonContainer}>
        
    
<Button
containerStyle={styles.button}
 
onPress={closeModal}
  title="Voltar"
/>
 <Button
     containerStyle={styles.button}
  title="Adicionar"
   onPress={InsertProduto}
/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  coluna: {
    alignSelf: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  fixInput: {
      alignSelf: 'center',
    flexDirection: 'row'
  },
  button: {
  padding: 10
  
   },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});

export default AddHorario;

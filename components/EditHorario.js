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
import { Button } from 'react-native-elements'

const EditHorario = (props) => {
   var userid = firebase.auth().currentUser.uid;
     const { isOpen, closeModal, chave } = props;
     
   // console.log(data2)
     const [data2, setData2] = useState('')
  const [data, setData] = useState('')
  

  //console.log('Document data:', doc.professor);
     const UpdateProduto = () => {
        firebase.firestore().collection('horarios').doc(chave).update({
    fim: fim,
    inicio: inicio,
    professor: selectedValue+' '+professor,
    titulo: titulo,
    userId: userid
  });
  props.closeModal();
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

    var docRef = firebase.firestore().collection('horarios').doc(chave).get();


  const [fim, setFim] = useState('')
    const [inicio, setInicio] = useState('')
    const [professor, setProfessor] = useState('')
    const [titulo, setTitulo] = useState('')

 useEffect(()=>{
       docRef.then((doc) => {
    if (doc.exists) {
      const limpar = doc.data().professor.replace('Professora ', '');
      setTitulo(doc.data().titulo)
      setProfessor(limpar.replace('Professor ', ''))
      setInicio(doc.data().inicio)
      setFim(doc.data().fim)
    
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
        
    }, [])
    //console.log(data)
  return (
    <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
      <View style={styles.container}>
      {data2}
        <Text style={styles.coluna}>Editando horário</Text>
        <TextInput
          mode="outlined"
          label="Titulo"
          value={titulo}
          onChangeText={txtTitulo => onChangeTitulo(txtTitulo)}
        />
        <View style={styles.fixInput}>
<Picker
        selectedValue={selectedValue}
        style={{ height: 55, width: 100, marginTop: 8 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Professor" value="Professor" />
        <Picker.Item label="Professora" value="Professora" />
      </Picker>
        <TextInput
          mode="outlined"
          label="Nome do responsável"
          value={professor}
          onChangeText={txtProfessor => onChangeProfessor(txtProfessor)}
        />
        </View>
        <TextInput
          mode="outlined"
          label="Horário inicial"
          value={inicio}
          onChangeText={txtInicio => onChangeInicio(txtInicio)}
        />
        <TextInput
          mode="outlined"
          label="Horário final"
          value={fim}
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
  title="Salvar"
   onPress={UpdateProduto}
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

export default EditHorario;

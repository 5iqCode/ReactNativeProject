import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {BaseURLServ} from '../../../App'
import axios from 'axios'
import { useState } from 'react';



function ZabPasScreen() { // Забыли пароль
    
    const [login, setLogin] = useState('');
    var textChange = "E-mail или Телефон:"
    const navigation = useNavigation()
    function ButtonEnter(){
      axios({
        method: 'get',
        url: BaseURLServ +`/auth/getcode?phone=${login}`,
       timeout: 2000,
      }).then( function(response) {
        console.log(response)
          if (response.data.result ==1)
          {
            Alert.alert('Код подтверждения отправлен на вашу почту')
            navigation.navigate('Код подтверждения')
          }
          else{
            if (login=="")
            Alert.alert('Не заполнены обязательные поля')
            else
            Alert.alert('Проверьте правильность введённых данных')
          }
     });
    }
    return (
      <View style={styles.mainAvt}>
        <View style ={styles.textLogo} >
         <Image style = {{width:'52%',height:'100%'}} source={
            require('../../images/logo-ps.png')
        }/>
        </View>
        <View style = {styles.login}>
          <View>
          <Text style={{marginRight:'48%'}}> {textChange} </Text>
          <TextInput 
          style= {styles.loginInput} 
          value={login}
          onChangeText = {(textLog) =>{setLogin(textLog); logzabpas = textLog }}/>
        </View>
        </View>
        <TouchableOpacity style = {styles.buttonEnter}
          title="Продолжить"
          onPress = {ButtonEnter}
        >
          <Text style ={{color:'white'}}>Продолжить</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    
    textLogo: {
      backgroundColor:'#EDEDED',
      width:'100%',
      marginBottom:'40%', 
      height:'10%',
      alignItems:'center'
    },
    
    mainAvt: {
      flex:1,
      marginTop:'5%',
      alignItems:'center'
  
    },
    loginInput: {
      width : '100%',
      padding:1,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor:'black'
    },
    login:{
      flexDirection:'row',
          alignItems: 'center',
          marginBottom:15
    },
    buttonEnter:{
      alignItems: "center",
      backgroundColor: "#e60000",
      padding: 10,
      width:'80%',
      marginTop:50,
      marginBottom:25
    },
  });
  

  export default ZabPasScreen
  export var logzabpas
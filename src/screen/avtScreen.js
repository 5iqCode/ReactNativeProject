import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {BaseURLServ} from '../../App'
import axios from 'axios'
import { useState } from 'react';



function AvtScreen() { // Экран авторизации
    const navigation = useNavigation()
    function ButtonEnter(){
      axios({
        method: 'get',
        url: BaseURLServ + `/auth/login?email=${login}&password=${pas}`,
       timeout: 1000,
      }).then( function(response) {
        if (response.data.result=='1') {
          token = response.data.token
          console.log(response.data.token)
          console.log(token)
          navigation.navigate('Главный экран')
        }else
        {
          Alert.alert("Неверный логин или пароль")
        }
     });
    }

    const [login, setLogin] = useState();
    const [pas, setPas] = useState();

    return (
      <View style={styles.mainAvt}>
        <View style ={styles.textLogo} >
         <Image style = {{width:'52%',height:'100%'}} source={
            require('../images/logo-ps.png')
        }/>
        </View>
        <View style = {styles.login}>
          <Text>  Логин: </Text>
          <TextInput 
          name = 'login' 
          style= {styles.loginInput} 

          onChangeText = {logtext=>setLogin(logtext)}
          />
        </View>
        <View style = {styles.login}>
          <Text>Пароль: </Text>
          <TextInput 
          name='pas'  
          style= {styles.loginInput} 
          secureTextEntry 

          onChangeText = {pastext=>setPas(pastext)}
          />
        </View>
  
        <TouchableOpacity
          title="ЗабылиПароль"
          onPress={() => navigation.navigate('Забыли пароль')}
        >
          <Text style = {{color:'#BBBBBB', marginTop:10,textDecorationLine:'underline'}}>Забыли пароль</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style = {styles.buttonEnter}
          title="Войти"
          onPress={ButtonEnter }
        >
          <Text style ={{color:'white'}}>Войти</Text>
        </TouchableOpacity>
       <TouchableOpacity style={styles.buttonReg}
          title="Регистрация"
          onPress={() => navigation.navigate('Регистрация')}
        >
          <Text style ={{color:'white'}}>Регистрация</Text>
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
      width : '60%',
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
    pasInput: {
      width : '60%',
      padding:1,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor:'black'
    },
    pas:{
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
    buttonReg:{
      alignItems: "center",
      backgroundColor: "#e60000",
      padding: 10,
      width:'80%',
    }
  });
  

  export default AvtScreen

  export let token

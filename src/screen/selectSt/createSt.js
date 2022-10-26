import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {BaseURLServ} from '../../../App'
import axios from 'axios'
import { useState } from 'react';

function CreateStScreen() { // Экран создания студии
    
    const navigation = useNavigation()
    const [titleSt, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [showMenu,setShowMenu]=useState(0)
    
    function menuFnc()
    {
      if(showMenu==1)
      {
      return (
      <View style={styles.showMenu}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Авторизация')}
        >
          <Text style={{fontSize:20,marginLeft:'5%',color:'white'}}>Выйти</Text>
        </TouchableOpacity>
      </View>
      )
      }
    }
    function ButtonEnter(){
      axios({
        method: 'post',
        url: BaseURLServ + `/admin/gym/create?name=${titleSt}&url=${address}&intphone=${phone}`,
       timeout: 1000,
      }).then( function(response) {
        if (response.data.result == 1)
        {
          Alert.alert(response.data.message)
          navigation.navigate ('Выбор студии')
        }
        else
        {
          Alert.alert(response.data.message)
        }
     });
    }

    return (
      <View style={styles.mainAvt}>
        <View style = {styles.header}>
        <TouchableOpacity style = {styles.textLogoOp1}
        onPress={()=>{if(showMenu==0)
        setShowMenu(1)
        else
        setShowMenu(0)
        }}
        >
          <Image style = {{height:'100%',width:'100%'}} source={
            require('../../images/menu3.png')
        }/>
        </TouchableOpacity>
        <TouchableOpacity 
        style = {styles.textLogoOp2}
        title="Главный экран"
        onPress={() => navigation.navigate('Главный экран')}
        >
        <Image style = {{height:'88%',width:'65%'}} source={
            require('../../images/logo-ps.png')
        }/>
        </TouchableOpacity >
        <TouchableOpacity style = {styles.profile}
          title="Profile"
          onPress={() => navigation.navigate('Профиль')}
        >
          <Image style = {styles.profileImg} source={
            require('../../images/profile2.png')
        }/>
        </TouchableOpacity>
        </View>
        {menuFnc()}
        <Text style = {{fontSize:20,fontWeight:'bold', marginTop:'3%',textAlign:'center'}}>Создание новой студии</Text>
        <Text style = {{marginTop:'1%',marginLeft:'3%',textAlign:'justify', marginRight:'7%'}}>   Если Вы являетесь работником студии, то попросите администратора предоставить Вам права. Если произошла ошибка - напишите нам на Email: help@pocketsport.ru</Text>
        <View style={styles.mainInput}>
        <View style = {styles.login}>
          <Text> Название: </Text>
          <TextInput 
          style= {styles.loginInput} 
          value={titleSt} 
          onChangeText = {(textTitle)=>setTitle(textTitle)}/>
        </View>
        <View style = {styles.login}>
          <Text>Адрес: </Text>
          <TextInput style= 
          {styles.loginInput}
          value = {address}
          onChangeText = {(textAddress)=>setAddress(textAddress)}/>
        </View>
        <View style = {styles.login}>
          <Text>Телефон: </Text>
          <TextInput 
          style= {styles.loginInput}
          value={phone}
          onChangeText = {(textPhone)=>setPhone(textPhone)}/>
        </View>
        </View>
        <View style = {{alignItems:'center'}}>
       <TouchableOpacity style={styles.buttonEnter}
          title="Создать студию"
          onPress={ButtonEnter}
        >
          <Text style ={{color:'white'}}>Создать студию</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    header:{
      flexDirection:'row',
      height:'10%',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#EDEDED',
    },
    profile:{
      width:'15%',
      height:'77%',
    },
    profileImg:{
      width:'100%',
      height:'100%',
      alignItems:'center'
    },
    textLogoOp1:{
      flex:0,
      width:'13%',
      height:'100%',
    },
    textLogoOp2:{
      flex:0,
      width:'69%',
      height:'100%',
      alignItems:'center'
    },
    showMenu:{
      zIndex:2,
      width:'50%',
      backgroundColor:'#aeb0b0',
      borderBottomEndRadius:50,
      position:'absolute',
      marginTop:'19%',
      height:0,
      borderBottomWidth:1.2,
      borderRightWidth:1.2,
      borderColor:'#a30000'
    },
    mainAvt: {
      flex:1,
      marginTop:'5%',
    },
    mainInput :{
      marginTop:'5%',
      alignItems:'flex-end',
      marginRight:'10%',
    },
    loginInput: {
      width : '70%',
      padding:1,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor:'black',
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
      width:'90%',
      marginTop:50,
      marginBottom:25
    },
  });

  export default CreateStScreen
import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {BaseURLServ} from '../../App'
import axios from 'axios'
import { useState } from 'react';


function ProfScreen() { // Профиль
    
    const navigation = useNavigation()
    const [refresh,setRefresh]= useState(0)
    const [inputValue,setInputValue] = useState({})

    const [showMenu,setShowMenu]=useState(0)

    function menuFnc()
    {
      if(showMenu==1)
      {
      return (
      <View style={styles.showMenu}>
        <TouchableOpacity
        onPress={()=>
          {
            setShowMenu(0);
            navigation.navigate('Авторизация')}}
        >
          <Text style={{fontSize:20,marginLeft:'5%',color:'white'}}>Выйти</Text>
        </TouchableOpacity>
      </View>
      )
      }
    }

    function GetData(){
      if (refresh==0){
      setRefresh(1);
          axios({
              method: 'get',
              url: BaseURLServ +"/auth/info",
              timeout: 1000,
          }).then( function(response) {
             if (response.data.result == 1)
             {
              setInputValue(response.data)
             }
              else
             {
               Alert.alert ("Произошла ошибка получения данных.")
             }
     });
    }
    }
    
    function ButtonEnter(){

    }
    
    return (
      
      <View style={styles.mainAvt}>
        {GetData()}  
        <View style = {styles.header}>
        <TouchableOpacity style = {styles.textLogoOp1}
        onPress={()=>{if(showMenu==0)
        setShowMenu(1)
        else
        setShowMenu(0)
        }}
        >
          <Image style = {{height:'100%',width:'100%'}} source={
            require('../images/menu3.png')
        }/>
        </TouchableOpacity>
        <TouchableOpacity 
        style = {styles.textLogoOp2}
        title="Главный экран"
        onPress={() => navigation.navigate('Главный экран')}
        >
        <Image style = {{height:'88%',width:'65%'}} source={
            require('../images/logo-ps.png')
        }/>
        </TouchableOpacity >
        <TouchableOpacity style = {styles.profile}
          title="Profile"
          onPress={() => navigation.navigate('Профиль')}
        >
          <Image style = {styles.profileImg} source={
            require('../images/profile2.png')
        }/>
        </TouchableOpacity>
        </View>
        {menuFnc()}
        <View style={styles.content}>
        <View style = {styles.login}>
          <Text> Имя: </Text>
          <TextInput 
          style= {styles.loginInput}
          defaultValue={inputValue['name']}
          />
        </View>
        <View style = {styles.login}>
          <Text>Фамилия: </Text>
          <TextInput style= {styles.loginInput}
          defaultValue={inputValue['last_name']}/>
        </View>
        <View style = {styles.login}>
          <Text>Телефон: </Text>
          <TextInput style= {styles.loginInput}
          defaultValue={inputValue['phone']}/>
        </View>
        <View style = {styles.login}>
          <Text>Email: </Text>
          <TextInput style= {styles.loginInput}
          defaultValue={inputValue['email']}/>
        </View>
        <View style = {styles.login2}>
          <Text style={{marginRight:'60%'}}>Новый пароль: </Text>
          <TextInput style= {styles.loginInput} secureTextEntry/>
        </View>
        <View style = {styles.login2}>
          <Text style={{marginRight:'48%'}}>Подтвердите пароль: </Text>
          <TextInput style= {styles.loginInput} secureTextEntry/>
        </View>

       <TouchableOpacity style={styles.buttonEnter}
          title="Сохранить"
          onPress={ButtonEnter}
        >
          <Text style ={{color:'white'}}>Сохранить</Text>
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
    content: {
      marginTop:'10%',
      flex:1,
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
    login2:{
      alignItems:'flex-end',
      width:'100%',
      marginBottom:15,
      marginLeft:'20%'
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

  export default ProfScreen
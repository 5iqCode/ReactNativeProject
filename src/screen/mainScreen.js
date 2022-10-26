import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import {useState} from 'react'
import axios from 'axios'
import {BaseURLServ} from '../../App'
import {ps_gym} from './selectSt/selectSt'

function MainScreen() { //Главный экран
    
    const navigation = useNavigation()

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
            axios({
              method: 'get',
              url: BaseURLServ + `/auth/logout`,
             timeout: 1000,
            })
            navigation.navigate('Авторизация')}}
        >
          <Text style={{fontSize:20,marginLeft:'5%',color:'white'}}>Выйти</Text>
        </TouchableOpacity>
      </View>
      )
      }
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
        <TouchableOpacity style = {styles.menuOp}
          title="Выбор студии"
          onPress={() => {
            setShowMenu(0);
            navigation.navigate('Выбор студии')}}
        >
        <Text style = {styles.menu}> Выбор студии</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.menuOp}
          title="Расписание"
          onPress={() => {
            setShowMenu(0);
            navigation.navigate('Расписание')}}
        >
        <Text style = {styles.menu}> Расписание</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.menuOp}
          title="Шахматка"
          onPress={() => {
            setShowMenu(0);
            navigation.navigate('Шахматка')}}
        >
        <Text style = {styles.menu}> Шахматка</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.menuOp}
          title="Чеки"
          onPress={() => navigation.navigate('Чеки')}
        >
        <Text style = {styles.menu}> Чеки</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.menuOp}
          title="Записи"
          onPress={() => navigation.navigate('Записи')}
        >
        <Text style = {styles.menu}> Записи</Text>
        </TouchableOpacity>
        <Text style = {styles.textMenuRed}>Добро пожаловать в приложение!</Text>
        <Text style = {{textAlign:'center'}}>выберите пункт меню</Text>
        <Text style = {{textAlign:'center'}}>для дальнейшей работы...</Text>
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
    alignItems:'center'
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
    marginTop:'20%',
    height:0,
    borderBottomWidth:1.2,
    borderRightWidth:1.2,
    borderColor:'#a30000'
  },
  mainAvt: {
    flex:1,
    marginTop:'5%',
  },
    textMenuRed:{
      color:'red',
      textAlign:'center',
      fontSize:16,
      fontWeight:'bold'
    },
    menuOp:{
      flex:0,
      width:'100%',
      height:'5%',
    },
    menu: {
      backgroundColor:'#b3b3b3',
      width:'100%',
      height:'100%',
      color:'white',
      fontSize:15,
      textAlignVertical:'center'
    },
  });
  
  export default MainScreen
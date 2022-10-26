import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image , ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {BaseURLServ} from '../../../App'
import axios from 'axios'
import { useState } from 'react';


function SelectStScreen() { //Выбор студии
    
    const navigation = useNavigation()
    const [objectsSt,setObjectsSt] = useState([])
    const [showMenu,setShowMenu]=useState(0)
    const [refresh,setRefresh]=useState(0)
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
    function ShowAllSt(){
      if (refresh == 0){
        setRefresh(1)
      axios({
        method: 'get',
        url: BaseURLServ + `/admin/gyms/list`,
      }).then( function(response) {
      setObjectsSt(response.data)
      })
      console.log('333')
    }
    }

    return (
      <View style={styles.mainAvt}>
      {ShowAllSt()}
      {menuFnc()}
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
        <View>
          <Text style = {{marginLeft:'5%',fontSize:16,marginTop:'3%', marginBottom:'3%', textAlign:'left'}}>Выберите студию</Text>
        </View>
        <ScrollView >
        {objectsSt.map((inf)=>(<View style = {styles.todo} key ={inf.id}>
          <TouchableOpacity 
        style = {styles.todoObj}
        onPress={()=>{ps_gym = inf.id;
        setRefresh(0);
        console.log(ps_gym)
        navigation.navigate('Расписание')}}
        >
        <Text style={{marginLeft:'3%'}}>{inf.name}</Text>
        </TouchableOpacity>
        </View>))}
        </ScrollView>
        <View style = {styles.buttons}>
        <TouchableOpacity style = {styles.buttonEnter}
          title="Отобразить неактивные залы"
          onPress = {()=>{setRefresh(0)
          }}
        >
          <Text style ={{color:'white'}}>Отобразить неактивные залы</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonEnter}
        onPress={() => {
          setRefresh(0)
          navigation.navigate('Создать студию')
          }
          }
          title="Создать студию"
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
    todo:{
      flexDirection:'row',
      alignItems:'center',
      height: 45,
      borderWidth: 1,
      borderColor:'black',
      borderRadius:5,
      marginBottom:5,
      width:'90%',
      marginLeft:'5%'
      },

      todoObj:{
        flex:1,
        height:'100%',
        width:'100%',
        backgroundColor:'#D3D3D3',
        borderRadius:5,
        justifyContent:'center'
      }, 
      buttons:{
        alignItems:'center'
      },
      buttonEnter:{
        alignItems: "center",
        backgroundColor: "#e60000",
        padding: 10,
        width:'90%',
        marginTop:5,
        marginBottom:5
      },
  });
  
  export default SelectStScreen
  export var ps_gym
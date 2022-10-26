import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image ,ScrollView,Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {CalendarList} from 'react-native-calendars'
import moment from 'moment'
import { useState } from 'react';
import {ps_gym} from '../selectSt/selectSt'
import {BaseURLServ} from '../../../App'
import axios from 'axios'
import HTMLView from 'react-native-htmlview'

export var ps_id 

function RaspScreen() { //Главный экран

    const [objRasp,setObjRasp]= useState([])
    const [showMenu,setShowMenu]=useState(0) 

    function deleteRasp(date,id){
      axios({
        method: 'get',
        timeout:1000,
        url: BaseURLServ + `/admin/gym/${ps_gym}/schedule/${id}/delete/${date}?delete=1`,
      }).then( function(responseDel) {
      setRefCal(0)
      Alert.alert(responseDel.data.message)
      })
    }

    var [refCal,setRefCal]=useState(0);
    const [datSel,setDateSel]  = useState();

    function rCalendar()
    {
      if(ps_gym!=undefined)
      {
      if(refCal==0)
      {
        setRefCal(1)
      axios({
        method: 'get',
        timeout:1000,
        url: BaseURLServ + `/admin/gym/${ps_gym}/calendar?from=${datSel}&to=${datSel}&deleted=0`,
      }).then( function(response) {
      setObjRasp(response.data)
      console.log(response.data)
      })
    }
     }
     else
     {
       navigation.navigate("Выбор студии")
     }
    }
    const navigation = useNavigation()

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

    return (
      <View style={styles.mainAvt}>
        {rCalendar()}
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
        <View>
          <CalendarList style={{zIndex:1}}
            firstDay= {1}
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
             pagingEnabled={true}
             hideArrows ={true}
             
             onDayPress={(day)=>{
              setRefCal(0)
              setDateSel(day.dateString)
              console.log(datSel)
            }}
            //  Set custom calendarWidth.
            style = {{marginBottom:10}}
          />
        </View>
        <ScrollView>
        <Text style={{textAlign:'center',marginBottom:'2%',fontSize:15,fontWeight:'bold'}}>{datSel}</Text>
        {objRasp.map((inf)=>(<View style = {styles.todo} key={inf.id}>
        <View style = {styles.todoObj} >
        <TouchableOpacity key={inf.id}
        onPress = {()=>{ps_id=inf.ps_id;
        }}
        >
        <Text style={{}}>Свободных мест: {inf.avaiable}</Text>
        <Text style={{}}>Время тренировки: {inf.time}     </Text>
        <HTMLView style={{}} value={"<p>"+inf.text.split(',<br>')+"</p>"}>
        </HTMLView>
        </TouchableOpacity>
        </View>
        <TouchableOpacity key={inf.id}
        style = {styles.todoObjDel}
        onPress={()=>{deleteRasp(inf.ps_date,inf.ps_id)}}
        >
        <Text style={{textAlign:'center'}}>Удалить тренировку</Text>
        </TouchableOpacity>
        </View>
        ))}
        </ScrollView>
        <View>
        <TouchableOpacity style={styles.buttonEnter}
          title="Добавить"
          onPress={() => navigation.navigate('Добавить тренировку')}
        >
          <Text style ={{color:'white'}}>Добавить</Text>
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
  buttonEnter:{
    alignItems: "center",
    backgroundColor: "#e60000",
    padding: 10,
    width:'90%',
    marginTop:5,
    marginBottom:15,
    marginLeft:'5%'
  },
  todo:{
    flexDirection:'row',
    alignItems:'flex-end',
    height: 80,
    borderRadius:5,
    marginBottom:5,
    width:'90%',
    marginLeft:'5%'
    },

    todoObj:{
      height:'100%',
      paddingLeft:10,
      width:'70%',
      backgroundColor:'#D3D3D3',
      borderRadius:5,
      borderBottomRightRadius:10,
      borderTopRightRadius:10,
      justifyContent:'center'
    }, 
    todoObjDel:{

      height:'100%',
      width:'30%',
      backgroundColor:'#fc6156',
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      borderTopEndRadius:5,
      borderBottomRightRadius:5,
      justifyContent:'center',
      alignItems:'flex-end'
    }
  });
  
  export default RaspScreen
 import React from 'react';
  import {SafeAreaView, StyleSheet, StatusBar, Alert,View,Text,TouchableOpacity,Image} from 'react-native';
  import { NavigationContainer, useNavigation } from '@react-navigation/native';
  import WeekView from 'react-native-week-view';
  import {ps_gym} from './selectSt/selectSt'
  import {BaseURLServ} from '../../App'
import axios from 'axios'
import { useState } from 'react/cjs/react.development';
import HTMLView from 'react-native-htmlview'
import moment from 'moment'

 



 //     id: 2,
  //    description: 'Event 2',
  //    startDate: Date,
 //     endDate: Date,
 //    color: 'red',

var responseVal = [{}]
var resps=[{id:0,
  color: 'green',
  description:0,
  startDate: Date,
  endDate: Date,},]


  class ShahScreen extends React.Component { //Расписание
      
    

      onEventPress = ({id,description, color, startDate, endDate}) => {
        Alert.alert(
          `${description}`,
          `Начало: ${startDate.toString().split('GMT+0000 (GMT)')}\nОкончание: ${endDate.toString().split('GMT+0000 (GMT)')}` 
        );
      };

      render() {
      const { navigation } = this.props;
      const datSel = moment().year()+'-01-01'
      const datSelEnd = moment().year()+1+'-01-01'
        if(ps_gym!=undefined)
        {
        axios({
          method: 'get',
          url: BaseURLServ + `/admin/gym/${ps_gym}/calendar?from=${datSel}&to=${datSelEnd}&deleted=0`,
        }).then( function(response) {
        responseVal=response.data
        responseVal.map((value)=>{
          resps.push({
            id:value.id,
            color: value.color,
            description: value.text,
            startDate: value.start_date,
            endDate: value.end_date,
          })
        })
        })
        }
      else
      {
        navigation.navigate("Выбор студии")
      }
      return (
        <>
        <View style = {styles.header2}>
          <TouchableOpacity style = {styles.textLogoOp}
            title="Главный экран"
            onPress={() => {
              navigation.navigate('Главный экран')}}
          >
          <Text style = {styles.textLogo}>Pocket Sport</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.profile}
            title="Profile"
            onPress={() => {
              resps=[{}]
              navigation.navigate('Профиль')}}
          >
            <Image style = {styles.profileImg} source={
              require('../images/profile2.png')
          }/>
          </TouchableOpacity>
          </View>
        <SafeAreaView style={styles.container}>
          <WeekView
            ref={r => {
              this.componentRef = r;
            }}
            events={resps}
            eventContainerStyle ={{fontSize:3}}
            selectedDate={Date()}
            numberOfDays={3}
            onEventPress={this.onEventPress}
            headerStyle={styles.header}
            headerTextStyle={styles.headerText}
            hourTextStyle={styles.hourText}
            eventContainerStyle={styles.eventContainer}
            formatDateHeader="MMM D"
            hoursInDisplay={12}
            startHour={8}
          />
        </SafeAreaView>
      </>
      );
      }
    }
    

    const styles = StyleSheet.create({
      header2:{
        flexDirection:'row',
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#EDEDED',
        marginTop:'10%'
      },
      profile:{
        width:'16%',
        height:'77%',
      },
      profileImg:{
        width:'100%',
        height:'100%',
        alignItems:'center'
      },
      textLogoOp:{
        flex:0,
        width:'80%',
        height:'100%',
      },
      textLogo: {
        backgroundColor:'#EDEDED',
        width:'100%',
        height:'100%',
        color:'white',
        textAlign:'center',
        fontSize:30,
        textAlignVertical:'center'
      },
      container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      header: {
        backgroundColor: '#4286f4',
        borderColor: '#fff',
      },
      headerText: {
        color: 'white',
      },
      hourText: {
        color: 'black',
      },
      eventContainer: {
        borderWidth: 1,
        borderColor: 'black',
      },
    });
    export default ShahScreen
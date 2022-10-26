import * as React from 'react';
import { Button, Switch, View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, Image, TextPropTypes, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useState } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {ps_gym} from '../selectSt/selectSt'
import {BaseURLServ} from '../../../App'
import {token} from '../avtScreen'
import qs from 'qs';
import axios from 'axios'
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';




function AddRaspScreen() { //Добавить тренировку

  const [type,setType]=useState(1)
  const [maxCount,setMaxCount]=useState(10)
  const [cycleDay,setCycleDay]=useState(1)
  const [isEnabledValue,setIsEnabledValue]=useState(0)

  function addNewRasp(){
    if (type==0){
    axios({
      method:'post',
      url: BaseURLServ + `admin/gym/${ps_gym}/schedule/add`,
      headers:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: qs.stringify({
      ps_token:token,
      activity_id: selActiv,
      type:type+1,
      starttime:dateTimeStart.getHours().toString().padStart(2,'0')+":"+dateTimeStart.getMinutes().toString().padStart(2,'0')+":"+dateTimeStart.getSeconds().toString().padStart(2,'0'),
      activitydate:dateDate.getFullYear()+'-'+(dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+dateDate.getDate().toString().padStart(2,'0'),
      endtime:dateTimeEnd.getHours().toString().padStart(2,'0')+":"+dateTimeEnd.getMinutes().toString().padStart(2,'0')+":"+dateTimeEnd.getSeconds().toString().padStart(2,'0'),
      cycleday:cycleDay,
      maxcount:maxCount,
      date_activate:dateDate.getFullYear()+'-'+(dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+dateDate.getDate().toString().padStart(2,'0'),
      date_deactivate:dateDate2.getFullYear()+'-'+(dateDate2.getMonth()+1).toString().padStart(2,'0')+'-'+dateDate2.getDate().toString().padStart(2,'0'),
      trainer_id:selTrainer,
      products :[],
      room_id: selRoom, 
      waitlist_active:isEnabledValue,
      activity_date:dateDate.getFullYear()+'-'+
                          (dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+
                          dateDate.getDate().toString().padStart(2,'0')+':0',
      addFastRecord:0
    })
    
   }).then( function(responseNew) {
      Alert.alert(responseNew.data.message)
      if(responseNew.data.result==1){
        console.log(responseNew)
      navigation.navigate("Расписание")
      }
    })
  }
  else{
    axios({
      method:'post',
      url: BaseURLServ + `admin/gym/${ps_gym}/schedule/add`,
      headers:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: qs.stringify({
      ps_token:token,
      activity_id: selActiv,
      type:type+1,
      starttime:dateTimeStart.getHours().toString().padStart(2,'0')+":"+dateTimeStart.getMinutes().toString().padStart(2,'0')+":"+dateTimeStart.getSeconds().toString().padStart(2,'0'),
      activitydate:dateDate.getFullYear()+'-'+(dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+dateDate.getDate().toString().padStart(2,'0'),
      endtime:dateTimeEnd.getHours().toString().padStart(2,'0')+":"+dateTimeEnd.getMinutes().toString().padStart(2,'0')+":"+dateTimeEnd.getSeconds().toString().padStart(2,'0'),
      cycleday:dateDate.getDay(),
      maxcount:maxCount,
      date_activate:dateDate.getFullYear()+'-'+(dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+dateDate.getDate().toString().padStart(2,'0'),
      trainer_id:selTrainer,
      products :[],
      room_id: selRoom, 
      waitlist_active:isEnabledValue,
      activity_date:dateDate.getFullYear()+'-'+
                          (dateDate.getMonth()+1).toString().padStart(2,'0')+'-'+
                          dateDate.getDate().toString().padStart(2,'0')+':0',
      addFastRecord:0
    })
    
   }).then( function(responseNew) {
      Alert.alert(responseNew.data.message)
      if(responseNew.data.result==1){
        console.log(responseNew)
      navigation.navigate("Расписание")
      }
    })
  }
  }


  /* Не отправляю

addFastRecord: 1
clientForFastRecord: 0
commentForFastRecord: commm
*/

  function changeAdd(){
    if (type==0){
      return(
        <>
        <View style = {styles.login}>
        <Text>День недели</Text>
        <ModalDropdown 
        options={['Понедельник', 'Вторник', 'Среда','Четверг', 'Пятница','Суббота','Воскресенье']} 
        style={styles.loginInput}
        dropdownStyle={{marginTop:'-15%',minWidth:'70%',minHeight:'150%'}}
        dropdownTextStyle={{fontSize:14}}
        textStyle={{fontSize:14}}
        defaultValue={'Понедельник'}
        onSelect={(day)=>{setCycleDay(day+1)}}
        />
        </View>

      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Начало</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeStart.getHours().toString().padStart(2, '0')+ ":" + dateTimeStart.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeStart}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      </View>
      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Окончание</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepickerEnd} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeEnd.getHours().toString().padStart(2, '0')+ ":" + dateTimeEnd.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeEnd}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChangeEnd}
        />
      )}
      </View> 
        
      <View style={styles.login}> 
        <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Первое занятие</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateDate.getDate().toString().padStart(2, '0') +"/"+ (dateDate.getMonth()+1).toString().padStart(2, '0') + "/"+dateDate.getFullYear()}</Text>
        </TouchableOpacity>
        {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateDate}
          mode='date'
          is24Hour={true}
          
          display="default"
          onChange={onChangeDate}
        />
      )}
      </View>
      <View style={styles.login}> 
        <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Последнее занятие</Text>
        <TouchableOpacity onPress={showDatePicker2} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateDate2.getDate().toString().padStart(2, '0') +"/"+ (dateDate2.getMonth()+1).toString().padStart(2, '0') + "/"+dateDate2.getFullYear()}</Text>
        </TouchableOpacity>
        {showDate2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateDate2}
          mode='date'
          is24Hour={true}
          
          display="default"
          onChange={onChangeDate2}
        />
      )}
      </View>
        </>
      )
    }
    if (type==1){
      return(
        <View>
        <View style={styles.login}> 
        <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Дата занятия</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateDate.getDate().toString().padStart(2, '0') +"/"+ 
        (dateDate.getMonth()+1).toString().padStart(2, '0') + 
        "/"+dateDate.getFullYear()}</Text>
        </TouchableOpacity>
        {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateDate}
          mode='date'
          is24Hour={true}
          
          display="default"
          onChange={onChangeDate}
        />
      )}
      </View>

      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Начало</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeStart.getHours().toString().padStart(2, '0')+ ":" + dateTimeStart.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeStart}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      </View>
      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Окончание</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepickerEnd} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeEnd.getHours().toString().padStart(2, '0')+ ":" + dateTimeEnd.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeEnd}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChangeEnd}
        />
      )}
      </View>
      <View style = {{alignItems:'center', flexDirection:'row'}}>
        <Text style = {{marginRight:15, marginBottom:15, marginTop:15}}>Добавить запись клиента</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#e60000" }}
        thumbColor={isEnabledZapCl ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchZapCl}
        value={isEnabledZapCl}
      />
      </View>
      {AddZapCl()}
      </View>
      )
    }
    if (type==2){
      return(
        <View>
        <View style={styles.login}> 
        <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Дата занятия</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateDate.getDate().toString().padStart(2, '0') +"/"+ (dateDate.getMonth()+1).toString().padStart(2, '0') + "/"+dateDate.getFullYear()}</Text>
        </TouchableOpacity>
        {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateDate}
          mode='date'
          is24Hour={true}
          
          display="default"
          onChange={onChangeDate}
        />
      )}
      </View>

      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Начало</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepicker} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeStart.getHours().toString().padStart(2, '0')+ ":" + dateTimeStart.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeStart}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      </View>
      <View style={styles.login}> 

      <Text style = {{marginRight:'10%', marginBottom:5, marginTop:5}}>Окончание</Text>

      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showTimepickerEnd} style={styles.selectTime}>
        <Text 
        style={{textAlign:'center',
          marginBottom:9,
          marginTop:9
        }}
        >{dateTimeEnd.getHours().toString().padStart(2, '0')+ ":" + dateTimeEnd.getMinutes().toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      {showTimeEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTimeEnd}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChangeEnd}
        />
      )}
      </View>
      </View>
      )
    }
  }

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
  
  const [objRoom,setObjRoom]= useState([]) //Загрузка списка залов 
  function loadRooms() {
    if (loadRm == 0)
    {
    setLoadRoom(1)
    axios({
      method: 'get',
      timeout:1000,
      url: BaseURLServ + `/admin/gym/${ps_gym}/room`,
    }).then( function(response2) {
      setObjRoom(response2.data.data)
      console.log()
    })
  }
  }

  function selIdRoom(selectedRoom)
  {
    setSelectedRoom(objRoom[selectedRoom].id)
    console.log(selRoom)
  }
    var [loadRm,setLoadRoom]=useState(0)

  const[selRoom,setSelectedRoom]=useState() //Выбранный зал (для запроса)

  const [objActiv,setObjActiv]= useState([]) //Загрузка списка тренировок 
  function loadActiv() {
    if (loadAc == 0)
    {
    setLoadActiv(1)
    axios({
      method: 'get',
      timeout:1000,
      url: BaseURLServ + `/admin/gym/${ps_gym}/activities?alllinkedgyms=0`,
    }).then( function(response3) {
      setObjActiv(response3.data)
      console.log(objActiv)
    })
  }
  }

  function selIdAvtiv(selectedActiv)
  {
    setSelectedActiv(objActiv[selectedActiv].id)
    console.log(selActiv)
  }
    var [loadAc,setLoadActiv]=useState(0)

  const[selActiv,setSelectedActiv]=useState() //Выбранная тренировка(для запроса)

  const [objTrainer,setObjTrainer]= useState([]) //Загрузка списка тренеров

  function loadTrainers() {
    if (loadTr == 0)
    {
    setLoadTr(1)
    axios({
      method: 'get',
      timeout:1000,
      url: BaseURLServ + `/admin/gym/${ps_gym}/trainers`,
    }).then( function(response) {
      setObjTrainer(response.data)
      console.log('fdsf')
    })
  }
  }

  function selIdTrainer(selectedTrainer)
  {
    setSelectedTrainer(objTrainer[selectedTrainer].id)
    console.log(selTrainer)
  }
    var [loadTr,setLoadTr]=useState(0)

    const[selTrainer,setSelectedTrainer]=useState() //Выбранный тренер (для запроса)


    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {setIsEnabled(previousState => !previousState)
    if (isEnabledValue==0)
      setIsEnabledValue(1)
      else
      setIsEnabledValue(0)
    };

    const [isEnabledZapCl, setIsEnabledZapCl] = useState(false);
    const toggleSwitchZapCl = () => {
      setIsEnabledZapCl(previousState => !previousState);
    }
    function AddZapCl(){
      if (isEnabledZapCl==true) {
        return <View>
      <View style = {styles.login}>
       <Text>Имя клиента</Text>
       <TextInput style= {styles.loginInput}/>
       </View>
       <View style = {styles.login}>
       <Text>Номер</Text>
       <TextInput style= {styles.loginInput}/>
       </View>
       <View style = {styles.login}>
       <Text>Email</Text>
       <TextInput style= {styles.loginInput}/>
       </View>
       <View style = {styles.login}>
       <Text>Комментарий к записи</Text>
       <TextInput style= {styles.loginInput}/>
       </View>
       </View>
       }else{
         return
       }
    }


    const navigation = useNavigation()


    const [dateTimeStart, setDateTimeStart] = useState(new Date());

  const [showTimeStart, setShowTimeStart] = useState(false);
  const [mode, setMode] = useState('date');
  const onChange = (event2, selectedDate) => {
    const currentDate = selectedDate || dateTimeStart;
    setShowTimeStart(Platform.OS === 'ios');
    setDateTimeStart(currentDate);
  };

  const showMode = (currentMode) => {
    setShowTimeStart(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const [dateDate, setDateDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);

  const onChangeDate = (event3, selectedDateDate) => {
    const currentDateDate = selectedDateDate || dateDate;
    setShowDate(Platform.OS === 'ios');
    setDateDate(currentDateDate);
    console.log(dateDate)
  };

  const showModeDate = (currentModeDate) => {
    setShowDate(true);
  };

  const showDatePicker = () => {
    showModeDate('date');
  };

  const [dateDate2, setDateDate2] = useState(new Date());
  const [modeDate2, setModeDate2] = useState('date');
  const [showDate2, setShowDate2] = useState(false);

  const onChangeDate2 = (event4, selectedDateDate2) => {
    const currentDateDate2 = selectedDateDate2 || dateDate2;
    setShowDate2(Platform.OS === 'ios');
    setDateDate2(currentDateDate2);
    console.log(dateDate2)
  };

  const showModeDate2 = (currentModeDate2) => {
    setShowDate2(true);
    setModeDate2(currentModeDate2);
  };

  const showDatePicker2 = () => {
    showModeDate2('date');
  };

  
  const [dateTimeEnd, setDateTimeEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('date');
  const [showTimeEnd, setShowTimeEnd] = useState(false);

  const onChangeEnd = (event, selectedDate2) => {
    const currentDateEnd = selectedDate2 || dateTimeEnd;
    setShowTimeEnd(Platform.OS === 'ios');
    setDateTimeEnd(currentDateEnd);
  };

  const showModeEnd = (currentModeEnd) => {
    setShowTimeEnd(true);
    setModeEnd(currentModeEnd);
  };

  const showTimepickerEnd = () => {
    showModeEnd('time');
  };
    return (
      <View style={styles.mainAvt}>

        {loadTrainers()}
        {loadRooms()}
        {loadActiv()}
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
        <ScrollView style={{marginLeft:'10%'}}>
        <View style = {styles.login}>
        <Text>Зал</Text>
        <ModalDropdown 
        options={objRoom.map((rooms)=>(rooms.name))} 
        style={styles.loginInput}
        onSelect={(value)=>{selIdRoom(value)}}
        dropdownStyle={{marginTop:'-15%'}}
        dropdownTextStyle={{fontSize:14}}
        textStyle={{fontSize:14}}
        defaultValue={"Выберите зал"}
        />
        </View>
        <View style = {styles.login}>
        <Text>Тренировка</Text>
        <ModalDropdown 
        options={objActiv.map((activ)=>(activ.name))} 
        style={styles.loginInput}
        onSelect={(value)=>{selIdAvtiv(value)}}
        dropdownStyle={{marginTop:'-15%'}}
        dropdownTextStyle={{fontSize:14}}
        textStyle={{fontSize:14}}
        defaultValue={"Выберите тренера"}
        />
        </View>
        <View style = {styles.login}>
        <Text>Тренер</Text>
        <ModalDropdown 
        options={objTrainer.map((trainer)=>(trainer.name))} 
        style={styles.loginInput}
        onSelect={(value)=>{selIdTrainer(value)}}
        dropdownStyle={{marginTop:'-15%'}}
        dropdownTextStyle={{fontSize:14}}
        textStyle={{fontSize:14}}
        defaultValue={"Выберите тренера"}
        />
        </View>
      <View style = {{flexDirection:'row', marginBottom:15}}>
        <View style = {{width:'40%',marginRight:'10%'}}>
        <Text>Квота</Text>
        <TextInput style= {styles.loginInputKv}
        defaultValue={'10'}
        keyboardType='numeric' 
        onChangeText = {kvota=>setMaxCount(kvota)}
        />
        </View>
      <View style = {{alignItems:'flex-start'}}>
        <Text>Лист ожидания</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#e60000" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      </View>
      <View style = {styles.login}>
        <Text>Тип</Text>
        <ModalDropdown 
        options={['Еженедельное', 'Разовое', 'Замещающее']} 
        style={styles.loginInput}
        dropdownStyle={{marginTop:'-15%',minWidth:'50%'}}
        dropdownTextStyle={{fontSize:14}}
        textStyle={{fontSize:14}}
        defaultValue = 'Разовое'
        onSelect = {(typeS)=>{setType(typeS);
        if (typeS!=0){setDateDate2(dateDate)}}}
        />
        </View>
        {changeAdd()}
      </ScrollView>
      <TouchableOpacity style = {styles.buttonEnter}
          title="Сохранить"
          onPress={()=>{addNewRasp()}}
        >
          <Text style ={{color:'white'}}>Сохранить</Text>
        </TouchableOpacity>
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
  login:{

        alignItems: 'flex-start',
        marginBottom:15,
        width:'100%'
  },
  loginInputKv: {
    width : '100%',
    minWidth:'50%',
    padding:1,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor:'black',
    fontSize:14
  },
  loginInput: {
    width : '85%',
    padding:1,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor:'black',
  },
  buttonEnter:{
    alignItems: "center",
    backgroundColor: "#e60000",
    padding: 10,
    width:'90%',
    marginBottom:5,
    marginLeft:'5%'
  },
  selectTime:{
    width : '74%',
    borderBottomColor:'#000000',
    borderBottomWidth:1,
    borderLeftColor:'#999999',
    borderLeftWidth:1,
    borderRightColor:'#999999',
    borderRightWidth:1,
    borderTopColor:'#b3b3b3',
    borderTopWidth:1,
  }
  });
  
  export default AddRaspScreen
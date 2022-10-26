import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { useState } from 'react';



function ZapScreen() { //Записи
    
    const navigation = useNavigation()
    const [datenew,setDate]  = useState(moment().format("DD-MM-YYYY"));
    return (
      <View style={styles.center}>
        <Text style = {styles.textMenuRed}>Записи</Text>

        <DatePicker
        style={{width: 200}}
        date={datenew}
        mode="date"
        format="DD-MM-YYYY"
        customStyles={{
          dateIcon: {
            position: 'relative',
            left: 0,
            top: 0,
            marginLeft: 0
          },
          dateInput: {
            borderColor:'red',
            marginLeft: 36
          },
        }}
        onDateChange={(date) => setDate(date)}
      />
      </View>
    );
  }
  

const styles = StyleSheet.create({
   center : {
     flex:1,
    alignItems: 'center'
   },
    textMenuRed:{
      color:'red'
    }
  });
  
  export default ZapScreen
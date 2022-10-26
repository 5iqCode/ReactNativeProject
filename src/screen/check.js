import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function CheckScreen() {//Чеки
    
    const navigation = useNavigation()
    
    return (
      <View style={styles.center}>
        <Text style = {styles.textMenuRed}>Чеки</Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
   center : {
    alignItems: 'center'
   },
    textMenuRed:{
      color:'red'
    }
  });
  
  export default CheckScreen
import * as React from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


function RegScreen() { // Экран регистрации
    
    const navigation = useNavigation()
    
    return (
      <View style={styles.mainAvt2}>
        <View style ={styles.textLogo} >
         <Image style = {{width:'49%',height:'100%'}} source={
            require('../images/logo-ps.png')
        }/>
        </View>
        <View style={styles.mainAvt}>
        <View style = {styles.login}>
          <Text> Имя: </Text>
          <TextInput style= {styles.loginInput}/>
        </View>
        <View style = {styles.login}>
          <Text>Фамилия: </Text>
          <TextInput style= {styles.loginInput}/>
        </View>
        <View style = {styles.login}>
          <Text>Телефон: </Text>
          <TextInput style= {styles.loginInput}/>
        </View>
        <View style = {styles.login}>
          <Text>Email: </Text>
          <TextInput style= {styles.loginInput}/>
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
          title="Зарегистрироваться"
          onPress={() => navigation.navigate('Регистрация')}
        >
          <Text style ={{color:'white'}}>Зарегистрироваться</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    textLogo: {
      backgroundColor:'#EDEDED',
      width:'100%',
      marginBottom:'20%', 
      height:'25%',
      alignItems:'center'
    },
    mainAvt2: {
      marginTop:'10%',
    },
    mainAvt: {
      flex:1,
      marginTop:'5%',
      marginRight:'10%',
      alignItems:'flex-end',
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

  export default RegScreen
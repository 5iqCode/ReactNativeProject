import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AvtScreen from './src/screen/avtScreen'
import MainScreen from './src/screen/mainScreen'
import RegScreen from './src/screen/regScreen'
import ZapScreen from './src/screen/zap'
import ShahScreen from './src/screen/shah'
import SelectStScreen from './src/screen/selectSt/selectSt'
import RaspScreen from './src/screen/schedule/rasp'
import CheckScreen from './src/screen/check'
import ZabPasScreen from './src/screen/zabPass/zabPasScreen'
import ProfScreen from './src/screen/profile'
import CreateStScreen from './src/screen/selectSt/createSt'
import EnterCodeScreen from './src/screen/zabPass/enterCodeScreen'
import AddRaspScreen from './src/screen/schedule/addRasp'
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios'


export const BaseURLServ = 'NoUrl'


const Stack = createStackNavigator(); // Навигация React Navigation 5.x


export default function App()  {

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Авторизация" component = {AvtScreen}/>
      <Stack.Screen name="Главный экран" component={MainScreen} />
      <Stack.Screen name="Регистрация" component={RegScreen} />
      <Stack.Screen name="Выбор студии" component={SelectStScreen} />
      <Stack.Screen name="Расписание" component={RaspScreen} />
      <Stack.Screen name="Шахматка" component={ShahScreen} />
      <Stack.Screen name="Чеки" component={CheckScreen} />
      <Stack.Screen name="Записи" component={ZapScreen} />
      <Stack.Screen name="Забыли пароль" component={ZabPasScreen} />
      <Stack.Screen name="Код подтверждения" component={EnterCodeScreen} />
      <Stack.Screen name="Профиль" component={ProfScreen} />
      <Stack.Screen name="Добавить тренировку" component={AddRaspScreen} />
      <Stack.Screen name="Создать студию" component={CreateStScreen} /> 
    </Stack.Navigator>
    </NavigationContainer>
  )

}
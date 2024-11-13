import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { routes } from '../../utils/useAppNavigation'

import Landing from './Landing'
import LoginPage from './LoginPage'
import PersonalInfo from './signUpComponents/PersonalInfo'
import Phone from './signUpComponents/Phone'
import Preregistered from './signUpComponents/Preregistered'
import ConfirmPhone from './signUpComponents/ConfirmPhone'
import SignUpPage from './signUpComponents/SignUpPage'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name={routes.Landing} component={Landing} />
      <Stack.Screen name={routes.LoginPage} component={LoginPage} />
      <Stack.Screen name={routes.Phone} component={Phone} />
      <Stack.Screen name={routes.Preregistered} component={Preregistered} />
      <Stack.Screen name={routes.ConfirmPhone} component={ConfirmPhone} />
      <Stack.Screen name={routes.SignUpPage} component={SignUpPage} />
      <Stack.Screen name={routes.PersonalInfo} component={PersonalInfo} />
    </Stack.Navigator>
  )
}

export default AuthStack

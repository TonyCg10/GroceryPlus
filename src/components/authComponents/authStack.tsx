import { createStackNavigator } from '@react-navigation/stack'

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
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <Stack.Screen name="Preregistered" component={Preregistered} />
    </Stack.Navigator>
  )
}

export default AuthStack

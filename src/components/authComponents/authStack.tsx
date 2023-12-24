import { createStackNavigator } from '@react-navigation/stack'

import Landing from './Landing'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import SelectImage from './SelectImage'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="SelectImage" component={SelectImage} />
    </Stack.Navigator>
  )
}

export default AuthStack

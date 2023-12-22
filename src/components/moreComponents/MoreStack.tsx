import { createStackNavigator } from '@react-navigation/stack'

import EditProfile from './EditProfile'
import MyAddress from './MyAddress'

const Stack = createStackNavigator()

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
    </Stack.Navigator>
  )
}

export default MoreStack

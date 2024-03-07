import { createStackNavigator } from '@react-navigation/stack'

import EditProfile from './EditProfile'
import MyAddress from './MyAddress'
import MyOrders from './MyOrdersComponents/MyOrders'
import MyWishlist from './MyWishlists'

const Stack = createStackNavigator()

const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyWishlist" component={MyWishlist} />
    </Stack.Navigator>
  )
}

export default MoreStack

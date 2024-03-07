import { createStackNavigator } from '@react-navigation/stack'

import Notifications from '../share/Notification'
import BottomRoutes from './BottomRoutes'
import ProductDetails from '../share/ProductDetails'
import Search from '../components/searchComponents/Search'
import MoreStack from '../components/moreComponents/MoreStack'
import CategoryLists from '../share/CategoryLists'
import AuthStack from '../components/authComponents/authStack'

const Stack = createStackNavigator()

const GlobalRoutes = () => {
  try {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
        <Stack.Screen name="MoreStack" component={MoreStack} />

        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Searcher" component={Search} />
        <Stack.Screen name="CategoryLists" component={CategoryLists} />
      </Stack.Navigator>
    )
  } catch (error) {
    console.error('Error in rendering Search component:', error)
    return null
  }
}

export default GlobalRoutes

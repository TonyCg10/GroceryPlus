import { createStackNavigator } from '@react-navigation/stack'
import { routes } from '../utils/useAppNavigation'

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
        <Stack.Screen name={routes.AuthStack} component={AuthStack} />
        <Stack.Screen name={routes.BottomRoutes} component={BottomRoutes} />
        {/* <Stack.Screen name={routes.MoreStack} component={MoreStack} /> */}

        <Stack.Screen name={routes.Notifications} component={Notifications} />
        <Stack.Screen name={routes.ProductDetails} component={ProductDetails} />
        {/* <Stack.Screen name={routes.Searcher} component={Search} /> */}
        <Stack.Screen name={routes.CategoryLists} component={CategoryLists} />
      </Stack.Navigator>
    )
  } catch (error) {
    console.error('Error in rendering Search component:', error)
    return null
  }
}

export default GlobalRoutes

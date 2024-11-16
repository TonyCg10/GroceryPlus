import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet, Platform } from 'react-native'
import { routes } from '../utils/useAppNavigation'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomePage from '../components/HomePage'
import Category from '../components/Category'
import MyBag from '../components/myBagComponents/MyBag'
import More from '../components/moreComponents/More'

const Tab = createBottomTabNavigator()

const BottomRoutes = () => {
  try {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName = ''
            const style = StyleSheet.create({
              container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 30,
                marginTop: focused ? 20 : 30,
                backgroundColor: focused ? '#5EC401' : 'transparent'
              }
            })

            if (route.name === routes.HomePage) {
              iconName = 'home-outline'
            } else if (route.name === routes.Category) {
              iconName = 'view-dashboard-outline'
            } else if (route.name === routes.MyBag) {
              iconName = 'bag-personal'
            } else if (route.name === routes.More) {
              iconName = 'card-account-details-outline'
            }

            return (
              <View style={style.container}>
                <MaterialCommunityIcons
                  name={iconName}
                  color={focused ? 'white' : 'black'}
                  size={24}
                />
              </View>
            )
          },
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: Platform.OS === 'android' ? 80 : 100,
            position: 'absolute'
          },
          tabBarShowLabel: false
        })}>
        <Tab.Screen name={routes.HomePage} component={HomePage} />
        <Tab.Screen name={routes.Category} component={Category} />
        <Tab.Screen name={routes.MyBag} component={MyBag} />
        <Tab.Screen name={routes.More} component={More} />
      </Tab.Navigator>
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export default BottomRoutes

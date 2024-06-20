import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet, Platform } from 'react-native'

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
              focuse: {
                backgroundColor: '#5EC401',
                height: 50,
                width: 50,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }
            })

            if (route.name === 'HomePage') {
              iconName = 'home-outline'
            } else if (route.name === 'Category') {
              iconName = 'view-dashboard-outline'
            } else if (route.name === 'MyBag') {
              iconName = 'bag-personal'
            } else if (route.name === 'More') {
              iconName = 'card-account-details-outline'
            }

            return (
              <View style={focused && style.focuse}>
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
            position: 'absolute',
            height: Platform.OS === 'android' ? 80 : 100
          },
          tabBarShowLabel: false
        })}>
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="MyBag" component={MyBag} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export default BottomRoutes

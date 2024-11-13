import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet, Platform } from 'react-native'
import { routes } from '../utils/useAppNavigation'

import React from 'react'
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
        <Tab.Screen name={routes.HomePage} component={HomePage} />
        <Tab.Screen name={routes.Category} component={Category} />
        {/* <Tab.Screen name={routes.MyBag} component={MyBag} /> */}
        {/* <Tab.Screen name={routes.More} component={More} /> */}
      </Tab.Navigator>
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export default BottomRoutes

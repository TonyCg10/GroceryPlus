import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import GroceryPlusIcon from '../../assets/GroceryPlus.svg'

const WelcomePage = ({ navigation }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const counter = count + 1
      setCount(counter)
    }, 1000)
    if (count == 2) {
      navigation.navigate('BottomRoutes')
    }

    return () => clearTimeout(timer)
  }, [count])

  return (
    <View style={welcomePageStyle.container}>
      <View style={welcomePageStyle.content}>
        <GroceryPlusIcon />
      </View>
      <Text style={welcomePageStyle.text}>Grocery Plus</Text>
    </View>
  )
}

export default WelcomePage

const welcomePageStyle = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  text: {
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
  },
})

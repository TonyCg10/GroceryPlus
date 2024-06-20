import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { useEffect } from 'react'
import { useGroceryData } from '../../../store/database/GroceryData'

import GroceryPlus from '../../../assets/GroceryPlus.svg'

const Landing = ({ navigation }) => {
  const { fetched } = useGroceryData()

  useEffect(() => {
    fetched()
  }, [])

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <View style={landingStyles.container}>
        <View style={landingStyles.icon}>
          <GroceryPlus width={260} height={260} />
        </View>
        <View style={landingStyles.options}>
          <TouchableOpacity
            style={landingStyles.login}
            onPress={() => navigation.navigate('LoginPage')}>
            <Text style={landingStyles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={landingStyles.signUp}
            onPress={() => {
              navigation.navigate('Phone')
            }}>
            <Text style={landingStyles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Landing

const landingStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flex: 1
  },
  options: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1
  },
  login: {
    padding: '4%',
    minWidth: '65%',
    backgroundColor: '#5EC401',
    marginVertical: '3%',
    borderRadius: 10
  },
  signUp: {
    padding: '4%',
    minWidth: '65%',
    backgroundColor: '#F37A20',
    marginVertical: '3%',
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
})

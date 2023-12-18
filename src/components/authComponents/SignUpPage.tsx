import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native'
import { useAuthStore, AuthState } from '../../../store/authStore.store'
import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { basePagesStyle } from '../../indexStyle/baseStyle'

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState('antonio corcoba')
  const [email, setEmail] = useState('antoniocorcoba54@gmail.com')
  const [password, setPassword] = useState('ToNy54Cg19V')
  const [phone, setPhone] = useState('8102873196')

  const { setUserName, setUserEmail, setUserPassword, setUserPhone } =
    useAuthStore((state: AuthState) => state)

  const handleOnPress = () => {
    if (name != '' && email != '' && password != '' && phone != '') {
      setUserName(name)
      setUserEmail(email)
      setUserPassword(password)
      setUserPhone(phone)

      navigation.navigate('BottomRoutes')
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Sign Up"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={loginPageStyle.content}>
        <TextInput
          placeholder="First Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
        <Pressable onPress={handleOnPress}>
          <Text>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default SignUpPage

const loginPageStyle = StyleSheet.create({
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

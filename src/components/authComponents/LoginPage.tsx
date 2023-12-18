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
import { basePagesStyle } from '../../indexStyle/baseStyle'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../share/utils/Header'

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('antoniocorcoba54@gmail.com')
  const [password, setPassword] = useState('ToNy54Cg19V')

  const { setUserEmail, setUserPassword } = useAuthStore(
    (state: AuthState) => state,
  )

  const handleOnPress = () => {
    if (email != '' && password != '') {
      setUserEmail(email)
      setUserPassword(password)

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
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Pressable onPress={handleOnPress}>
          <Text>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default LoginPage

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

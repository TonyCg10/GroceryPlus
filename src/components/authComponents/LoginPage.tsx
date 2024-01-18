import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { AuthLogic, regexType, userInputType } from './utils/utils'
import { UserState, useUserStore } from '../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../share/utils/InputUser'
import { ip } from '../authComponents/utils/utils'

import axios from 'axios'
import GroceryPlus from '../../../assets/GroceryPlus.svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginPage = ({ navigation }) => {
  const { setUser } = useUserStore((state: UserState) => state)
  const isKeyboardVisible = AuthLogic()

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [email, setEmail] = useState('ac@gmail.com')
  // const [email, setEmail] = useState('cc@gmail.com')
  const [password, setPassword] = useState('123qwe&')
  // const [password, setPassword] = useState('qwe123&')

  const handleOnLogin = async () => {
    try {
      const response = await axios.post(`http://${ip}:2020/check-user`, {
        email,
        password
      })

      if (response.status === 200) {
        const { data } = response

        if (data.exists) {
          setUser({
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            password: data.user.password,
            phone: data.user.phone,
            img: data.user.img,
            productId: data.user.productId
          })

          console.log('Logged In')
          navigation.navigate('BottomRoutes')
        }
      } else {
        console.log('Unexpected response:', response)
        Alert.alert('Unexpected response')
      }
    } catch (error) {
      Alert.alert('User not found', ' Please try again.')
    }
  }

  const logNotValid = () => {
    if (regexType.emailRegex.test(email) && regexType.passwordRegex.test(password)) return true
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Login"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <GroceryPlus width={260} height={260} />
          </View>
        )}

        <View style={authPagesStyles.inputContainer}>
          <InputUser
            icon={<MaterialCommunityIcons name="email-outline" size={24} />}
            label={userInputType.email}
            input={email}
            setInput={setEmail}
          />
          <InputUser
            icon={<Octicons name="lock" size={22} />}
            label={userInputType.password}
            input={password}
            setInput={setPassword}
          />
        </View>
        <TouchableOpacity
          disabled={!logNotValid()}
          style={[authPagesStyles.button, !logNotValid() && authPagesStyles.disabledBtn]}
          onPress={() => {
            handleOnLogin()
          }}>
          <Text style={authPagesStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginPage

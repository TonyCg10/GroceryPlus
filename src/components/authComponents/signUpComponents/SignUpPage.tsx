import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import { AuthLogic, regexType, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { showMessage } from 'react-native-flash-message'
import { routes, useAppNavigation } from '../../../utils/useAppNavigation'

import SetPassw from '../../../../assets/Mobile login-pana.svg'
import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUpPage = () => {
  const navigation = useAppNavigation()
  const { user, createNewUser } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [email, setEmail] = useState('ac@gmail.com')
  // const [email, setEmail] = useState('cc@gmail.com')
  const [password, setPassword] = useState('123qwe&')
  // const [password, setPassword] = useState('923qwe%')
  const [confirmPw, setConfirmPw] = useState('123qwe&')
  // const [confirmPw, setConfirmPw] = useState('923qwe%')

  const handleOnSignUp = () => {
    if (
      regexType.emailRegex.test(email) &&
      password === confirmPw &&
      regexType.passwordRegex.test(password) &&
      regexType.passwordRegex.test(confirmPw)
    ) {
      createNewUser({
        name: '-',
        email: email,
        password: confirmPw,
        phone: user.phone,
        img: null,
        stripeCustomerId: '-'
      })
        .then((createdUser) => {
          if (createdUser) {
            showMessage({
              message: `Successful Sign Up!`,
              type: 'success',
              icon: 'success',
              hideStatusBar: true
            })
            console.log('#####')
            console.log(createdUser)
            console.log('#####')
            navigation.navigate(routes.PersonalInfo)
          }
        })
        .catch((error) => {
          Alert.alert(`An error has occurred. Please try again`)
          console.error('Error signing up:', error)
        })
    } else {
      Alert.alert(`Please ensure all fields are filled correctly`)
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header title="Sign Up" />
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <SetPassw />
          </View>
        )}

        <ScrollView
          style={authPagesStyles.scrollInputContainer}
          showsVerticalScrollIndicator={false}>
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
          <InputUser
            icon={<Octicons name="lock" size={22} />}
            label={userInputType.confirmPw}
            input={confirmPw}
            setInput={setConfirmPw}
          />
        </ScrollView>

        <TouchableOpacity
          disabled={email === '' && password === '' && confirmPw !== password}
          style={[
            authPagesStyles.button,
            email === '' && password === '' && confirmPw !== password && authPagesStyles.disabledBtn
          ]}
          onPress={() => {
            handleOnSignUp()
          }}>
          <Text style={authPagesStyles.btnText}>Next</Text>
          <AntDesign size={22} name="arrowright" color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignUpPage

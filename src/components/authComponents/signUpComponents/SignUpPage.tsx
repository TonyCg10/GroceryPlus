import { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { basePagesStyle } from '../../../indexStyle/baseStyle'
import { AuthLogic, regexType, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { ip } from '../utils/utils'
import { showMessage } from 'react-native-flash-message'

import SetPassw from '../../../../assets/Mobile login-pana.svg'
import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUpPage = ({ navigation }) => {
  const { setUser, user } = useUserStore((state: UserState) => state)
  const isKeyboardVisible = AuthLogic()

  const [email, setEmail] = useState('ac@gmail.com')
  const [password, setPassword] = useState('123qwe&')
  const [confirmPw, setConfirmPw] = useState('123qwe&')

  const handleOnSignUp = async () => {
    try {
      if (
        regexType.emailRegex.test(email) &&
        password === confirmPw &&
        regexType.passwordRegex.test(password) &&
        regexType.passwordRegex.test(confirmPw)
      ) {
        const response = await fetch(`http://${ip}:2020/check-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!data.exists) {
          setUser({ email: email, password: password })
          showMessage({
            icon: 'success',
            message: 'Successful Login',
            type: 'success'
          })
          navigation.navigate('PersonalInfo')
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      Alert.alert('Sign-up failed', 'Failed to sign up. Please try again.')
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
          disabled={email === '' && password === ''}
          style={[
            authPagesStyles.button,
            email === '' && password === '' && authPagesStyles.disabledBtn
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

import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { AuthLogic, regexType, userInputType } from './utils/utils'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import InputUser, { authPagesStyles } from '../../share/utils/InputUser'
import { showMessage } from 'react-native-flash-message'
import { routes, useAppNavigation } from '../../utils/useAppNavigation'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SheetModal from '../../share/utils/SheetModal'

const LoginPage = () => {
  const navigation = useAppNavigation()
  const { fetchUserData, user } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  const [modalVisible, setModalVisible] = useState(false)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [email, setEmail] = useState('ac@gmail.com')
  // const [email, setEmail] = useState('cc@gmail.com')
  const [password, setPassword] = useState('123qwe&')
  // const [password, setPassword] = useState('923qwe%')

  const handleOnLogin = async () => {
    try {
      await fetchUserData({
        email,
        password
      })

      if (user) {
        showMessage({
          message: `Successful Login! ${user.name}`,
          type: 'success',
          icon: 'success',
          hideStatusBar: true
        })

        navigation.navigate(routes.BottomRoutes)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        setModalVisible(true)
      } else {
        Alert.alert('An error has occurred. Please try again.')
        console.error('Error logging in:', error)
      }
    }
  }

  const logNotValid = () => {
    if (regexType.emailRegex.test(email) && regexType.passwordRegex.test(password)) return true
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content="User does not exists"
        redBtn={true}
        redContent="Close"
        redAction={() => setModalVisible(false)}
      />
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

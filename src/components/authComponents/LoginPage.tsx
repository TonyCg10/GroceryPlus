import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import {
  DatabaseStore,
  useUserDatabaseStore,
} from '../../../store/database/userDatabase'
import { regexType, userInputType } from './utils/utils'
import { UserState, useUserStore } from '../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../share/utils/InputUser'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginPage = ({ navigation }) => {
  const { getUserByEmailAndPasswordOrPhone } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { setUser } = useUserStore((state: UserState) => state)

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('ac@gmail.com')
  const [email, setEmail] = useState('cc@gmail.com')
  // const [password, setPassword] = useState('123qwe&')
  const [password, setPassword] = useState('qwe123&')

  const handleOnLogin = async () => {
    const findUser = await getUserByEmailAndPasswordOrPhone(email, password, '')

    if (findUser) {
      setUser(findUser)
      try {
        console.log('Logged In')

        navigation.navigate('BottomRoutes')
      } catch (error) {
        console.error('Error handling new user:', error)
      }
    } else {
      Alert.alert('User doesn`t exist')
      console.log('User doesn`t exist')
    }
  }

  const logNotValid = () => {
    if (
      regexType.emailRegex.test(email) &&
      regexType.passwordRegex.test(password)
    )
      return true
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Login"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={authPagesStyles.container}>
        <View style={authPagesStyles.icon}>
          <GroceryPlus width={160} height={160} />
        </View>
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
          style={[
            authPagesStyles.button,
            !logNotValid() && authPagesStyles.disabledBtn,
          ]}
          onPress={() => {
            handleOnLogin()
          }}
        >
          <Text style={authPagesStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginPage

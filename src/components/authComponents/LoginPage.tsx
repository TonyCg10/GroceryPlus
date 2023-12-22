import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import {
  DatabaseStore,
  useUserDatabaseStore,
} from '../../../store/authStore.store'
import { emailRegex, passwordRegex } from './utils/utils'
import { UserState, useUserStore } from '../../../store/userStore.store'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../share/utils/Header'

const LoginPage = ({ navigation }) => {
  const { fetchUsers, getUserByEmailAndPasswordOrPhone } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { setUser } = useUserStore((state: UserState) => state)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const [email, setEmail] = useState('')
  // const [email, setEmail] = useState('ac@gmail.com')
  // const [email, setEmail] = useState('cc@gmail.com')
  const [password, setPassword] = useState('')
  // const [password, setPassword] = useState('123$qwe')
  // const [password, setPassword] = useState('qwe$321')

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
    if (emailRegex.test(email) && passwordRegex.test(password)) return true
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Login"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={loginPageStyle.content}>
        <View style={loginPageStyle.icon}>
          <GroceryPlus width={160} height={160} />
        </View>
        <View style={loginPageStyle.inputContent}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={[
              loginPageStyle.input,
              !emailRegex.test(email) && loginPageStyle.invalidInput,
            ]}
          />
          <Text>{!emailRegex.test(email) && 'Bad Email'}</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={[
              loginPageStyle.input,
              !passwordRegex.test(password) && loginPageStyle.invalidInput,
            ]}
          />
          <Text>{!passwordRegex.test(password) && 'Bad Password'}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            disabled={!logNotValid()}
            style={[
              loginPageStyle.button,
              !logNotValid() && loginPageStyle.notValid,
            ]}
            onPress={() => {
              handleOnLogin()
            }}
          >
            <Text style={loginPageStyle.inputText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginPage

const loginPageStyle = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  content: {
    marginBottom: '10%',
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: '#5EC401',
    flexGrow: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    maxHeight: '20%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginVertical: '2%',
    paddingLeft: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  notValid: {
    backgroundColor: '#A9CEC2',
  },
  inputContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

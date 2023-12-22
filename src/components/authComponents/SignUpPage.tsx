import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { emailRegex, passwordRegex, phoneRegex } from './utils/utils'
import {
  DatabaseStore,
  User,
  useUserDatabaseStore,
} from '../../../store/authStore.store'
import { UserState, useUserStore } from '../../../store/userStore.store'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SignUpPage = ({ navigation }) => {
  const { insertUser, getUserByEmailAndPasswordOrPhone } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { setUser } = useUserStore((state: UserState) => state)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [isValid, setIsValid] = useState(false)
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')

  const handleOnSignUp = async () => {
    const formatName = name.split(' ')

    let firstName =
      formatName[0].charAt(0).toLocaleUpperCase() + formatName[0].slice(1)
    let lastName =
      formatName[1].charAt(0).toLocaleUpperCase() + formatName[1].slice(1)

    if (
      firstName &&
      lastName &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      phone
    ) {
      const newUser: User = {
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
        phone: phone,
      }

      const findUser = await getUserByEmailAndPasswordOrPhone(
        email,
        password,
        phone,
      )

      if (!findUser) {
        try {
          console.log('Signed In')
          await insertUser(newUser)
          setUser(newUser)

          navigation.navigate('BottomRoutes')
        } catch (error) {
          console.error('Error handling new user:', error)
        }
      } else {
        console.log('User already exist')
      }
    }
  }

  const handlePhoneNumberChange = (number: string) => {
    const numericInput = number.replace(/\D/g, '')
    const isValidPhoneNumber = phoneRegex.test(numericInput)
    const formattedNumber = numericInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    )

    setPhone(numericInput)
    setFormattedPhoneNumber(formattedNumber)
    setIsValid(isValidPhoneNumber)
  }

  const signUpNotValid = () => {
    if (
      name &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      isValid
    )
      return true
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Sign Up"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={signUpPageStyle.content}>
        <View style={signUpPageStyle.icon}>
          <GroceryPlus width={160} height={160} />
        </View>
        <View style={signUpPageStyle.inputContent}>
          <TextInput
            style={[
              signUpPageStyle.input,
              !name && signUpPageStyle.invalidInput,
            ]}
            placeholder="Full Name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            style={[
              signUpPageStyle.input,
              !emailRegex.test(email) && signUpPageStyle.invalidInput,
            ]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text>{!emailRegex.test(email) && 'Bad Email'}</Text>
          <TextInput
            style={[
              signUpPageStyle.input,
              !passwordRegex.test(password) && signUpPageStyle.invalidInput,
            ]}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Text>{!passwordRegex.test(password) && 'Bad Password'}</Text>
          <TextInput
            style={[
              signUpPageStyle.input,
              !phone && signUpPageStyle.invalidInput,
            ]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formattedPhoneNumber}
            onChangeText={(number) => handlePhoneNumberChange(number)}
          />
          <Text>{!phoneRegex.test(phone) && 'Bad Phone Number'}</Text>
        </View>

        <TouchableOpacity
          disabled={!signUpNotValid()}
          style={[
            signUpPageStyle.button,
            !signUpNotValid() && signUpPageStyle.notValid,
          ]}
          onPress={() => {
            handleOnSignUp()
          }}
        >
          <Text style={signUpPageStyle.inputText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignUpPage

const signUpPageStyle = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  icon: {
    flex: 5,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  content: {
    marginBottom: '10%',
    flex: 1,
  },
  inputContent: {
    alignItems: 'center',
    flex: 10,
    justifyContent: 'center',
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
  button: {
    flex: 1,
    backgroundColor: '#5EC401',
    flexGrow: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  notValid: {
    backgroundColor: '#A9CEC2',
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

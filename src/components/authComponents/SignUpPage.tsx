import { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { AuthLogic, regexType, userInputType } from './utils/utils'
import { UserState, useUserStore } from '../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../share/utils/InputUser'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUpPage = ({ navigation }) => {
  const { setUser, user } = useUserStore((state: UserState) => state)
  const isKeyboardVisible = AuthLogic()

  const [name, setName] = useState('antonio corcoba')
  const [email, setEmail] = useState('ac@gmail.com')
  const [password, setPassword] = useState('123qwe&')
  const [phone, setPhone] = useState('1234567890')

  const handleOnSignUp = async () => {
    try {
      const formatName = name.split(' ')
      const firstName = formatName[0].charAt(0).toUpperCase() + formatName[0].slice(1)
      const lastName = formatName[1].charAt(0).toUpperCase() + formatName[1].slice(1)

      if (
        firstName &&
        lastName &&
        regexType.emailRegex.test(email) &&
        regexType.passwordRegex.test(password) &&
        regexType.phoneRegex.test(phone)
      ) {
        const ip = '10.0.0.139'
        const response = await fetch(`http://${ip}:2020/check-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, phone })
        })

        const data = await response.json()

        if (!data.exists) {
          const ip = '10.0.0.139'
          const signUpResponse = await fetch(`http://${ip}:2020/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id: user._id,
              name: `${firstName} ${lastName}`,
              email,
              password,
              phone,
              img: '',
              productId: []
            })
          })

          if (!signUpResponse.ok) {
            throw new Error('Sign-up failed')
          }

          const insertedUser = await signUpResponse.json()

          setUser(insertedUser)

          console.log('Signed Up')
          navigation.navigate('SelectImage')
        } else {
          Alert.alert('User already exists')
          console.log('User already exists')
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      Alert.alert('Sign-up failed', 'Failed to sign up. Please try again.')
    }
  }

  const signUpNotValid = () => {
    if (
      name &&
      regexType.emailRegex.test(email) &&
      regexType.passwordRegex.test(password) &&
      regexType.phoneRegex.test(phone)
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
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <GroceryPlus width={240} height={240} />
          </View>
        )}

        <ScrollView
          style={authPagesStyles.scrollInputContainer}
          showsVerticalScrollIndicator={false}>
          <InputUser
            icon={<Octicons name="person" size={24} />}
            label={userInputType.name}
            input={name}
            setInput={setName}
          />
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
            icon={<MaterialCommunityIcons name="phone-outline" size={22} />}
            label={userInputType.phone}
            input={phone}
            setInput={setPhone}
          />
        </ScrollView>

        <TouchableOpacity
          disabled={!signUpNotValid()}
          style={[authPagesStyles.button, !signUpNotValid() && authPagesStyles.disabledBtn]}
          onPress={() => {
            handleOnSignUp()
          }}>
          <Text style={authPagesStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignUpPage

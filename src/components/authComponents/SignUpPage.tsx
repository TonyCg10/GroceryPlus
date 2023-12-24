import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { regexType, userInputType } from './utils/utils'
import {
  DatabaseStore,
  User,
  useUserDatabaseStore,
} from '../../../store/authStore.store'
import { UserState, useUserStore } from '../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../share/utils/InputUser'

import GroceryPlus from '../../../assets/GroceryPlus.svg'
import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUpPage = ({ navigation }) => {
  const { insertUser, getUserByEmailAndPasswordOrPhone } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { setUser } = useUserStore((state: UserState) => state)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleOnSignUp = async () => {
    const formatName = name.split(' ')

    let firstName =
      formatName[0].charAt(0).toLocaleUpperCase() + formatName[0].slice(1)
    let lastName =
      formatName[1].charAt(0).toLocaleUpperCase() + formatName[1].slice(1)

    if (
      firstName &&
      lastName &&
      regexType.emailRegex.test(email) &&
      regexType.passwordRegex.test(password) &&
      regexType.phoneRegex.test(phone)
    ) {
      const newUser = {
        id: 0,
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
        phone: phone,
        img: '',
      }

      const findUser = await getUserByEmailAndPasswordOrPhone(
        email,
        password,
        phone,
      )

      if (!findUser) {
        try {
          const insertedId = await insertUser(newUser)
          const userWithId = { ...newUser, id: insertedId }
          setUser(userWithId)

          console.log('Signed In')
          navigation.navigate('SelectImage')
        } catch (error) {
          console.error('Error handling new user:', error)
        }
      } else {
        Alert.alert('User already exist')
        console.log('User already exist')
      }
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
        <View style={authPagesStyles.icon}>
          <GroceryPlus width={160} height={160} />
        </View>

        <ScrollView
          style={authPagesStyles.scrollInputContainer}
          showsVerticalScrollIndicator={false}
        >
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
          style={[
            authPagesStyles.button,
            !signUpNotValid() && authPagesStyles.disabledBtn,
          ]}
          onPress={() => {
            handleOnSignUp()
          }}
        >
          <Text style={authPagesStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignUpPage

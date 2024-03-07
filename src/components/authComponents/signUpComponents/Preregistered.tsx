import { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { basePagesStyle } from '../../../indexStyle/baseStyle'
import { AuthLogic, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { showMessage } from 'react-native-flash-message'
import { IP, PORT, USER } from '../../../../express/utils'

import Password from '../../../../assets/Forgot password-rafiki.svg'
import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import axios from 'axios'

const Preregistered = ({ navigation }) => {
  const { setUser } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  // const [password, setPassword] = useState('123qwe&')
  const [password, setPassword] = useState('923qwe%')

  const handleOnLogin = async () => {
    try {
      const response = await axios.post(`http://${IP}:${PORT}/${USER}/check-user`, {
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
          showMessage({
            icon: 'success',
            message: 'Successful Login',
            type: 'success'
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

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Sign In"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <Password />
          </View>
        )}

        <View style={{ flex: 0.3, justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Enter the Password</Text>
          <Text style={{ fontWeight: '300' }}>
            It looks like you already have an account in this number. Please enter the password to
            proceed
          </Text>
        </View>

        <View style={authPagesStyles.scrollInputContainer}>
          <InputUser
            icon={<Octicons name="lock" size={22} />}
            label={userInputType.password}
            input={password}
            setInput={setPassword}
          />

          <Text style={{ marginTop: '15%', color: '#F37A20' }}>Forgot Password</Text>
        </View>

        <TouchableOpacity
          disabled={!signUpNotValid('password', password)}
          style={[
            authPagesStyles.button,
            !signUpNotValid('password', password) && authPagesStyles.disabledBtn
          ]}
          onPress={() => {
            handleOnLogin()
          }}>
          <Text style={authPagesStyles.btnText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Preregistered

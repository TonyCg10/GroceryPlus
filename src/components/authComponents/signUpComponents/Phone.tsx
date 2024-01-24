import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { basePagesStyle } from '../../../indexStyle/baseStyle'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic, ip, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'

import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PhoneNumber from '../../../../assets/undraw_personalization_triu.svg'

const Phone = ({ navigation }) => {
  const { setUser } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  const [phone, setPhone] = useState('8102873196')

  const handleOnSetPhone = async () => {
    try {
      if (regexType.phoneRegex.test(phone)) {
        const response = await fetch(`http://${ip}:2020/check-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phone })
        })

        const data = await response.json()

        if (!data.exists) {
          setUser({ phone: phone })
          showMessage({
            icon: 'info',
            message: 'Verify your number',
            type: 'info'
          })
          navigation.navigate('ConfirmPhone')
        } else {
          showMessage({
            icon: 'warning',
            message: 'Looks like you already have account',
            type: 'warning'
          })
          navigation.navigate('Preregistered')
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Phone Number"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <PhoneNumber />
          </View>
        )}

        <View style={{ flex: 0.3, justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Enter your mobile number</Text>
          <Text style={{ fontWeight: '300' }}>
            We need to verify you. We will send you a one time verification code.{' '}
          </Text>
        </View>

        <View style={authPagesStyles.scrollInputContainer}>
          <InputUser
            icon={<MaterialCommunityIcons name="phone-outline" size={22} />}
            label={userInputType.phone}
            input={phone}
            setInput={setPhone}
          />
        </View>

        <TouchableOpacity
          disabled={!signUpNotValid('phone', phone)}
          style={[
            authPagesStyles.button,
            !signUpNotValid('phone', phone) && authPagesStyles.disabledBtn
          ]}
          onPress={() => {
            handleOnSetPhone()
          }}>
          <Text style={authPagesStyles.btnText}>Next</Text>
          <AntDesign size={22} name="arrowright" color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Phone

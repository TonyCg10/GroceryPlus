import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../core/store/userStore.store'
import { showMessage } from 'react-native-flash-message'
import { routes, useAppNavigation } from '../../../utils/useAppNavigation'

import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PhoneNumber from '../../../../assets/undraw_personalization_triu.svg'

const Phone = () => {
  const { fetchUserData, setUser } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()
  const navigation = useAppNavigation()

  // const [phone, setPhone] = useState('')
  const [phone, setPhone] = useState('1299559955')
  // const [phone, setPhone] = useState('5599559912')

  const handleOnSetPhone = async () => {
    if (regexType.phoneRegex.test(phone)) {
      fetchUserData({ phone })
        .then(() => {
          showMessage({
            message: 'Looks like you already have an account',
            type: 'warning',
            icon: 'warning',
            hideStatusBar: true
          })

          navigation.navigate(routes.Preregistered)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setUser({ phone })
            showMessage({
              message: 'Verify your number',
              type: 'info',
              icon: 'info',
              hideStatusBar: true
            })

            navigation.navigate(routes.ConfirmPhone)
          } else {
            console.error('Error fetching user data:', error)
          }
        })
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

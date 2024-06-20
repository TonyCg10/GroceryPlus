import { SafeAreaView, TouchableOpacity, View, Text, Alert } from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { URL, USER } from '../../../../express/utils'

import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PhoneNumber from '../../../../assets/undraw_personalization_triu.svg'
import axios from 'axios'

const Phone = ({ navigation }) => {
  const { setUser, user } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  // const [phone, setPhone] = useState('')
  const [phone, setPhone] = useState('1299559955')
  // const [phone, setPhone] = useState('5599559912')

  const handleOnSetPhone = async () => {
    try {
      if (regexType.phoneRegex.test(phone)) {
        const response = await axios.post(`${URL}/${USER}/check-user`, {
          phone
        })
        const { data } = response

        if (!data.exists) {
          setUser({ phone: phone })
          showMessage({
            message: 'Verify your number',
            type: 'info',
            icon: 'info',
            hideStatusBar: true
          })
          navigation.navigate('ConfirmPhone')
        } else {
          showMessage({
            message: 'Looks like you already have account',
            type: 'warning',
            icon: 'warning',
            hideStatusBar: true
          })

          console.log('#####')
          console.log(data)
          console.log('#####')

          navigation.navigate('Preregistered')
        }
      }
    } catch (error) {
      Alert.alert(`An error has ocurred. Please try again`)
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

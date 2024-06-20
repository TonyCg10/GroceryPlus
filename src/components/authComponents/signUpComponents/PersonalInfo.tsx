import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert
} from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import { useState } from 'react'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import { showMessage } from 'react-native-flash-message'
import { PAYMENT, URL, USER } from '../../../../express/utils'

import Header from '../../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import ImageComponent from '../../../share/utils/ImageComponent'
import axios from 'axios'

const PersonalInfo = ({ navigation, route }) => {
  const { setUser, user } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('antonio corcoba')
  // const [name, setName] = useState('camila capella')

  const handleSetPersonalInfo = async () => {
    try {
      const formatName = name.split(' ')
      const firstName = formatName[0].charAt(0).toUpperCase() + formatName[0].slice(1)
      const lastName = formatName[1].charAt(0).toUpperCase() + formatName[1].slice(1)
      const fullName = firstName + ' ' + lastName

      if (regexType.nameRegex.test(fullName)) {
        // const stripeId = await axios.post(`${URL}/${PAYMENT}/add-customer`, {
        //   email: user.email,
        //   name: fullName,
        //   phone: user.phone
        // })
        // const { data } = stripeId

        // if (data.data) {
          const response = await axios.put(`${URL}/${USER}/update-user/${user._id}`, {
            name: fullName,
            // stripeCustomerId: stripeId.data.data
          })
          const { data } = response

          if (response.status === 200) {
            setUser({ name: fullName, 
              // stripeCustomerId: stripeId.data.data
             })

            showMessage({
              message: `Welcome! ${fullName}`,
              type: 'success',
              icon: 'success',
              hideStatusBar: true
            })

            console.log('#####')
            console.log(data)
            console.log('#####')

            navigation.navigate('BottomRoutes')
          }
        // }
      }
    } catch (error) {
      Alert.alert(`An error has ocurred. Please try again`)
      console.error('Error signing up:', error)
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header title="Your Information" />
      <View style={authPagesStyles.container}>
        <Text>
          It looks like you don’t have account in this number. Please let us know some information
          for a secure service
        </Text>

        <View style={styles.container}>
          {!isKeyboardVisible && (
            <ImageComponent setModalVisible={setModalVisible} route={route.name} />
          )}
        </View>

        <ScrollView
          style={authPagesStyles.scrollInputContainer}
          showsVerticalScrollIndicator={false}>
          <InputUser
            icon={<Octicons name="person" size={24} />}
            label={userInputType.name}
            input={name}
            setInput={setName}
          />
        </ScrollView>

        <TouchableOpacity
          disabled={!signUpNotValid('name', name)}
          style={[
            authPagesStyles.button,
            !signUpNotValid('name', name) && authPagesStyles.disabledBtn
          ]}
          onPress={() => {
            handleSetPersonalInfo()
          }}>
          <Text style={authPagesStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PersonalInfo

const styles = StyleSheet.create({
  container: {
    flex: 1.5
  }
})

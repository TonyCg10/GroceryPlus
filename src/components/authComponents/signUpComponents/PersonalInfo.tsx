import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert
} from 'react-native'
import { basePagesStyle } from '../../../indexStyle/baseStyle'
import { useState } from 'react'
import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../../store/userStore.store'
import { showMessage } from 'react-native-flash-message'

import Header from '../../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import ImageComponent from '../../../share/utils/ImageComponent'
import axios from 'axios'
import { IP, PORT, USER } from '../../../../express/utils'

const PersonalInfo = ({ navigation, route }) => {
  const { setUser, user } = useUserStore((state: UserState) => state)
  const [modalVisible, setModalVisible] = useState(false)

  const isKeyboardVisible = AuthLogic()

  // const [name, setName] = useState('antonio corcoba')
  const [name, setName] = useState('camila capella')

  const handleSetPersonalInfo = async () => {
    try {
      const formatName = name.split(' ')
      const firstName = formatName[0].charAt(0).toUpperCase() + formatName[0].slice(1)
      const lastName = formatName[1].charAt(0).toUpperCase() + formatName[1].slice(1)
      const fullName = firstName + ' ' + lastName

      if (regexType.nameRegex.test(fullName)) {
        const response = await axios.post(`http://${IP}:${PORT}/${USER}/users`, {
          _id: user._id,
          name: fullName,
          email: user.email,
          password: user.password,
          phone: user.phone,
          img: user.img
        })
        if (response.status === 201) {
          setUser(response.data.data)
          showMessage({
            icon: 'success',
            message: `Welcome! ${fullName}`,
            type: 'success'
          })
          navigation.navigate('BottomRoutes')
        } else {
          throw new Error('Failed to update user')
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      Alert.alert('Sign-up failed', 'Failed to sign up. Please try again.')
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
          <ImageComponent setModalVisible={setModalVisible} route={route.name} />
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

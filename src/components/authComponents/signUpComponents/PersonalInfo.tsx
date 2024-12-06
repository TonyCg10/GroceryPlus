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
import { AuthLogic, regexType, signUpNotValid, userInputType } from '../utils/utils'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import { showMessage } from 'react-native-flash-message'
import { routes, useAppNavigation } from '../../../utils/useAppNavigation'
import { useRoute } from '@react-navigation/native'

import InputUser, { authPagesStyles } from '../../../share/utils/InputUser'

import Header from '../../../share/utils/Header'
import Octicons from 'react-native-vector-icons/Octicons'
import ImageComponent from '../../../share/utils/ImageComponent'
import SheetModal from '../../../share/utils/SheetModal'

const PersonalInfo = () => {
  const { setUser, user, updateAUser } = useUserStore((state: UserState) => state)

  const [modalVisible, setModalVisible] = useState(false)
  // const [name, setName] = useState('')
  const [name, setName] = useState('antonio corcoba')
  // const [name, setName] = useState('camila capella')

  const route = useRoute()
  const navigation = useAppNavigation()
  const isKeyboardVisible = AuthLogic()

  //TODO:add stripe account
  const handleSetPersonalInfo = () => {
    const formatName = name.split(' ')
    const firstName = formatName[0].charAt(0).toUpperCase() + formatName[0].slice(1)
    const lastName = formatName[1]?.charAt(0).toUpperCase() + formatName[1]?.slice(1) || ''
    const fullName = firstName + ' ' + lastName

    if (regexType.nameRegex.test(fullName)) {
      // axios.post(`${URL}/${PAYMENT}/add-customer`, {
      //   email: user.email,
      //   name: fullName,
      //   phone: user.phone
      // })
      // .then(response => {
      //   const stripeCustomerId = response.data.data || ''

      updateAUser(
        {
          name: fullName
          // stripeCustomerId: stripeCustomerId
        },
        user._id as string
      )
        .then(() => {
          setUser({
            ...user,
            name: fullName
            // stripeCustomerId: stripeCustomerId
          })

          showMessage({
            message: `Welcome! ${fullName}`,
            type: 'success',
            icon: 'success',
            hideStatusBar: true
          })

          navigation.navigate(routes.BottomRoutes)
        })
        .catch((error) => {
          Alert.alert('An error has occurred. Please try again')
          console.error('Error updating user info:', error)
        })
      // })
      // .catch(error => {
      //   Alert.alert('An error has occurred while creating Stripe customer. Please try again')
      //   console.error('Error creating Stripe customer:', error)
      // })
    }
  }

  const handleDeleteImage = () => {
    updateAUser({ img: '' }, user._id as string)
      .then(() => {
        setUser({ ...user, img: '' })
        setModalVisible(false)
        showMessage({
          message: 'Image removed!',
          type: 'success',
          icon: 'success',
          hideStatusBar: true
        })
      })
      .catch((error) => {
        Alert.alert('An error has occurred. Please try again')
        console.error('Error removing image:', error)
      })
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content="Delete Image?"
        redBtn={true}
        redContent="Close"
        redAction={() => handleDeleteImage()}
      />
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

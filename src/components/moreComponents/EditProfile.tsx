import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { useState } from 'react'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import { AuthLogic, regexType, userInputType } from '../authComponents/utils/utils'
import { ProductState, useProductStore } from '../../../core/store/productStore.store'
import { showMessage } from 'react-native-flash-message'
import { URL, USER } from '../../../express/utils'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import InputUser from '../../share/utils/InputUser'
import ImageComponent from '../../share/utils/ImageComponent'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import SheetModal from '../../share/utils/SheetModal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const EditProfile = ({ navigation }) => {
  const { clearFn, clearWishes } = useProductStore((state: ProductState) => state)
  const { user, clearUser, setUser } = useUserStore((state: UserState) => state)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalsVisible, setModalsVisible] = useState(0)

  const isKeyboardVisible = AuthLogic()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [edit, setEdit] = useState(false)

  const handleOnUpdateUser = async () => {
    const formatName = name?.split(' ')
    let firstName = ''
    let lastName = ''

    if (formatName.length > 1) {
      firstName = formatName[0].charAt(0).toLocaleUpperCase() + formatName[0].slice(1)
      lastName = formatName[1].charAt(0).toLocaleUpperCase() + formatName[1].slice(1)
    }

    if (
      firstName &&
      lastName &&
      regexType.emailRegex.test(email) &&
      regexType.passwordRegex.test(password) &&
      regexType.phoneRegex.test(phone)
    ) {
      const response = await axios.put(`${URL}/${USER}/update-user/${user._id}`, {
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
        phone: phone
      })

      if (response.status === 200) {
        setUser({
          name: firstName + ' ' + lastName,
          email: email,
          password: password,
          phone: phone
        })
        showMessage({
          message: 'User Updated!',
          type: 'success',
          icon: 'success',
          hideStatusBar: true
        })
        setEdit(false)
        console.log('User updated successfully')
      } else {
        throw new Error('Failed to update user')
      }
    } else {
      showMessage({
        message: 'You must fill fields!',
        type: 'warning',
        icon: 'warning',
        hideStatusBar: true
      })
    }
  }

  const handleOnErasePhoto = async () => {
    setModalVisible(false)
    const response = await axios.put(`${URL}/${USER}/update-user/${user._id}`, {
      img: null
    })
    if (response.status === 200) {
      setUser({
        img: ''
      })
    }
  }

  const handleOnDeleteUser = async () => {
    const response = await axios.delete(`${URL}/${USER}/delete-user/${user._id}`)

    if (response.status === 200) {
      setModalVisible(false)
      clearUser()
      clearFn()
      clearWishes()
      navigation.navigate('AuthStack', { screen: 'Landing' })
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={
          modalsVisible === 1
            ? 'Are you sure you want to erase your photo?'
            : modalsVisible === 2
            ? 'Are you sure you want to edit your information?'
            : modalsVisible === 3
            ? 'Are you sure you want to delete your account?'
            : null
        }
        greenBtn={modalsVisible === 2 && true}
        greenContent={modalsVisible === 2 && 'Edit'}
        greenAction={() => {
          setEdit(true), setModalVisible(false)
        }}
        redBtn={modalsVisible === 1 ? true : modalsVisible === 3 ? true : null}
        redContent={modalsVisible === 1 ? 'Erase' : modalsVisible === 3 ? 'Delete' : null}
        redAction={() =>
          modalsVisible === 1
            ? handleOnErasePhoto()
            : modalsVisible === 3
            ? handleOnDeleteUser()
            : null
        }
      />
      <Header
        title="Edit Profile"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      {!isKeyboardVisible && (
        <ImageComponent setModalVisible={setModalVisible} setModalsVisible={setModalsVisible} />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputUser
            icon={<Octicons name="person" size={24} />}
            label={userInputType.name}
            input={edit ? name : user.name}
            setInput={setName}
            disable={edit ? true : false}
          />
          <InputUser
            icon={<MaterialCommunityIcons name="email-outline" size={24} />}
            label={userInputType.email}
            input={edit ? email : user.email}
            setInput={setEmail}
            disable={edit ? true : false}
          />
          <InputUser
            icon={<Octicons name="lock" size={22} />}
            label={userInputType.password}
            input={edit ? password : user.password}
            setInput={setPassword}
            disable={edit ? true : false}
          />
          <InputUser
            icon={<MaterialCommunityIcons name="phone-outline" size={22} />}
            label={userInputType.phone}
            input={edit ? phone : user.phone}
            setInput={setPhone}
            disable={edit ? true : false}
          />
        </ScrollView>
        <View style={{ marginTop: '10%' }}>
          {edit ? (
            <>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => {
                  handleOnUpdateUser()
                }}>
                <AntDesign size={22} color="white" name="checkcircle" />
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  setEdit(false)
                }}>
                <MaterialIcons size={22} color="white" name="cancel" />
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => {
                  setModalVisible(true)
                  setModalsVisible(2)
                }}>
                <AntDesign size={22} color="white" name="edit" />
                <Text style={styles.text}>Edit Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  setModalVisible(true)
                  setModalsVisible(3)
                }}>
                <Feather size={22} color="white" name="user-minus" />
                <Text style={styles.text}>Delete Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '90%'
  },
  edit: {
    backgroundColor: '#5EC401',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  delete: {
    backgroundColor: '#f66',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

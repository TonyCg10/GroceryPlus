import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { useEffect, useState } from 'react'
import {
  UserDatabaseStore,
  useUserDatabaseStore,
} from '../../../store/database/userDatabase'
import { UserState, useUserStore } from '../../../store/userStore.store'
import {
  AuthLogic,
  regexType,
  userInputType,
} from '../authComponents/utils/utils'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import InputUser from '../../share/utils/InputUser'
import ImageComponent from '../../share/utils/ImageComponent'
import Feather from 'react-native-vector-icons/Feather'

const EditProfile = ({ navigation }) => {
  const { updateUser, deleteUser } = useUserDatabaseStore(
    (state: UserDatabaseStore) => state,
  )
  const { user, clearUser } = useUserStore((state: UserState) => state)
  const isKeyboardVisible = AuthLogic()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [edit, setEdit] = useState(false)

  const handleOnUpdateUser = () => {
    const formatName = name?.split(' ')
    let firstName = ''
    let lastName = ''

    if (formatName.length > 1) {
      firstName =
        formatName[0].charAt(0).toLocaleUpperCase() + formatName[0].slice(1)
      lastName =
        formatName[1].charAt(0).toLocaleUpperCase() + formatName[1].slice(1)
    }

    if (
      firstName &&
      lastName &&
      regexType.emailRegex.test(email) &&
      regexType.passwordRegex.test(password) &&
      regexType.phoneRegex.test(phone)
    ) {
      const updatedUser = {
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
        phone: phone,
      }

      updateUser(user.id, updatedUser)
      setEdit(false)
      Alert.alert('User updated successfully!')
    } else {
      Alert.alert('You must fill fields')
    }
  }

  const handleOnDeleteUser = () => {
    Alert.alert('Are you sure you want to delete your account?', '', [
      {
        text: 'Confirm',
        onPress: () => {
          deleteUser(user.id)
          clearUser()
          navigation.navigate('AuthStack', { screen: 'Landing' })
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }
  const handleOnEditUser = () => {
    Alert.alert('Are you sure you want to edit your account?', '', [
      {
        text: 'Confirm',
        onPress: () => {
          setEdit(true)
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Edit Profile"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      {!isKeyboardVisible && <ImageComponent />}

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
                }}
              >
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  setEdit(false)
                }}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => {
                  handleOnEditUser()
                }}
              >
                <AntDesign size={22} color="white" name="edit" />
                <Text style={styles.text}>Edit Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  handleOnDeleteUser()
                }}
              >
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
    width: '90%',
  },
  edit: {
    backgroundColor: '#5EC401',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  delete: {
    backgroundColor: '#f66',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

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
  DatabaseStore,
  useUserDatabaseStore,
} from '../../../store/database/userDatabase'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { userInputType } from '../authComponents/utils/utils'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import InputUser from '../../share/utils/InputUser'
import ImageComponent from '../../share/utils/ImageComponent'
import Feather from 'react-native-vector-icons/Feather'

const EditProfile = ({ navigation }) => {
  const { updateUser, deleteUser } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { user, clearUser } = useUserStore((state: UserState) => state)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [toggleModal, setToggleModal] = useState(false)

  const handleOnUpdateUser = () => {
    const updatedUser = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    }

    updateUser(user.id, updatedUser)
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

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Edit Profile"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <ImageComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputUser
            icon={<Octicons name="person" size={24} />}
            label={userInputType.name}
            input={user.name}
            setInput={setName}
          />
          <InputUser
            icon={<MaterialCommunityIcons name="email-outline" size={24} />}
            label={userInputType.email}
            input={user.email}
            setInput={setEmail}
          />
          <InputUser
            icon={<Octicons name="lock" size={22} />}
            label={userInputType.password}
            input={user.password}
            setInput={setPassword}
          />
          <InputUser
            icon={<MaterialCommunityIcons name="phone-outline" size={22} />}
            label={userInputType.phone}
            input={user.phone}
            setInput={setPhone}
          />
        </ScrollView>
        <View style={{ marginTop: '10%' }}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              setToggleModal(true)
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
    alignItems: 'center',
    marginVertical: '2%',
    flexDirection: 'row',
  },
  delete: {
    backgroundColor: '#f66',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: '2%',
    flexDirection: 'row',
  },
})

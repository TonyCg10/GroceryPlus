import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { useEffect, useId, useState } from 'react'
import {
  DatabaseStore,
  useUserDatabaseStore,
} from '../../../store/authStore.store'
import { UserState, useUserStore } from '../../../store/userStore.store'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'

const EditProfile = ({ navigation }) => {
  const { deleteUser, fetchUsers, users } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { user } = useUserStore((state: UserState) => state)

  const userId = users.filter(
    (u) =>
      u.name == user.name &&
      u.email == user.email &&
      u.password == user.password &&
      u.phone == user.phone,
  )

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const avatar = ''
  const formatName = user.name.split(' ')
  let avatarName = formatName[0].charAt(0) + formatName[1].charAt(0)

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Edit Profile"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View>
        <View style={styles.avatar}>
          {avatar == '' ? (
            <Text style={styles.avatarText}>{avatarName}</Text>
          ) : (
            <Image source={avatar} style={styles.avatarImage} />
          )}
        </View>
        <View>
          <View style={styles.texInput}>
            <View style={styles.icon}>
              <Octicons name="person" size={22} />
            </View>
            <View>
              <Text>Full Name</Text>
              <TextInput value={user.name} />
            </View>
          </View>
          <View style={styles.texInput}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="email-outline" size={22} />
            </View>
            <View>
              <Text>Email</Text>
              <TextInput value={user.email} />
            </View>
          </View>
          <View style={styles.texInput}>
            <View style={styles.icon}>
              <Octicons name="lock" size={20} />
            </View>
            <View style={styles.inputPassw}>
              <Text>Password</Text>
              <View style={styles.texInputPassw}>
                <TextInput
                  value={user.password}
                  secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  onPress={() => {
                    setShowPassword(!showPassword)
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.texInput}>
            <View style={styles.icon}>
              <Feather name="phone" size={20} />
            </View>
            <View>
              <Text>Phone Number</Text>
              <TextInput value={user.phone} inputMode="numeric" />
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            deleteUser(userId[0].id)
            navigation.navigate('AuthStack', { screen: 'Landing' })
          }}
        >
          <Text style={styles.text}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  delete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '10%',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  avatar: {
    backgroundColor: 'silver',
    borderRadius: 100,
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: '10%',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  avatarText: {
    alignSelf: 'center',
    marginTop: '35%',
    fontSize: 28,
  },
  texInput: {
    backgroundColor: 'silver',
    padding: '3%',
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
  },
  texInputPassw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputPassw: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginRight: '5%',
  },
})

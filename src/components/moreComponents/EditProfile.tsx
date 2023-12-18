import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import { useAuthStore, AuthState } from '../../../store/authStore.store'

const EditProfile = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false)

  const { userName, userEmail, userPassword, userPhone } = useAuthStore(
    (state: AuthState) => state,
  )
  const avatar = ''
  const formatName = userName.split(' ')
  let firstName =
    formatName[0].charAt(0).toLocaleUpperCase() + formatName[0].slice(1)
  let lastName =
    formatName[1].charAt(0).toLocaleUpperCase() + formatName[1].slice(1)
  let avatarName =
    formatName[0].charAt(0).toLocaleUpperCase() +
    formatName[1].charAt(0).toLocaleUpperCase()

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
              <TextInput value={firstName + ' ' + lastName} />
            </View>
          </View>
          <View style={styles.texInput}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="email-outline" size={22} />
            </View>
            <View>
              <Text>Email</Text>
              <TextInput value={userEmail} />
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
                  value={userPassword}
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
              <TextInput value={userPhone} inputMode="numeric" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
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

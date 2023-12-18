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

const EditProfile = ({ navigation }) => {
  const avatar = ''
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
            <Text style={styles.avatarText}>AC</Text>
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
              <TextInput value="Antonio Corcoba" />
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
                  value="ToNy54Cg19V"
                  secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  onPress={toggleShowPassword}
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
              <TextInput value="8102873196" inputMode="numeric" />
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

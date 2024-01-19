import * as ImagePicker from 'expo-image-picker'
import { Image, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { ip } from '../../components/authComponents/utils/utils'

import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  route?: any
}

const ImageComponent = ({ route }: Props) => {
  const { user, setUser } = useUserStore((state: UserState) => state)

  const formatName = user?.name?.split(' ') || []
  let avatarName = ''

  if (formatName.length > 1) {
    avatarName = formatName[0].charAt(0) + formatName[1].charAt(0)
  } else if (formatName.length === 1) {
    avatarName = formatName[0].charAt(0)
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [6, 6],
        quality: 1
      })

      if (!result.canceled) {
        setUser({ img: result.assets[0].uri })
        console.log('User updated successfully')
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  const deleteImage = () => {
    Alert.alert('Are you sure you want to delete your image?', '', [
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const response = await axios.put(`http://${ip}:2020/update/${user._id}`, {
              img: ''
            })
            if (response.status === 200) {
              const userFetch = {
                img: ''
              }

              setUser(userFetch)
              console.log('User updated successfully')
            } else {
              throw new Error('Failed to update user image')
            }
          } catch (error) {
            console.error('Error updating user image:', error)
          }
        }
      },
      {
        text: 'Cancel',
        style: 'cancel'
      }
    ])
  }

  return (
    <>
      <View style={styles.avatar}>
        {!user.img ? (
          route !== 'PersonalInfo' ? (
            <Text style={styles.avatarText}>{avatarName}</Text>
          ) : (
            <MaterialCommunityIcons style={styles.iconCamera} name="camera-plus-outline" />
          )
        ) : (
          <Image source={{ uri: user.img }} style={styles.avatarImage} />
        )}
        <TouchableOpacity
          onPress={() => {
            pickImage()
          }}
          style={styles.pick}>
          <AntDesign size={28} color="white" name="edit" />
        </TouchableOpacity>

        {user.img && (
          <TouchableOpacity
            onPress={() => {
              deleteImage()
            }}
            style={styles.delete}>
            <AntDesign size={28} color="white" name="delete" />
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}

export default ImageComponent

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#eeeeee',
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    marginVertical: '10%',

    shadowColor: '#5EC401',
    elevation: 4
  },
  avatarImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center'
  },
  avatarText: {
    alignSelf: 'center',
    marginTop: '35%',
    fontSize: 48
  },
  iconCamera: {
    alignSelf: 'center',
    marginTop: '35%',
    fontSize: 86
  },
  container: {
    flex: 1
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '20%'
  },
  selectBtn: {
    backgroundColor: '#5EC401',
    marginBottom: '5%',
    padding: 10,
    width: '60%',
    borderRadius: 10
  },
  pick: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '80%',
    backgroundColor: '#5EC401',
    borderRadius: 100,
    padding: 6
  },
  delete: {
    position: 'absolute',
    top: '80%',
    backgroundColor: '#f66',
    borderRadius: 100,
    padding: 6
  },
  skipBtn: {
    backgroundColor: '#f66',
    padding: 10,
    width: '60%',
    borderRadius: 10
  },
  continueBtn: {
    backgroundColor: '#5EC401',
    padding: 10,
    width: '60%',
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '5%'
  },
  selectText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

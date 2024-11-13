import * as ImagePicker from 'expo-image-picker'
import { Image, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import { showMessage } from 'react-native-flash-message'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

type Props = {
  route?: string

  setModalVisible: (value: boolean) => void
  setModalsVisible?: (value: number) => void
}

const ImageComponent = ({ route, setModalVisible, setModalsVisible }: Props) => {
  const { user, setUser, updateAUser } = useUserStore((state: UserState) => state)

  const formatName = user?.name?.split(' ') || []
  let avatarName = ''

  if (formatName.length > 1) avatarName = formatName[0].charAt(0) + formatName[1].charAt(0)
  else if (formatName.length === 1) avatarName = formatName[0].charAt(0)

  const pickImage = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync()
      .then(({ status }) => {
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
          return
        }

        return ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [6, 6],
          quality: 1
        })
      })
      .then((result) => {
        if (result && !result.canceled) {
          return updateAUser(
            {
              img: result.assets[0].uri
            },
            user._id as string
          ).then(() => {
            setUser({ ...user, img: result.assets[0].uri })
            showMessage({
              message: 'Image settled!',
              type: 'success',
              icon: 'success',
              hideStatusBar: true
            })

            console.log('User updated successfully')
          })
        }
      })
      .catch((error) => {
        Alert.alert('An error has occurred. Please try again')
        console.error('Error picking image:', error)
      })
  }

  return (
    <>
      <View style={styles.avatar}>
        {!user?.img ? (
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

        {user?.img && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
              setModalsVisible && setModalsVisible(1)
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

import * as ImagePicker from 'expo-image-picker'
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'
import {
  DatabaseStore,
  useUserDatabaseStore,
} from '../../../store/authStore.store'
import { useEffect } from 'react'
import { UserState, useUserStore } from '../../../store/userStore.store'

import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {
  navigation?: any
  route?: any
}

const ImageComponent = ({ navigation, route }: Props) => {
  const { updateUser, fetchUsers, users } = useUserDatabaseStore(
    (state: DatabaseStore) => state,
  )
  const { user, setUser } = useUserStore((state: UserState) => state)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    setUser(users.find((u) => u.id === user.id))
  }, [users, setUser, user.id])

  const formatName = user && user.name.split(' ')
  let avatarName = ''
  if (formatName && formatName.length >= 2) {
    avatarName = formatName[0].charAt(0) + formatName[1].charAt(0)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    })
    if (!result.canceled) {
      const updatedUser = {
        img: result.assets[0].uri,
      }
      updateUser(user.id, updatedUser)
    }
  }

  const deleteImage = () => {
    Alert.alert('Are you sure you want to delete your image?', '', [
      {
        text: 'Confirm',
        onPress: () => {
          const updatedUser = {
            img: '',
          }
          updateUser(user.id, updatedUser)
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  return (
    <>
      <View style={styles.avatar}>
        {!user.img ? (
          <Text style={styles.avatarText}>{avatarName}</Text>
        ) : (
          <Image source={{ uri: user.img }} style={styles.avatarImage} />
        )}
        <TouchableOpacity
          onPress={() => {
            pickImage()
          }}
          style={styles.pick}
        >
          <AntDesign size={28} color="white" name="edit" />
        </TouchableOpacity>

        {user.img && (
          <TouchableOpacity
            onPress={() => {
              deleteImage()
            }}
            style={styles.delete}
          >
            <AntDesign size={28} color="white" name="delete" />
          </TouchableOpacity>
        )}
      </View>
      {route == 'SelectImage' && (
        <View style={styles.container}>
          {!user.img ? (
            <Text style={styles.text}>
              This is how will look actual avatar, add a pic!
            </Text>
          ) : (
            <Text style={styles.text}>Is fine this pic?</Text>
          )}
          <View style={styles.btnContainer}>
            {!user.img && (
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => {
                  pickImage()
                }}
              >
                <Text style={styles.selectText}>Select Image</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={user.img ? styles.continueBtn : styles.skipBtn}
              onPress={() => {
                navigation.navigate('BottomRoutes')
              }}
            >
              <Text style={styles.btnText}>
                {user.img ? 'Continue' : 'Skip'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default ImageComponent

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'silver',
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    marginVertical: '10%',
  },
  avatarImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
  },
  avatarText: {
    alignSelf: 'center',
    marginTop: '35%',
    fontSize: 28,
  },
  container: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '20%',
  },
  selectBtn: {
    backgroundColor: '#5EC401',
    marginBottom: '5%',
    padding: 10,
    width: '60%',
    borderRadius: 10,
  },
  pick: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '80%',
    backgroundColor: '#5EC401',
    borderRadius: 100,
    padding: 6,
  },
  delete: {
    position: 'absolute',
    top: '80%',
    backgroundColor: '#f66',
    borderRadius: 100,
    padding: 6,
  },
  skipBtn: {
    backgroundColor: '#f66',
    padding: 10,
    width: '60%',
    borderRadius: 10,
  },
  continueBtn: {
    backgroundColor: '#5EC401',
    padding: 10,
    width: '60%',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  selectText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

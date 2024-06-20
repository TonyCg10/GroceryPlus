import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { ProductState, useProductStore } from '../../../store/productStore.store'
import { useState } from 'react'

import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import Header from '../../share/utils/Header'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MorePageButtons from './utils/MorePageButtons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SheetModal from '../../share/utils/SheetModal'

const More = ({ navigation }) => {
  const { user, clearUser } = useUserStore((state: UserState) => state)
  const { clearFn } = useProductStore((state: ProductState) => state)
  const [modalVisible, setModalVisible] = useState(false)

  const formatName = user?.name?.split(' ') || []
  let avatarName = ''

  if (formatName.length > 1) {
    avatarName = formatName[0].charAt(0) + formatName[1].charAt(0)
  } else if (formatName.length === 1) {
    avatarName = formatName[0].charAt(0)
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content="Are you sure you want to log out?"
        redBtn={true}
        redContent="Log Out"
        redAction={() => (
          setModalVisible(false),
          setTimeout(() => {
            clearUser(), clearFn(), navigation.navigate('AuthStack', { screen: 'Landing' })
          }, 500)
        )}
      />
      <Header
        title="More"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
      <View style={styles.header}>
        <View style={styles.avatar}>
          {user.img == '' ? (
            <Text style={styles.avatarText}>{avatarName}</Text>
          ) : (
            <Image source={{ uri: user.img }} style={styles.avatarImage} />
          )}
        </View>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.number}>841294074</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <MorePageButtons
          text="Edit Profile"
          icon={<Octicons name="pencil" size={20} color={'#236CD9'} />}
          onPress={() => navigation.navigate('MoreStack', { screen: 'EditProfile' })}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Address"
          icon={<EvilIcons size={20} name="location" />}
          onPress={() => navigation.navigate('MoreStack', { screen: 'MyAddress' })}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Orders"
          icon={<Feather name="shopping-bag" size={20} />}
          onPress={() => navigation.navigate('MoreStack', { screen: 'MyOrders' })}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Wishlist"
          icon={<MaterialCommunityIcons name="lightning-bolt-outline" size={20} />}
          onPress={() => navigation.navigate('MoreStack', { screen: 'MyWishlist' })}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Chat with us"
          icon={<Ionicons name="chatbox-outline" size={20} color={'#5EC401'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Talk to our Support"
          icon={<Feather name="phone" size={20} color={'#F37A20'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons text="Mail to us" icon={<Feather name="mail" size={20} />} />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Message to facebook page"
          icon={<FontAwesome name="facebook-f" size={20} color={'blue'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Log out"
          icon={<AntDesign name="poweroff" size={20} color={'#f66'} />}
          onPress={() => {
            setModalVisible(true)
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '5%'
  },
  avatar: {
    backgroundColor: '#eeeeee',
    marginRight: '4%',
    width: 60,
    height: 60,
    alignSelf: 'center',
    borderRadius: 30,

    shadowColor: '#5EC401',
    elevation: 4
  },
  avatarImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    borderRadius: 30
  },
  avatarText: {
    alignSelf: 'center',
    marginTop: '30%',
    fontSize: 18
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  number: {
    fontSize: 16
  },
  scroll: {
    maxHeight: '72%'
  }
})

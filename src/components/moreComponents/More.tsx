import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'

import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import Header from '../../share/utils/Header'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MorePageButtons from '../../share/utils/MorePageButtons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

const More = ({ navigation }) => {
  const avatar = ''

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="More"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
      <View style={styles.header}>
        <View style={styles.avatar}>
          {avatar == '' ? (
            <Text style={styles.avatarText}>AC</Text>
          ) : (
            <Image source={avatar} style={styles.avatarImage} />
          )}
        </View>
        <View>
          <Text style={styles.name}>Antonio Corcoba</Text>
          <Text style={styles.number}>841294074</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <MorePageButtons
          text="Edit Profile"
          icon={<Octicons name="pencil" size={20} color={'lightblue'} />}
          onPress={() =>
            navigation.navigate('MoreStack', { screen: 'EditProfile' })
          }
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Address"
          icon={<EvilIcons size={20} name="location" />}
          onPress={() =>
            navigation.navigate('MoreStack', { screen: 'MyAddress' })
          }
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Orders"
          icon={<Feather name="shopping-bag" size={20} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="My Wishlist"
          icon={
            <MaterialCommunityIcons name="lightning-bolt-outline" size={20} />
          }
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Chat with us"
          icon={<Ionicons name="chatbox-outline" size={20} color={'#87DD39'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Talk to our Support"
          icon={<Feather name="phone" size={20} color={'orange'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Mail to us"
          icon={<Feather name="mail" size={20} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Message to facebook page"
          icon={<FontAwesome name="facebook-square" size={20} color={'blue'} />}
        />
        <View style={basePagesStyle.line} />
        <MorePageButtons
          text="Log out"
          icon={<AntDesign name="poweroff" size={20} color={'red'} />}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  avatar: {
    backgroundColor: 'silver',
    borderRadius: 100,
    marginRight: '4%',
    width: 50,
    height: 50,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  avatarText: {
    alignSelf: 'center',
    marginTop: '30%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 16,
  },
  scroll: {
    maxHeight: '72%',
  },
})

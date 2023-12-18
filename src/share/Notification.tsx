import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { basePagesStyle } from '../indexStyle/baseStyle'

// import fakeData from '../fakeData/fakeData'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Header from './utils/Header'

const Notifications = ({ navigation }) => {
  const notiInfo = (notiType: string, time: string) => {
    switch (notiType) {
      case (notiType = 'Delivering'):
        return (
          <View style={style.box}>
            <View>
              <Text style={style.order}>
                Order #{Math.floor(Math.random() * 100)}
              </Text>
              <Text style={style.text}>
                Your Order is Delivering to your home
              </Text>
            </View>
            <View>
              <Text>{time}</Text>
              <View style={[style.icon, { backgroundColor: '#36B37E' }]}>
                <SimpleLineIcons size={24} color="white" name="phone" />
              </View>
            </View>
          </View>
        )
      case (notiType = 'Confirmed'):
        return (
          <View style={style.box}>
            <View>
              <Text style={style.order}>
                Order #{Math.floor(Math.random() * 100)}
              </Text>
              <Text style={style.text}>
                Your Order is Confirmed. Please check everything is okay
              </Text>
            </View>
            <View>
              <Text>{time}</Text>
              <View style={[style.icon, { backgroundColor: '#FF5552' }]}>
                <Ionicons
                  size={24}
                  color="white"
                  name="reorder-three-outline"
                />
              </View>
            </View>
          </View>
        )
      case (notiType = 'Completed'):
        return (
          <View style={style.box}>
            <View>
              <Text style={style.order}>
                Order #{Math.floor(Math.random() * 100)}
              </Text>
              <Text style={style.text}>
                Your Order is Completed. Please rate the experince
              </Text>
            </View>

            <View>
              <Text>{time}</Text>
              <View style={[style.icon, { backgroundColor: '#5EC401' }]}>
                <Ionicons size={24} color="white" name="star" />
              </View>
            </View>
          </View>
        )

      default:
        break
    }
    return
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Notifications"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View>
        {/* {fakeData.fakeNotis.map((n, key) => {
          return <View key={key}>{notiInfo(n.type, n.time)}</View>
        })} */}
      </View>
    </SafeAreaView>
  )
}

export default Notifications

const style = StyleSheet.create({
  box: {
    backgroundColor: '#d9e9d9',
    marginTop: '3%',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
  },
  text: {
    width: 270,
    marginTop: '2%',
  },
  order: {
    fontSize: 15,
    fontWeight: '600',
  },
  icon: {
    marginTop: 5,
    marginLeft: 5,
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

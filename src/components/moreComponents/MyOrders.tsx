import { View, Text, SafeAreaView } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyOrders = ({ navigation }) => {
  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Orders"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View>
        <Text></Text>
      </View>
    </SafeAreaView>
  )
}

export default MyOrders

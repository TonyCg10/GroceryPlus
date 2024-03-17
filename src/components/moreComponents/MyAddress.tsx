import { SafeAreaView, View, Text } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyAddress = ({ navigation }) => {
  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="My Address"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View>
        <Text></Text>
      </View>
    </SafeAreaView>
  )
}

export default MyAddress

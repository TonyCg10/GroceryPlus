import { SafeAreaView } from 'react-native'
import { basePagesStyle } from '../indexStyle/baseStyle'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../share/utils/Header'

const MyBag = ({ navigation }) => {
  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="My Bag"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
    </SafeAreaView>
  )
}

export default MyBag

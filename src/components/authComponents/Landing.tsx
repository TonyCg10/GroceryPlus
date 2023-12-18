import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Landing

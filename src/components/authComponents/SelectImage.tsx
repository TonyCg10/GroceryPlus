import { SafeAreaView, View, StyleSheet } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'

import ImageComponent from '../../share/utils/ImageComponent'

const SelectImage = ({ navigation, route }) => {
  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <View style={styles.container}>
        <ImageComponent navigation={navigation} route={route.name} />
      </View>
    </SafeAreaView>
  )
}

export default SelectImage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

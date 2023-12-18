import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

type Props = {
  text: string
  icon: any
  onPress?: () => void
}

const MorePageButtons = ({ text, icon, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tuochable} onPress={onPress}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MorePageButtons

const styles = StyleSheet.create({
  container: {
    marginVertical: '6%',
  },
  tuochable: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: '5%',
  },
})

import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'

const SelectLocation = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text1}>Delivery Location</Text>
        <TouchableOpacity style={styles.changeText}>
          <Text style={styles.change}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.location}>
        <View style={styles.locationIconBack}>
          <EvilIcons size={28} name="location" style={styles.locationIcon} />
        </View>
        <Text>79 Agramonte, Holguin</Text>
      </View>
    </View>
  )
}
export default SelectLocation

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    marginVertical: '5%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  change: {
    color: '#5EC401',
    fontSize: 15,
    fontWeight: 'bold',
  },
  changeText: {
    alignSelf: 'center',
  },
  location: {
    flexDirection: 'row',
  },
  locationIconBack: {
    backgroundColor: 'rgba(35, 108, 217, 0.12)',
    borderRadius: 100,
    height: 40,
    width: 40,
    marginRight: '4%',
  },
  locationIcon: {
    alignSelf: 'center',
    marginTop: 5,
  },
})

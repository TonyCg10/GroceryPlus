import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const ExpectedDateTime = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(false)

  const datePicker = (
    <DateTimePickerModal
      negativeButton={{ textColor: '#f66', label: 'Cancel' }}
      positiveButton={{ textColor: '#5EC401', label: 'Confirm' }}
      minimumDate={new Date()}
      isVisible={open}
      mode="date"
      onConfirm={(date) => {
        setDate(date)
        setOpen(false)
      }}
      onCancel={() => setOpen(false)}
    />
  )

  return (
    <View>
      <View>
        <Text style={styles.text1}>Expected Date & Time</Text>
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.setDate}>
          <AntDesign name="calendar" size={20} />
          <Text>{date.toDateString()}</Text>
          <AntDesign name="down" size={20} />
        </TouchableOpacity>
        {datePicker}
        <View style={styles.hour}>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>8 AM - 11 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>11 AM - 12 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>12 PM - 2 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>2 PM - 4 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>4 PM - 8 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(true)}
            style={[styles.hours, selected && styles.selected]}
          >
            <Text>6 PM - 8 PM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ExpectedDateTime

const styles = StyleSheet.create({
  text1: {
    marginVertical: '5%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  setDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'silver',
    padding: '4%',
    borderRadius: 10,
  },
  hour: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: '-2%',
  },
  hours: {
    backgroundColor: 'silver',
    padding: '2%',
    margin: '2%',
    flexGrow: 1,
    borderRadius: 8,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#5EC401',
  },
})

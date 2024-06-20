import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

type Props = {
  setDate: (value: Date) => void
  date: Date
  setHour: (value: null) => void
  hourss: null
}

const ExpectedDateTime = ({ setDate, date, setHour, hourss }: Props) => {
  const [open, setOpen] = useState(false)

  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate)
    setOpen(false)
  }

  const renderHours = (hours) => (
    <TouchableOpacity
      key={hours}
      onPress={() => setHour(hours)}
      style={[styles.hours, hourss === hours && styles.selected]}>
      <Text>{hours}</Text>
    </TouchableOpacity>
  )

  const datePicker = (
    <DateTimePickerModal
      isVisible={open}
      mode="date"
      minimumDate={new Date()}
      onConfirm={handleDateConfirm}
      onCancel={() => setOpen(false)}
      cancelTextIOS="Cancel"
      confirmTextIOS="Confirm"
    />
  )

  return (
    <View>
      <Text style={styles.text1}>Expected Date & Time</Text>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.setDate}>
        <AntDesign name="calendar" size={20} />
        <Text>{date.toDateString()}</Text>
        <AntDesign name="down" size={20} />
      </TouchableOpacity>
      {datePicker}
      <View style={styles.hour}>
        {[
          '08 AM - 11 AM',
          '11 AM - 12 PM',
          '12 PM - 02 PM',
          '02 PM - 04 PM',
          '04 PM - 08 PM',
          '06 PM - 08 PM'
        ].map(renderHours)}
      </View>
    </View>
  )
}

export default ExpectedDateTime

const styles = StyleSheet.create({
  text1: {
    marginVertical: '5%',
    fontWeight: 'bold',
    fontSize: 15
  },
  setDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'silver',
    padding: '4%',
    borderRadius: 10
  },
  hour: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '-2%'
  },
  hours: {
    backgroundColor: 'silver',
    padding: '2%',
    margin: '2%',
    borderRadius: 8,
    flexGrow: 1,
    minWidth: '30%'
  },
  selected: {
    borderWidth: 2,
    borderColor: '#5EC401',
    padding: 6
  }
})

import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Alert } from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import { authPagesStyles } from '../../../share/utils/InputUser'
import { AuthLogic } from '../utils/utils'
import { UserState, useUserStore } from '../../../core/store/userStore.store'
import React, { useState } from 'react'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'
import { showMessage } from 'react-native-flash-message'
import { routes, useAppNavigation } from '../../../utils/useAppNavigation'

import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PhoneNumber from '../../../../assets/undraw_personalization_triu.svg'

const ConfirmPhone = () => {
  const navigation = useAppNavigation()
  const { user } = useUserStore((state: UserState) => state)

  const isKeyboardVisible = AuthLogic()

  const [value, setValue] = useState('12345')

  const ref = useBlurOnFulfill({ value, cellCount: 5 })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })

  const handleOnSetPhone = async () => {
    try {
      if (value.length === 5) {
        showMessage({
          message: 'Number Verified!',
          type: 'success',
          icon: 'success',
          hideStatusBar: true
        })

        navigation.navigate(routes.SignUpPage)
      }
    } catch (error) {
      Alert.alert(`An error has ocurred. Please try again`)
      console.error('Error confirm phone:', error)
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header title="Confirm Phone Number" />
      <View style={authPagesStyles.container}>
        {!isKeyboardVisible && (
          <View style={authPagesStyles.icon}>
            <PhoneNumber />
          </View>
        )}

        <View style={{ flex: 0.3, justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Enter Verification Code</Text>
          <Text style={{ fontWeight: '300' }}>We have sent SMS to:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {user?.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
          </Text>
        </View>

        <View style={authPagesStyles.scrollInputContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={5}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <TouchableOpacity
          disabled={value.length !== 5}
          style={[authPagesStyles.button, value.length !== 5 && authPagesStyles.disabledBtn]}
          onPress={() => {
            handleOnSetPhone()
          }}>
          <Text style={authPagesStyles.btnText}>Next</Text>
          <AntDesign size={22} name="arrowright" color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmPhone

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center'
  },
  focusCell: {
    borderColor: '#000'
  }
})

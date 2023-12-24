import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import {
  regexType,
  userInputType,
} from '../../components/authComponents/utils/utils'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  label?: string
  input?: string
  icon?: any

  setInput?: (value: string) => void
}

const InputUser = ({
  label,
  input,
  icon,

  setInput,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')

  const regex =
    (label == userInputType.email && regexType.emailRegex.test(input)) ||
    (label == userInputType.password && regexType.passwordRegex.test(input)) ||
    (label == userInputType.phone && regexType.phoneRegex.test(input))

  const handlePhoneNumberChange = (number: string) => {
    const numericInput = number.replace(/\D/g, '')
    const formattedNumber = numericInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    )

    setInput(numericInput)
    setFormattedPhoneNumber(formattedNumber)
  }

  const returnPhoneForm = (): string => {
    const formattedNumber =
      userInputType.phone &&
      input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    return formattedNumber
  }

  return (
    <View>
      <View style={userInputStyles.texInputContainer}>
        <View style={userInputStyles.icon}>{icon}</View>
        <View>
          <View style={userInputStyles.header}>
            <Text>{label}</Text>
            <Text>
              {label != userInputType.name && !regex && `Bad ${label}`}
            </Text>
          </View>

          <View style={userInputStyles.texInput}>
            <TextInput
              autoComplete="off"
              autoCapitalize="none"
              value={label != userInputType.phone ? input : returnPhoneForm()}
              secureTextEntry={label == 'Password' && !showPassword}
              onChangeText={(value) => setInput(value)}
              style={{ width: '80%' }}
              keyboardType={
                label == 'Name'
                  ? 'default'
                  : label == 'Email'
                  ? 'email-address'
                  : label == 'Password'
                  ? 'default'
                  : 'phone-pad'
              }
            />
            {label == 'Password' && (
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                onPress={() => {
                  setShowPassword(!showPassword)
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default InputUser

const userInputStyles = StyleSheet.create({
  texInputContainer: {
    backgroundColor: 'silver',
    padding: '3%',
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginRight: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4%',
  },
  texInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const authPagesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollInputContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#5EC401',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    marginVertical: '5%',
  },
  disabledBtn: {
    backgroundColor: '#A9CEC2',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

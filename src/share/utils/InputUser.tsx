import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import { regexType, userInputType } from '../../components/authComponents/utils/utils'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  label?: string
  input?: string
  icon?: any
  disable?: boolean

  setInput?: (value: string) => void
}

const InputUser = ({
  label,
  input,
  icon,
  disable,

  setInput
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const regex =
    (label == userInputType.name && regexType.nameRegex.test(input)) ||
    (label == userInputType.name && regexType.nameRegex.test(input)) ||
    (label == userInputType.email && regexType.emailRegex.test(input)) ||
    (label == userInputType.password && regexType.passwordRegex.test(input)) ||
    (label == userInputType.confirmPw && regexType.passwordRegex.test(input)) ||
    (label == userInputType.phone && regexType.phoneRegex.test(input))

  const returnPhoneForm = (): string => {
    const formattedNumber =
      userInputType.phone && input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    return formattedNumber
  }

  return (
    <View>
      <View style={[userInputStyles.texInputContainer, !regex && userInputStyles.textInputBad]}>
        <View style={userInputStyles.icon}>{icon}</View>
        <View>
          <View style={userInputStyles.header}>
            <Text>{label}</Text>
            <Text style={userInputStyles.bad}>{!regex && `Bad ${label}`}</Text>
          </View>

          <View style={userInputStyles.texInput}>
            <TextInput
              showSoftInputOnFocus={disable}
              cursorColor={'#5EC401'}
              autoComplete="off"
              autoCapitalize="none"
              value={label != userInputType.phone ? input : returnPhoneForm()}
              secureTextEntry={
                (label === 'Password' && !showPassword) ||
                (label === 'Confirm Password' && !showPassword)
              }
              onChangeText={(value) => setInput(value)}
              style={{ width: '80%' }}
              keyboardType={
                label == 'Email' ? 'email-address' : label == 'Phone' ? 'phone-pad' : 'default'
              }
            />
            {['Password', 'Confirm Password'].includes(label) && (
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
    backgroundColor: '#eeeeee',
    padding: '3%',
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',

    shadowColor: '#5EC401',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.0,
    shadowRadius: 2.0,

    elevation: 2.5
  },
  textInputBad: {
    shadowColor: '#f66',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.0,
    shadowRadius: 2.0,

    elevation: 2
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginRight: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4%'
  },
  texInput: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bad: {
    color: '#f66'
  }
})

export const authPagesStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: '5%'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  scrollInputContainer: {
    flex: 1
  },
  button: {
    backgroundColor: '#5EC401',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    marginVertical: '5%',
    flexDirection: 'row'
  },
  disabledBtn: {
    backgroundColor: '#A9CEC2'
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 0.9,
    textAlign: 'center'
  }
})

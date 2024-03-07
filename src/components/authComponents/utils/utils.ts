import { Keyboard } from 'react-native'
import { useEffect, useState } from 'react'

export const regexType = {
  nameRegex:
    /(^[A-Za-z]{1,19})([ ]{0,1})([A-Za-z]{1,19})?([ ]{0,1})?([A-Za-z]{1,19})?([ ]{0,1})?([A-Za-z]{1,19})/,

  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,

  phoneRegex: /^\d{10}$/,
}

export const userInputType = {
  name: 'Name',

  email: 'Email',

  password: 'Password',

  confirmPw: 'Confirm Password',

  phone: 'Phone',
}

export const AuthLogic = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return isKeyboardVisible
}

export const signUpNotValid = (type: string ,data: string) => {
  if (type === 'name')
    if (data && regexType.nameRegex.test(data)) return true
  if (type === 'phone')
    if (data && regexType.phoneRegex.test(data)) return true
  if (type === 'password')
    if (data && regexType.passwordRegex.test(data)) return true
}
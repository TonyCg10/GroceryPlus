export const regexType = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,

  phoneRegex: /^\d{10}$/,
}

export const userInputType = {
  name: 'Name',

  email: 'Email',

  password: 'Password',

  phone: 'Phone',
}

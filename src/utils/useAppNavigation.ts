import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export enum routes {
  AuthStack = 'AuthStack',
  BottomRoutes = 'BottomRoutes',
  MoreStack = 'MoreStack',

  Notifications = 'Notifications',

  Landing = 'Landing',
  LoginPage = 'LoginPage',
  Preregistered = 'Preregistered',

  Phone = 'Phone',
  ConfirmPhone = 'ConfirmPhone',
  SignUpPage = 'SignUpPage',
  PersonalInfo = 'PersonalInfo',

  Searcher = 'Searcher',

  HomePage = 'HomePage',
  ProductDetails = 'ProductDetails',

  Category = 'Category',
  CategoryLists = 'CategoryLists',

  MyBag = 'MyBag',
  More = 'More'
}

export type RootStackParamList = {
  AuthStack: undefined
  BottomRoutes: undefined
  MoreStack: { screen?: string }

  Notifications: undefined

  Landing: undefined
  LoginPage: undefined
  Preregistered: undefined

  Phone: undefined
  ConfirmPhone: undefined
  SignUpPage: undefined
  PersonalInfo: undefined
  Searcher: undefined

  HomePage: undefined
  ProductDetails: { _id?: string }

  Category: undefined
  CategoryLists: { category?: string }

  MyBag: undefined
  More: undefined
}

export const useAppNavigation = () => {
  return useNavigation<StackNavigationProp<RootStackParamList>>()
}

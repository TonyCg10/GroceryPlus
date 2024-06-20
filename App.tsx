import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import GlobalRoutes from './src/routes/GlobalRoutes'
import FlashMessage from 'react-native-flash-message'
import React from 'react'

export default function App() {
  const publishableKey =
    'pk_test_51OtIvaFORGuFh6IZL6AzxXP1TwLO5qZzJlqmEs7a3xDXwD3DYtWqhkDuX44CGBcbPgPLBVpPh0BqpvZjAAid6pzG00O2x4EqhP'
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <StripeProvider
        children={<NavigationContainer children={<GlobalRoutes />} />}
        publishableKey={publishableKey}
        urlScheme="com.tony54.GroceryPlus://MyBag"
      />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  )
}

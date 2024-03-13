import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'

import GlobalRoutes from './src/routes/GlobalRoutes'
import FlashMessage from 'react-native-flash-message'

export default function App() {
  const publishableKey =
    'pk_test_51OtIvaFORGuFh6IZL6AzxXP1TwLO5qZzJlqmEs7a3xDXwD3DYtWqhkDuX44CGBcbPgPLBVpPh0BqpvZjAAid6pzG00O2x4EqhP'
  return (
    <>
      <StatusBar style="auto" />
      <StripeProvider publishableKey={publishableKey} urlScheme="groceryplus://">
        <NavigationContainer>
          <GlobalRoutes />
        </NavigationContainer>
      </StripeProvider>
      <FlashMessage position="top" />
    </>
  )
}

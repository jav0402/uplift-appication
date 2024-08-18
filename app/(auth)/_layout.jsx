import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '../../context/authContext'

const authLayout = () => {
  return (
    <>
    
      <AuthProvider>
        <Stack>
          <Stack.Screen name="Sign-up" options={{ headerShown: false,}}/>
          <Stack.Screen name="Sign-in" options={{ headerShown: false,}}/>
        </Stack>
        <StatusBar
          backgroundColor='#161622'
          style='light'
        />
      </AuthProvider>
    </>

  )
}

export default authLayout
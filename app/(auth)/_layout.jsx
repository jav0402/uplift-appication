import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const authLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="Sign-in" options={{ headerShown: false,}}/>
        <Stack.screen name="Sign-up" options={{ headerShown: false,}}/>
      </Stack>

      <StatusBar 
        backgroundColor='#161622'
        style='light'
      />
    </>

  )
}

export default authLayout
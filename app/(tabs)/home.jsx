import { View, Text, ImageComponent, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Home = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text>Home</Text>
      <Button 
        title='Notifs'
        onPress={() => router.push('../notifications')}
      />
    </SafeAreaView>
  )
}

export default Home
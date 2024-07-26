import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'

const SignIn = () => {
  return (
    <SafeAreaView 
      className='bg-primary h-full'
    >
      <ScrollView>
        <View className='w-full justify-center h-full px-4 py-6'>
          <Image
            source={images.logo}
            resizeMode='conatin'
            className='w-[115] h-[35]'
          />
          <Text className='text-2xl text-white mt-10 font-psemibold text-semibold'>
            login to Uplift
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn
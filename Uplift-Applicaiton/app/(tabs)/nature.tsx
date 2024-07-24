import { View, Text } from 'react-native'
import React from 'react'
import AppGradient from '@/componets/AppGradient'

const nature = () => {
  return (
    <View className='flex-1'>
      <AppGradient colors={["#161b23", "#0a4d4a", "#766e67"]}>
        <View>
          <Text>nature</Text>
        </View>
      </AppGradient>
    </View>
  )
}

export default nature;
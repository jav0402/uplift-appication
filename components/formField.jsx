import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-gray-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center'>
        <TextInput
            
        />
      </View>
    </View>
  )
}

export default FormField
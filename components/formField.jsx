import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-gray-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row'>
        <TextInput className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={(title === 'Password'|| title === 'Confirm Password') && !showPassword}
          
        />

        {(title ==='Confirm Password' || title ==='Password') && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image 
              source={!showPassword ? icons.eyeHide : icons.eye} 
              className='w-6 h-6 '
              resizeMode='contain'   
            />
          </TouchableOpacity> 
        )}
      </View>
    </View>
  )
}

export default FormField
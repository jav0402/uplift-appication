import { TouchableOpacity, Text} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className='bg-secondary rounded-xl min-h-[62] justify-center items-center'>
        <Text className='text-primary font-psemibold text-lg'>
            customButton
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
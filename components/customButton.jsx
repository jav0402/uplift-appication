import { TouchableOpacity, Text} from 'react-native'
import React, { useState } from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity 
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center shadow-[0px_4px_6px_rgba(0,0,0,0.4)] ${containerStyles} ${isLoading ? 'opacity-50':''} `}
        style={{
          shadowOffset: { width: pressed ? 2 : 8, height: pressed ? 2 : 8 },
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOpacity: pressed ? 0.5 : 1,
          shadowRadius: pressed ? 4 : 10,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          borderBottomWidth: pressed ? 2 : 6,
          borderRightWidth: pressed ? 2 : 6,
          borderColor: 'rgba(0, 0, 0, 0.3)',
          backgroundColor: pressed ? '#f8b400' : '#ff7801', // Change color on press for retro effect
          // Adding a gradient background for a retro effect
          elevation: pressed ? 4 : 12, // For Android shadow
        }}
        disabled={isLoading}
    >

        <Text 
            className={`text-primary font-psemibold text-lg ${textStyles} tracking-widest uppercase`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
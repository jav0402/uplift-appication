import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { styled } from "nativewind";


interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}


const CustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
}: CustomButtonProps) => {
    return (

        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                backgroundColor: 'white',
                borderRadius: 10,
                minHeight: 62,
                justifyContent: 'center',
                alignItems: 'center',
                ...containerStyles // Spread operator for any additional styles
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: 'blue', // Assuming primary is blue
                    fontWeight: '600',
                    fontSize: 18,
                    ...textStyles // Spread operator for any additional styles
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
        
    );
};

export default CustomButton;

// 
//          
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs ,Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = (icon, color, name ,focused) => {
    return (
        <View>
            <Image
                source = {icon}
            />

        </View>
    )
}
const TabsLayout = () => {
  return (
    <>
     <Tabs>
        <Tabs.Screen
            name='home'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color,focused}) => (
                    <TabIcon
                        icon={icons.home}
                        color={color}
                        name='Home'
                        focused={focused}
 

                    />
                )


            }}
        />

     </Tabs>
    </>

  )
}

// TIME STAMP for tabs to create after login 41:30

export default TabsLayout
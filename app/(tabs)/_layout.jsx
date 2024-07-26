import { View, Text, Image } from 'react-native'
// import React from 'react'
import { Tabs ,Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
    console.log('icon:', icon);  // Debugging line
    console.log('color:', color);  // Debugging line
    console.log('focused:', focused);  // Debugging line
    console.log('name:', name);  // Debugging line
    
    return (
        <View >
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text >
                {name}
            </Text>
        </View>
  );
};


/* const TabsLayout = () => {
  return (
    <>
     <Tabs>
        <Tabs.Screen
            name='home'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.home}
                        color={color}
                        name='home'
                        focused={focused}
                    />
            )


            }}
        />
     </Tabs>
    </>

  )
} */
const TabsLayout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name='home'
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    );
};

// TIME STAMP for tabs to create after login 41:30

export default TabsLayout
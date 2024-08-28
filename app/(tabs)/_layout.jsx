import { View, Text, Image } from 'react-native'
// import React from 'react'
import { Tabs ,Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
    // console.log('icon:', icon);  // Debugging line
    // console.log('color:', color);  // Debugging line
    // console.log('focused:', focused);  // Debugging line
    // console.log('name:', name);  // Debugging line


    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6  h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color:color}} >
                {name}
            </Text>
        </View>
  );
};


const TabsLayout = () => {
  return (
    <>
     <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '',
            tabBarInactiveTintColor: '',
            tabBarStyle:{
                backgroundColor:'#ffa500',
                borderTopWidth: 1,
                borderTopColor: '',
                height: 84,

            }
        }}
     >
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
        <Tabs.Screen
            name='mood'
            options={{
                title: 'Mood',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.home}
                        color={color}
                        name='Mood'
                        focused={focused}
                    />
                )
            }}
        />
        <Tabs.Screen
            name='resource'
            options={{
                title: 'Resource',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.home}
                        color={color}
                        name='Resource'
                        focused={focused}
                    />
                )
            }}
        />
        {/* <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.profile}
                        color={color}
                        name='Profile'
                        focused={focused}
                    />
                )
            }}
        />*/}

        <Tabs.Screen
            name='journal'
            options={{
                title: 'Journal',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.home}
                        color={color}
                        name='Journal'
                        focused={focused}
                    />
                )
            }}
        />

        <Tabs.Screen
            name='Profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.profile}
                        color={color}
                        name='Profile'
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

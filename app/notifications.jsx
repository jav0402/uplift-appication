import { View, Text, FlatList, RefreshControl, Image, Button} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../components/emptyState'
import { icons } from '../constants'
import { router} from 'expo-router';

const Notification = () => {
    // Enable refreshing
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshing(false);
    }
  return (
    <SafeAreaView className='bg-primary h-full'>
        {/* List of notifications */}
        <FlatList 
            data={[
                { img: icons.profile, msg: "It's time for your daily meditation" }, 
                { img: icons.profile, msg: 'Your weekly mood log review is ready!' }
            ]}
            // Empty data test set:
            // data={[]}

            keyExtractor={(item) => item.msg}
            // Display notif
            renderItem={({ item }) => (
                <View className='flex-1 p-1.5 bg-yellow-50 border border-black'>
                    <View className='flex-row flex-wrap'>
                            <Image className='w-12 h-12 m-1.5' style={{ resizeMode: 'contain' }} source={item.img} />
                            <Text className='pl-0.5 mt-3.5 text-lg text-center'>{item.msg}</Text>
                    </View>
                </View>
            )}
            // List header
            ListHeaderComponent={() => (
                <View className='my-6 px-4 space-y-6'>
                    <View className='justify-between items-start flex-row mb-6'>
                        <View>
                            <Text className='text-3xl font-psemibold'>Notifications</Text>
                        </View>
                    </View>
                </View>
            )}
            // For empty state (No notifications)
            ListEmptyComponent={() => (
                <EmptyState
                    title="You're all caught up!"
                    subtitle="Come back later for more reminders"
                />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />

        {/* Back to home button */}
        <Button
            title='Home'
            onPress={()=> router.push('/home')}
        />

    </SafeAreaView>
  )
}

export default Notification
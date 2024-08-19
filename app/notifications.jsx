import { View, Text, FlatList, RefreshControl, Image,  StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../components/emptyState'
import { icons } from '../constants'
import { router} from 'expo-router';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#fefce8',
        borderWidth: 1,
        borderColor: '#000000'
    },
    image: {
        width: 50,
        height: 50,
        margin: 5,
        resizeMode: 'contain'
    },
    text: {
        paddingLeft: 2,
        marginTop: 10,
        fontSize: 20,
        textAlign:'center'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

const Notification = () => {
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshing(false);
    }
  return (
    <SafeAreaView className='bg-primary h-full'>
        <FlatList 
            data={[{ img: icons.profile, msg: "It's time for your daily meditation" }, { img: icons.profile, msg: 'Your weekly mood log review is ready!' }]}
            // data={[]}
            keyExtractor={(item) => item.msg}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.row}>
                            <Image style={styles.image} source={item.img} />
                            <Text style={styles.text}>{item.msg}</Text>
                    </View>
                    
                </View>
                
            )}
            ListHeaderComponent={() => (
                <View className='my-6 px-4 space-y-6'>
                    <View className='justify-between items-start flex-row mb-6'>
                        <View>
                            <Text className='text-3xl font-psemibold'>Notifications</Text>
                        </View>
                    </View>
                </View>
            )}

            ListEmptyComponent={() => (
                <EmptyState
                    title="You're all caught up"
                    subtitle="Come back later for more reminders"
                />
            )}

            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />

<Button
        title='Home'
        onPress={()=> router.push('/home')}
      />

    </SafeAreaView>
  )
}

export default Notification
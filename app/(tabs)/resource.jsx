import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/emptyState'
import SearchInput from '../../components/searchInput'
import dataHook from '../../lib/dataHook'
import { getResourcesData } from '../../lib/data'

const Resources = () => {
    // Enable refreshing for resources
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshing(false);
    }

    // Fetches all the data for resources
    /*
     getResourcesData can make a request based on the type of resource, however since the
     filtering is done on the client side, we can just fetch all the resources and filter.
     However, in the future, this can be optimised by fetching only the required resources.
     */
    const { data: articles, isLoading, refetch } = dataHook(() => getResourcesData(filter));

    // State to hold the current filter (Default = all)
    const [filter, setFilter] = useState('ALL');

    // Filter resources based on filter type selected
    const filteredArticles = articles.filter((article) => {
        // Return all resources for 'ALL' option
        if (filter === 'ALL') return true;
        // Filter accordingly for other options
        return article.type === filter.toLowerCase();
    });

    // Show loading indicator while resource is being fetched
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-primary h-full flex-1">
            {/* Search bar */}
            <SearchInput />

            {/* Filter Section */}
            <View className="px-4 mt-4">
                <Text className="text-lg font-bold">Filter Resources</Text>
                <View className="flex-row mt-2">
                    {['ALL', 'ARTICLES', 'TECHNIQUES', 'VIDEOS'].map((filterType, index) => (
                        // Display filter buttons with labels
                        <TouchableOpacity
                            key={index}
                            className={`py-2 px-4 mr-2 rounded ${filter === filterType ? 'bg-yellow-400' : 'bg-gray-200'}`}
                            onPress={() => setFilter(filterType)}
                        >
                            <Text className="text-xs font-bold">{filterType}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Resources List */}
            <View className="px-4 mt-4">
                <FlatList
                    data={filteredArticles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="bg-gray-200 p-4 mt-4 rounded border border-gray-400"
                            // To replace with navigation
                            onPress={() => console.log('Navigate to Article Details', item.id)}
                        >
                            {/* Display resource title and desc */}
                            <Text className="text-lg font-bold">{item.title}</Text>
                            <Text className="text-sm text-gray-700 mt-2">{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    // Resources header
                    ListHeaderComponent={() => (
                        <Text className='text-2xl font-psemibold'>Resources</Text>
                    )}

                    // For empty state
                    ListEmptyComponent={() => (
                        <EmptyState
                            title="No resources yet!"
                            subtitle="Come back later for more"
                        />
                    )}
                    // Enable refreshing
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </SafeAreaView>
    );
}
export default Resources

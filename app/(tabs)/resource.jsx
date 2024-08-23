import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Resources = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // State to hold the current filter

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // hardcoded data, to be replaced with webscrapped/db data 
        const resources = [
          {
            id: '1',
            title: 'Understanding Anxiety',
            description: 'An in-depth article about the causes, symptoms, and treatments for anxiety.',
            type: 'articles',
          },
          {
            id: '2',
            title: '5-Minute Meditation',
            description: 'A quick and effective meditation technique to calm your mind.',
            type: 'techniques',
          },
          {
            id: '3',
            title: 'Progressive Muscle Relaxation',
            description: 'A step-by-step guide to help you relax your muscles and reduce stress.',
            type: 'videos',
          },
        ];
        setArticles(resources);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (filter === 'ALL') return true;
    return article.type === filter.toLowerCase();
  });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full flex-1">


      {/* Filter Section */}
      <View className="px-4 mt-4">
        <Text className="text-lg font-bold">Filter Resources</Text>
        <View className="flex-row mt-2">
          {['ALL', 'ARTICLES', 'TECHNIQUES', 'VIDEOS'].map((filterType, index) => (
            <TouchableOpacity
             key={index} 
            //  className="bg-gray-200 py-2 px-4 mr-2 rounded"
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
        <Text className="text-lg font-bold">Resources</Text>
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-gray-200 p-4 mt-4 rounded border border-gray-400"
              onPress={() => console.log('Navigate to Article Details', item.id)} // Replace with navigation
            >
              <Text className="text-lg font-bold">{item.title}</Text>
              <Text className="text-sm text-gray-700 mt-2">{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    
    </SafeAreaView>
  );
}
export default Resources

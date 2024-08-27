import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React, {useState , useEffect} from 'react'
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'


const shuffleArray=(array) => {
  let currenIndex = array.length, randomIndex;
  while (currenIndex !== 0){
    randomIndex = Math.floor(Math.random() * currenIndex)
    currenIndex--;
    [array[currenIndex],array[randomIndex]]=[
      array[randomIndex], array[currenIndex]
    ]
    return array;
  }
}

const quiz = () => {
  const [anxietyAns, setAnxietyAns] = useState(Array(6).fill(0))
  const [depressionAns, setDepressionAns] = useState(Array(6).fill(0))
  const [otherAns, setOtherAns] = useState(Array(6).fill(0))
  
  const [anxQn, setAnxQn] = useState([])
  const [depQn, setDepQn] = useState([])
  const [otherQn, setOtherQn] = useState([])

  const anxietyQnList = [
    "I often feel anxious or worried.",
    "I have trouble sleeping or staying asleep due to anxiety.",
    "I find it difficult to relax or unwind.",
    "I frequently feel overwhelmed by my responsibilities.",
    "I avoid social interactions because of anxiety or stress.",
    "My anxiety makes it hard to focus on tasks."
  ];

  const depressionQnList = [
    "I feel sad or hopeless more often than not.",
    "I struggle with feelings of worthlessness or guilt.",
    "I have difficulty enjoying activities that I used to find pleasurable.",
    "I find it hard to motivate myself to get things done.",
    "I feel detached or disconnected from the people around me.",
    "I have lost interest in things I used to enjoy."
  ];

  const otherQnList = [
    "I experience mood swings that affect my daily life.",
    "I have trouble concentrating or making decisions.",
    "I feel tired or fatigued even after a full night's sleep.",
    "I have thoughts of self-harm or harming others.",
    "I feel that my mental health is impacting my physical health.",
    "I have physical symptoms like headaches or stomachaches that I believe are related to my mental state."
  ];

  useEffect(() => {
    setAnxQn(shuffleArray([...anxietyQnList]))
    setDepQn(shuffleArray([...depressionQnList]))
    setOtherQn(shuffleArray([...otherQnList]))
  },[])
  
  const handleAnsChange = (setAnsFunc, index, value) => {
    const newAns = [...setAnsFunc]
    newAns[index] = value 
    setAnsFunc(newAns)
  }

  const calculatorScore = (ans) => {
    return ans.reduce((acc, curr) => acc + curr, 0);

  }
  
  const handleSubmit = () => {
    const anxScore = calculatorScore(anxietyAns)
    const depScore = calculatorScore(depressionAns)
    const otherScore = calculatorScore(otherAns)

    console.log("anxiety, depression, other ",anxScore," ",depScore," ",otherScore)

    // alert(`anxiety : ${anxScore}, depression : ${depScore}, other : ${otherScore}`)
  }

  return (
    <SafeAreaView className='bg-slate-200 p-5'>
      <ScrollView>
        <Text className='text-2xl font-bold text-center mb-5'>
          Basic Self Evaluation Quiz 
        </Text>

        {/* Anxiety Questions */}
        <Text className='text-xl font-semibold mt-5 mb-3'>Anxiety</Text>
        {anxQn.map((question, index) => (
          <View key={index} className='mb-5'>
            <Text className='text-lg mb-3'>
              {question}
            </Text>
            <RadioButton.Group onValueChange={(value) => {
              console.log('Selected value:', value);
              handleAnsChange(setAnxietyAns, index, parseInt(value));}}
              value={anxietyAns[index].toString()}>
              <View className='flex-row-reverse justify-between'>
                {[5, 4, 3, 2, 1].map(value => (
                  <View key={value} className='mr-2 ml-2'>
                    <Text className='text-center mb-1'>{value === 5 ? "SA" : value === 1 ? "SD" : `${value}`}</Text>
                    <View className='bg-blue-200 rounded-full p-2'>
                      <RadioButton value={value.toString()} />
                    </View>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
        ))}

        {/* Depression Questions */}
        <Text className='text-xl font-semibold mt-5 mb-3'>Depression</Text>
        {depQn.map((question, index) => (
          <View key={index} className='mb-5'>
            <Text className='text-lg mb-3'>
              {question}
            </Text>
            <RadioButton.Group onValueChange={(value) => handleAnsChange(setDepressionAns, index, parseInt(value))}
              value={depressionAns[index].toString()}>
              <View className='flex-row-reverse justify-between'>
                {[5, 4, 3, 2, 1].map(value => (
                  <View key={value} className='mr-2 ml-2'>
                    <Text className='text-center mb-1'>{value === 5 ? "SA" : value === 1 ? "SD" : `${value}`}</Text>
                    <View className='bg-blue-200 rounded-full p-2'>
                      <RadioButton value={value.toString()} />
                    </View>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
        ))}

        {/* Other Mental Health Concerns Questions */}
        <Text className='text-xl font-semibold mt-5 mb-3'>Other Mental Health Concerns</Text>
        {otherQn.map((question, index) => (
          <View key={index} className='mb-5'>
            <Text className='text-lg mb-3'>
              {question}
            </Text>
            <RadioButton.Group onValueChange={(value) => handleAnsChange(setOtherAns, index, parseInt(value))}
              value={otherAns[index].toString()}>
              <View className='flex-row-reverse justify-between'>
                {[5, 4, 3, 2, 1].map(value => (
                  <View key={value} className='mr-2 ml-2'>
                    <Text className='text-center mb-1'>{value === 5 ? "SA" : value === 1 ? "SD" : `${value}`}</Text>
                    <View className='bg-blue-200 rounded-full p-2'>
                      <RadioButton value={value.toString()} />
                    </View>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
        ))}

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default quiz
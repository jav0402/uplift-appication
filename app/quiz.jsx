import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React, {useState , useEffect} from 'react'
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'


const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ]
  }
  return array;
}


const quiz = () => {
  const [anxietyAns, setAnxietyAns] = useState(Array(6).fill(0))
  const [depressionAns, setDepressionAns] = useState(Array(6).fill(0))
  const [otherAns, setOtherAns] = useState(Array(6).fill(0))
  
  const [anxQn, setAnxQn] = useState([])
  const [depQn, setDepQn] = useState([])
  const [otherQn, setOtherQn] = useState([])

  
  const [questions, setQuestions] = useState([]);

  const allQuestions = [
    {
      category: 'Anxiety',
      text: "I often feel anxious or worried.",
      answer: '0'
    },
    {
      category: 'Anxiety',
      text: "I have trouble sleeping or staying asleep due to anxiety.",
      answer: '0'
    },
    {
      category: 'Anxiety',
      text: "I find it difficult to relax or unwind.",
      answer: '0'
    },
    {
      category: 'Anxiety',
      text: "I frequently feel overwhelmed by my responsibilities.",
      answer: '0'
    },
    {
      category: 'Anxiety',
      text: "I avoid social interactions because of anxiety or stress.",
      answer: '0'
    },
    {
      category: 'Anxiety',
      text: "My anxiety makes it hard to focus on tasks.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I feel sad or hopeless more often than not.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I struggle with feelings of worthlessness or guilt.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I have difficulty enjoying activities that I used to find pleasurable.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I find it hard to motivate myself to get things done.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I feel detached or disconnected from the people around me.",
      answer: '0'
    },
    {
      category: 'Depression',
      text: "I have lost interest in things I used to enjoy.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I experience mood swings that affect my daily life.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I have trouble concentrating or making decisions.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I feel tired or fatigued even after a full night's sleep.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I have thoughts of self-harm or harming others.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I feel that my mental health is impacting my physical health.",
      answer: '0'
    },
    {
      category: 'Other',
      text: "I have physical symptoms like headaches or stomachaches that I believe are related to my mental state.",
      answer: '0'
    }
  ];

  useEffect(() => {
    setQuestions(shuffleArray(allQuestions));
  }, []);
  
  const handleAnsChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  }

  const calculateScore = (category) => {
    return questions
      .filter(q => q.category === category)
      .reduce((acc, curr) => acc + parseInt(curr.answer), 0);
  }
  
  const handleSubmit = () => {
    const anxietyScore = calculateScore('Anxiety');
    const depressionScore = calculateScore('Depression');
    const otherScore = calculateScore('Other');

    console.log("Anxiety: ", anxietyScore, "Depression: ", depressionScore, "Other: ", otherScore);
    
    const resultMessage = results(anxietyScore,depressionScore,otherScore)
    alert(resultMessage); 
    // alert(`Anxiety: ${anxietyScore}, : ${depressionScore}, Other: ${otherScore}`);
 }

  const results = (anxScore, depScore, otherScore) => {
    let anxRes, depRes, otherRes;
  
    // anxiety result
    if (anxScore >= 6 && anxScore <= 12) {
      anxRes = `Low risk anxiety: ${anxScore}`;
    } else if (anxScore >= 13 && anxScore <= 18) {
      anxRes = `Moderate risk anxiety: ${anxScore}`;
    } else if (anxScore >= 19 && anxScore <= 30) {
      anxRes = `High risk anxiety: ${anxScore}`;
    }
  
    // depression result
    if (depScore >= 6 && depScore <= 12) {
      depRes = `Low risk depression: ${depScore}`;
    } else if (depScore >= 13 && depScore <= 18) {
      depRes = `Moderate risk depression: ${depScore}`;
    } else if (depScore >= 19 && depScore <= 30) {
      depRes = `High risk depression: ${depScore}`;
    }
  
    // other result
    if (otherScore >= 6 && otherScore <= 12) {
      otherRes = `Low risk other concerns: ${otherScore}`;
    } else if (otherScore >= 13 && otherScore <= 18) {
      otherRes = `Moderate risk other concerns: ${otherScore}`;
    } else if (otherScore >= 19 && otherScore <= 30) {
      otherRes = `High risk other concerns: ${otherScore}`;
    }
    
    return `${anxRes}\n${depRes}\n${otherRes}`;
  }
  


  return (
      <SafeAreaView className='bg-slate-200 p-5'>
        <ScrollView>
          <Text className='text-2xl font-bold text-center mb-5'>
            Basic Self Evaluation Quiz 
          </Text>
  
          {questions.map((question, index) => (
            <View key={index} className='mb-5'>
              <Text className='text-lg mb-3'>
                {question.text}
              </Text>
              <RadioButton.Group
                onValueChange={(value) => handleAnsChange(index, value)}
                value={question.answer}
              >
                <View className='flex-row-reverse justify-between'>
                  {[5, 4, 3, 2, 1].map(value => (
                    <View key={value} className='mr-2 ml-2'>
                      <Text className='text-center mb-1'>{value === 5 ? "S-a" : value === 1 ? "D-a" : `${value}`}</Text>
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
  
/* 
Anxiety Score Range:
6-12: Low anxiety risk.
13-18: Moderate anxiety.
19-30: High anxiety.


Depression Score Range:
6-12: Low depression risk.
13-18: Moderate depression.
19-30: High depression.


Other Mental Health Concerns Score Range:
6-12: Low risk.
13-18: Moderate concern.
19-30: High concern. 

*/
export default quiz
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Button} from 'react-native';
import ToDoComponent, {ToDo} from '../components/ToDo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const ToDoScreen: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}> = ({navigation}): React.JSX.Element => {
  const [todo, setTodo] = useState<ToDo | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Real Request',
        body: 'baThis is a real request!',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then((json: ToDo) => setTodo(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView>
      {todo ? <ToDoComponent todo={todo} /> : <Text>Loading...</Text>}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ToDoScreen;

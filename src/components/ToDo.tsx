import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ToDoDisplayProps {
  todo: ToDo;
}

const ToDoComponent: React.FC<ToDoDisplayProps> = ({todo}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo Item</Text>
      <Text style={styles.text}>ID: {todo.id}</Text>
      <Text style={styles.text}>Title: {todo.title}</Text>
      <Text style={styles.text}>
        Completed: {todo.completed ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ToDoComponent;

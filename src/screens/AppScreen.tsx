import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList} from '../../App';
import {MockContext, RequestContext} from '../wrapper/DebugWrapper';

const AppScreen: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}> = ({navigation}): React.JSX.Element => {
  const {requests} = React.useContext(RequestContext);
  const {mocks, addMock, clearMocks} = React.useContext(MockContext);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button title="Log requests" onPress={() => console.log(requests)} />
          <Button
            title="Go to TodoContainer"
            onPress={() => navigation.navigate('ToDo')}
          />
          <Button
            title="Mock request"
            onPress={() =>
              addMock({
                uri: 'https://jsonplaceholder.typicode.com/todos',
                status: 200,
                body: {
                  id: 69, // nice
                  title: 'Mocked Request',
                  body: 'Successfully mocked this request!',
                  userId: 1,
                },
              })
            }
          />
          <Button title="Log mocks" onPress={() => console.log(mocks)} />
          <Button title="Clear mocks" onPress={() => clearMocks()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppScreen;

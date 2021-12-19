import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import ProgressBarButton from './components/ProgressBarButton';
export default function App() {

  const [but1state, setBut1State] = React.useState('idle');
  const [but2state, setBut2State] = React.useState('idle');
  const onBut1ClickHandler = ()=>{
    setBut1State('loading');
    setTimeout(() => {
        setBut1State('success');
    }, 2000);
  }
  const onBut2ClickHandler = ()=>{
    setBut2State('loading');
    setTimeout(() => {
        setBut2State('error');
    }, 2000);
  }  
  return (
    <View style={styles.container}>
      <Text>Success Button</Text>
      <ProgressBarButton onClick={onBut1ClickHandler} buttonState={but1state} idleText="Submit1" successText="Success1" errorText="Error1"/>
      <Text>Error Button</Text>
      <ProgressBarButton onClick={onBut2ClickHandler} buttonState={but2state} idleText="Submit2" successText="Success2" errorText="Error2"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

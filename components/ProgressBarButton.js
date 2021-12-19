import React, { useEffect, useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';

const ReactiveButton = (props) => {
    const idleText = props.idleText ? props.idleText : 'Click Me';
    const loadingText = props.loadingText && props.loadingText !== '' ? props.loadingText : 'Loading';
    const successText = props.successText && props.successText !== '' ? props.successText : 'Success';
    const errorText = props.errorText && props.errorText !== '' ? props.errorText : 'Error';
    const [buttonState, setButtonState] = useState(props.buttonState ? props.buttonState : 'idle');
    const onClickHandler = () => {
        if (typeof props.onClick !== 'undefined') {
            props.onClick();
            Animated.timing(translation, {
              toValue: 1,
              duration:2000
            }).start((finish) => {
              if(finish){
                translation.setValue(0);
              }
            });
        }
    } 
    const translation = useRef(new Animated.Value(0)).current;
    const getButtonText = (currentButtonState) => {
        if (currentButtonState === 'idle') {
            return idleText;
        } else if (currentButtonState === 'loading') {
            return loadingText === 'Loading' ? <React.Fragment  > {loadingText}</React.Fragment> : loadingText;
        } else if (currentButtonState === 'success') {
            return successText === 'Success' ? <React.Fragment >{successText}</React.Fragment> : successText;
        } else if (currentButtonState === 'error') {
            return errorText === 'Error' ? <React.Fragment >{errorText}</React.Fragment> : errorText;
        }
    }

    const getButtonIcon = (currentButtonState) => {
        if (currentButtonState === 'idle') {
            return <React.Fragment  > <FontAwesome5 style={styles.buttonIcon} name="chevron-right" size={24} color="#fff" /></React.Fragment>;
        } else if (currentButtonState === 'loading') {
            return <React.Fragment  > <FontAwesome5 style={styles.buttonIcon} name="chevron-right" size={24} color="#fff" /></React.Fragment>;;
        } else if (currentButtonState === 'success') {
            return <React.Fragment  > <AntDesign style={styles.buttonIcon} name="check" size={24} color="#fff" /></React.Fragment>;
        } else if (currentButtonState === 'error') {
            return <React.Fragment  > <AntDesign style={styles.buttonIcon} name="close" size={24} color="#fff" /></React.Fragment>;
        }
    }

    useEffect(() => {
        if (typeof props.buttonState !== 'undefined') {
            setButtonState(props.buttonState);
            if ((props.buttonState === 'success' || props.buttonState === 'error')) {
                setTimeout(() => {
                    setButtonState('idle');
                }, (props.messageDuration ? props.messageDuration : 2000));
            }
        }
    }, [props.buttonState])    
    
    return (
      <Pressable onPress={onClickHandler} >
        <Animated.View style={[{
          backgroundColor:translation.interpolate({
            inputRange: [0, 1.5],
            outputRange: ['rgba(33, 34, 62, 1)', 'rgba(75, 79, 147, 1)'],
          })}, styles.container]}>
          <Animated.View style={[{width:translation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
            }) }, styles.animation]}>
          </Animated.View> 
          <View style={[styles.baseButton,buttonState=="success"?styles.successButton:'', buttonState=="error"?styles.errorButton:'',buttonState=="loading"?styles.loadingButton:'']}>
            <Text style={[styles.buttonText]}>
              {getButtonText(buttonState)}  {getButtonIcon(buttonState)}
            </Text>           
          </View>      
                 
        </Animated.View>
      </Pressable>
    )
}
const styles = StyleSheet.create({
  container:{
    borderRadius:8,
    margin:5,
  },
  animation:{
    position:"absolute",
    backgroundColor:'#4B4F93',
    bottom: 0,
    borderRadius:8,
    height:'100%',
  },
  baseButton: {
    zIndex:2,
    borderRadius:8,
    padding:12,
    backgroundColor: '#21223E',
  },
  buttonText:{
    fontSize: 24,
    color:'#fff',
    textAlign:"center",
    justifyContent:"center",
  },
  errorButton:{
    backgroundColor: '#C01332'
  },
  successButton:{
    backgroundColor: '#0C8D87'
  },
  loadingButton:{
    backgroundColor: 'transparent'
  }
});
export default ReactiveButton;
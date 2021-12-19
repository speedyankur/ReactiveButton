# react-native-reactive-button
A react native button component that will show animated progress.
(DEMO)[https://snack.expo.dev/@speedyankur/funny-pretzel]

## Usage
```
import ProgressBarButton from './components/ProgressBarButton';

<ProgressBarButton onClick={onBut1ClickHandler} buttonState={but1state} idleText="Submit" successText="Success" errorText="Error"/>
```

### Properties
Props | Description | Default 
------- | ------- |------- 
`onClick` | This is the click handler for button  | 
`buttonState` | the state which control button whether in progress, one of three follow value:<br>-`'idle'`: static button, button not in progress.<br>-`'loading'`: In-progress state.<br>-`'success'`: Success state.<br>-`'error'`: Error state. | `'idle'`
`idleText` | text for button in Idle state| `Click Me`
`loadingText` | text for button in Loading state| `Loading`
`successText` | text for button in Success state| `Success`
`errorText` | text for button in Error state| `Error`

## License
MIT

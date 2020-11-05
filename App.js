import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/loginStack';
import { requireNativeComponent } from 'react-native';

const getFonts = () => Font.loadAsync({
    'roboto-regular':require('./assets/fonts/Roboto-Regular.ttf')    
});

export default function App () {
  const [fontsLoaded, setFontsLoaded] = useState (false);

  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading
      startAsync={getFonts}
      onFinish={()=> setFontsLoaded(true)}
    />
    )
  }

}
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/loginStack';

const getFonts = () => Font.loadAsync({
    'roboto-regular':require('./assets/fonts/Roboto-Regular.ttf'),    
    'roboto-Medium':require('./assets/fonts/Roboto-Medium.ttf')    
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
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

// import { Welcome } from './src/pages/Welcome'
import { UserIdentification } from './src/pages/UserIdentification'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <>
        <StatusBar style="auto" />
        {/* <Welcome /> */}
        <UserIdentification />
      </>
    );
  }
}

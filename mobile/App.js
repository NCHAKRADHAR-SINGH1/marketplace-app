import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </>
  );
};

export default App;

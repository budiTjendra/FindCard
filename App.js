import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as StoreProvider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import Example from './src/screens/Example';
import store from './src/redux/store';

// export default createAppContainer(navigator);

// React Native: App
export default function App() {
  const navigator = createStackNavigator(
    {
      Home: HomeScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'App',
      },
    }
  );

  const NavigatorContainer = createAppContainer(navigator);

  return (
    // Redux: Global Store
    <StoreProvider store={store}>
      <NavigatorContainer />
    </StoreProvider>
  );
}

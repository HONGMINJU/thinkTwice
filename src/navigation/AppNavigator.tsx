import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { BalancePickScreen } from '../screens/BalancePickScreen';
import { BlindSpotScreen } from '../screens/BlindSpotScreen';
import { ValueSpectrumScreen } from '../screens/ValueSpectrumScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { RootStackParamList } from '../types';
import { colors } from '../styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="BalancePick"
          component={BalancePickScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="BlindSpot"
          component={BlindSpotScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="ValueSpectrum"
          component={ValueSpectrumScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import { BaseNavigationContainer } from '@react-navigation/core';
import React from 'react';
import { stackNavigatorFactory } from 'react-nativescript-navigation';
import { HomeScreen } from './HomeScreen';
import { QuizScreen } from './QuizScreen';
import { ResultsScreen } from './ResultsScreen';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
  <BaseNavigationContainer>
    <StackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#65adf1',
        },
        headerTintColor: 'white',
        headerShown: true,
      }}
    >
      <StackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'NutriMind' }}
      />
      <StackNavigator.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />
      <StackNavigator.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Results' }}
      />
    </StackNavigator.Navigator>
  </BaseNavigationContainer>
);

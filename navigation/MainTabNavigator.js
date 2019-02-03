import React from 'react';
import { Platform, StyleSheet} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home` : 'md-home'
      }
    />
  ),
    tabBarOptions: {
        activeTintColor: 'white',
            style: {
                height: 70,
            backgroundColor: 'black',

        },
    }
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-analytics' : 'md-analytics'}
    />
  ),
    tabBarOptions: {
        activeTintColor: 'white',
        style: {
            height: 70,
            backgroundColor: 'black',
        },
    }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
    tabBarOptions: {
        activeTintColor: 'white',
        style: {
            height: 70,
            backgroundColor: 'black',
        },
    }
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTitle: {
        color: 'red',
    },
});

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

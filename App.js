import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/homescreen';
import LocalScreen from './screens/localscreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Local') {
              iconName = focused ? 'location-arrow' : 'location-arrow';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue', // Set the active tab color
          tabBarInactiveTintColor: 'gray', // Set the inactive tab color
          tabBarStyle: { display: 'flex' }, // Set your tab bar style here
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'My Home' }} />
        <Tab.Screen name="Local" component={LocalScreen} options={{ title: 'Local Files' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

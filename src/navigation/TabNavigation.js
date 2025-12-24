import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"; // Make sure to install: npx expo install @expo/vector-icons

// Import your screens
import Home from "../screens/Home/Home";
// These are placeholders if you haven't created the files yet
import NewsList from "../screens/News/NewsList"; 
import MarketplaceList from "../screens/Marketplace/Marketplacelist";
import EventsList from "../screens/Events/EventsList";


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // 1. Set Colors (Deep Forest Green for active, Darker Slate for inactive)
        tabBarActiveTintColor: '#134E5E', 
        tabBarInactiveTintColor: '#64748B', // Darker gray for better visibility
        tabBarShowLabel: true, // Ensure labels are shown

        // 2. Style the Tab Bar
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          // Adjust height based on Platform to prevent clipping
          height: Platform.OS === 'android' ? 70 : 70, 
          paddingBottom: Platform.OS === 'android' ? 10 : 30, // Extra padding for iOS Home Indicator
          paddingTop: 10,
          elevation: 8, // Shadow for Android
          shadowColor: '#134E5E', // Shadow for iOS
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4, // Space between icon and text
        },

        // 3. Configure Icons based on Route Name
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'News') {
            iconName = 'file-text';
          } else if (route.name === 'Market') {
            iconName = 'shopping-bag';
          } else if (route.name === 'Event') {
            iconName = 'calendar';
          }

          // Return the Feather Icon
          return <Feather name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="News" component={NewsList} />
      <Tab.Screen name="Market" component={MarketplaceList} />
      <Tab.Screen name="Event" component={EventsList} />
    </Tab.Navigator>
  );
}
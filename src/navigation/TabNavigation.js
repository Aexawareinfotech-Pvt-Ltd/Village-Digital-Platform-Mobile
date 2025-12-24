import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home/Home";
import NewsList from "../screens/News/NewsList";
import MarketplaceList from "../screens/Marketplace/Marketplacelist";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={NewsList} />
            <Tab.Screen name="Marketplace" component={MarketplaceList} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
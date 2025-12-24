import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import TabNavigation from "./TabNavigation";
import NewsList from "../screens/News/NewsList";
import NewsDetails from "../screens/News/NewsDetails";
import Profile from "../screens/Profile/Profile";
import MarketplaceList from "../screens/Marketplace/Marketplacelist";
import MarketPlaceDetails from "../screens/Marketplace/MarketplaceDetail";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="MainApp" component={TabNavigation} />
            <Stack.Screen name="NewsList" component={NewsList} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="MarketplaceList" component={MarketplaceList} />
            <Stack.Screen name="MarketPlaceDetails" component={MarketPlaceDetails} />
        </Stack.Navigator>
    );
}
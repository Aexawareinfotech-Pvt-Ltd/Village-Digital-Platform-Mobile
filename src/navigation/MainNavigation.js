import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import TabNavigation from "./TabNavigation";
import NewsList from "../screens/News/NewsList";
import NewsDetails from "../screens/News/NewsDetails";
import MarketplaceList from "../screens/Marketplace/Marketplacelist";
import MarketPlaceDetails from "../screens/Marketplace/MarketplaceDetail";
import Profile from "../screens/Profile/Profile";
import EditProfile from "../screens/Profile/EditProfile";
import Settings from "../screens/Profile/Settings";
import Language from "../screens/Profile/Language";
import PrivacyPolicy from "../screens/Profile/PrivacyPolicy";
import TermsOfService from "../screens/Profile/TermsOfService";
import MyListings from "../screens/Profile/MyListings";
import MyOrders from "../screens/Profile/MyOrders";
import MyGrievances from "../screens/Profile/MyGrievances";
import MyJobs from "../screens/Profile/MyJobs";
import SavedItems from "../screens/Profile/SavedItems";
import HelpSupport from "../screens/Profile/HelpSupport";
import Notifications from "../screens/Home/Notifications";
import GrievanceList from "../screens/Grievances/GrievancesList";
import GrievanceDetails from "../screens/Grievances/GrievancesDetails";
import GrievanceCreate from "../screens/Grievances/GrievancesCreate";

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
            <Stack.Screen name="MarketplaceList" component={MarketplaceList} />
            <Stack.Screen name="MarketPlaceDetails" component={MarketPlaceDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsOfService" component={TermsOfService} />
            <Stack.Screen name="MyListings" component={MyListings} />
            <Stack.Screen name="MyOrders" component={MyOrders} />
            <Stack.Screen name="MyGrievances" component={MyGrievances} />
            <Stack.Screen name="MyJobs" component={MyJobs} />
            <Stack.Screen name="SavedItems" component={SavedItems} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="GrievanceList" component={GrievanceList} />
            <Stack.Screen name="GrievanceDetails" component={GrievanceDetails} />
            <Stack.Screen name="GrievanceCreate" component={GrievanceCreate} />
        </Stack.Navigator>
    );
}
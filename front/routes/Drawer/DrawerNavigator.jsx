import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";


import TabBarNavigator from"../Tab/TabNavigator"
import ScreenDrawer from "./ScreenDrawer"
import Requests from "../../screens/Requests/Requests"
import Mentor from '../../screens/Mentor/Mentor';
import Notifications from '../../screens/Notifications/Notifications'
import Admin from '../../screens/Admin/Admin'


const Drawer = createDrawerNavigator()

export default function MyTabs() {
  return (
    <Drawer.Navigator drawerContent={props=><ScreenDrawer {...props}/>}>
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigator}/>
      <Drawer.Screen name="Requests" component={Requests}/> 
      <Drawer.Screen name="Mentor" component={Mentor}/>
      <Drawer.Screen name="Notifications" component={Notifications}/>
      <Drawer.Screen name="Admin" component={Admin}/>
    </Drawer.Navigator>

  );
}
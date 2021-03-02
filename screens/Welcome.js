// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';
import { fromLeft } from 'react-navigation-transitions';

import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent'

import HomeScreen from './HomeScreen'
import App from '../App'

import ClientScreen from './ClientScreen';
import ViewScreen from './ViewScreen';
import InventoryScreen from './InventoryScreen';
import ProductsScreen from './ProductsScreen';
import CartScreen from './CartScreen';
import PayScreen from './PayScreen';
import ReceiptScreen from './ReceiptScreen';
import TransactionScreen from './TransactionScreen';
import Client from './Client';
import ClientProducts from './ClientProducts';
import ClientPay from './ClientPay';
import ClientInventory from './ClientInventory';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function HomeScreenStack({ navigation }) {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
      <Stack.Navigator 
      screenOptions={{
        gestureEnabled:true,
        
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}
      initialRouteName="HomeScreen" >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          
          options={{
            headerShown:false,
          }}
        />
         <Stack.Screen
          name="InventoryScreen"
          component={InventoryScreen}
          
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        
        options={{
          headerShown:false,
        }}
        />
          <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
         <Stack.Screen
        name="PayScreen"
        component={PayScreen}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
         <Stack.Screen
        name="ClientScreen"
        component={ClientScreen}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="ReceiptScreen"
        component={ReceiptScreen}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="Client"
        component={Client}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="ClientPay"
        component={ClientPay}
        options={{
          headerShown:false //Set Header Title
          
        }}/><Stack.Screen
        name="ClientProducts"
        component={ClientProducts}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="ClientInventory"
        component={ClientInventory}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
        <Stack.Screen
        name="ViewScreen"
        component={ViewScreen}
        
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name="App"
        component={App}
        options={{
          headerShown:false //Set Header Title
          
        }}/>
      </Stack.Navigator>
  );
}

function ClientScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ClientScreen"
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="ClientScreen"
        component={ClientScreen}
        options={{
          title: 'Second Page', //Set Header Title
          
        }}/>
         <Stack.Screen
        name="ReceiptScreen"
        component={ReceiptScreen}
        options={{
          title: 'Second Page', //Set Header Title
          
        }}/>
         
      
    </Stack.Navigator>
  );
}

function Main() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={props=><DrawerContent {...props}/>}
        
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Home"
          options={{ drawerLabel: 'First page Option' }}
          component={HomeScreenStack} />
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Main;
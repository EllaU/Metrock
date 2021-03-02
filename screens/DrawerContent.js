import React from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native';

import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from  'react-native-paper'
import Dash from 'react-native-dash';

import {
    DrawerContentScrollView,
    DrawerItem
}from '@react-navigation/drawer';
import {useState,useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


import AntDesign from 'react-native-vector-icons/AntDesign'

import AsyncStorage from '@react-native-community/async-storage';
export function DrawerContent(props){

    const [fullName,setFullName]=useState()
    AsyncStorage.getItem('FullName').then(
        (value) =>
        {setFullName(value)
        console.log(value)}
      );
    return(
        <View style={{flex:1}}>
            <View {...props}>
                <View style={{width:'90%',alignSelf:'center',height:'100%',marginTop:'20%'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                        <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Signed in as</Text>

                        <TouchableOpacity
                            onPress={props.navigation.closeDrawer}
                        >
                        <   Feather name="arrow-left" size={20} color={"black"} />
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:'3%'}}>
                        <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>{fullName}</Text>

                    </View>

                    <TouchableOpacity onPress={()=>{props.navigation.navigate('HomeScreen')}} style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <AntDesign name="home" size={26} color={"#4f4f4f"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4f4f4f',fontFamily:'Quicksand-Regular',marginLeft:10}}>Home</Text>
                        
    
                    </TouchableOpacity>
                    <Dash 
                    dashColor={"#e0e0e0"}
                    dashThickness={1}
                    dashGap={5}
                    style={{width:"100%"}}/>

                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Client')}} style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <Ionicons name="ios-people-outline" size={26} color={"#4f4f4f"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4f4f4f',fontFamily:'Quicksand-Regular',marginLeft:10}}>Clients</Text>
                        
    
                    </TouchableOpacity>
                    <Dash 
                    dashColor={"#e0e0e0"}
                    dashThickness={1}
                    dashGap={5}
                    style={{width:"100%"}}/>
                    <TouchableOpacity  onPress={()=>{props.navigation.navigate('TransactionScreen')}} style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <Ionicons name="ios-newspaper-outline" size={26} color={"#4f4f4f"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4f4f4f',fontFamily:'Quicksand-Regular',marginLeft:10}}>Transactions</Text>
                        
    
                    </TouchableOpacity>
                    <Dash 
                    dashColor={"#e0e0e0"}
                    dashThickness={1}
                    dashGap={5}
                    style={{width:"100%"}}/>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('InventoryScreen')}} style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <FontAwesome5 name="boxes" size={26} color={"#4f4f4f"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4f4f4f',fontFamily:'Quicksand-Regular',marginLeft:10}}>Inventory</Text>
                        
    
                    </TouchableOpacity>
                    <Dash 
                    dashColor={"#e0e0e0"}
                    dashThickness={1}
                    dashGap={5}
                    style={{width:"100%"}}/>
                    <TouchableOpacity style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <Feather name="settings" size={26} color={"#4f4f4f"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4f4f4f',fontFamily:'Quicksand-Regular',marginLeft:10}}>Settings</Text>
                        
    
                    </TouchableOpacity>
                    <Dash 
                    dashColor={"#e0e0e0"}
                    dashThickness={1}
                    dashGap={5}
                    style={{width:"100%"}}/>

                     <TouchableOpacity onPress={()=>{
                         
                         AsyncStorage.clear();
                         props.navigation.navigate('App')
                                }}
                                style={{flexDirection:'row',width:'100%',alignItems:'center',paddingVertical:'10%'}}>
                        <View>

                         <Feather name="power" size={23} color={"#4e3caf"} />
                        </View>
                        <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-Regular',marginLeft:10}}>Log out</Text>
                        
    
                    </TouchableOpacity>
                   
                    
                </View>

            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontFamily:'Quicksand-Bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    secttion:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,

    },
    paragraph:{
        fontFamily:'Quicksand-Bold',
        marginRight:3,
    },
    drawerSection:{
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:'12',
        paddingHorizontal:16
    }
})
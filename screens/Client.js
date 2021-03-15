// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";
import Feather from 'react-native-vector-icons/Feather';
import Dialog from "react-native-dialog";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
  
} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// import { TouchableOpacity} from 'react-native-gesture-handler'
// import all the components we are going to use
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Linking,
  View,
  Platform,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,

  FlatList,
  
} from 'react-native';

import realm,{
  getAllClients
}from '../Database';


const HomeScreen=({navigation,props})=>{

  const [searchText,setSearchText]=useState();
 const right = getAllClients()

  const ok = right.map(item=>{
    return item;
  })
  const[data,setData]=useState(ok.reverse())

  const filteredData = searchText
  ? data.filter(x =>
        {
           return x.name.toLowerCase().includes(searchText.toLowerCase())||
          x.phone.includes(searchText)
         }
        
           )
  : data;
  

  const toggleDrawer = () => {

    // console.log('hi')
    //Props to open/close the drawer
    navigation.toggleDrawer()
  };





const renderItem = ({ item,index }) => {

  return (
    <View style={{height:80,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
      <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>{item.name}</Text> 
      {item.owe == "true"?
      <Text style={{fontFamily:"Quicksand-SemiBold",color:"red",fontSize:13}}>N{Math.abs(parseInt(item.amountD))}</Text> 
      :
        <Text style={{fontFamily:"Quicksand-SemiBold",color:"green",fontSize:13}}>N{item.amountD}</Text> 

      }
    </View>
    <View style={{flexDirection:'row',paddingHorizontal:'5%',}}>
      <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>{item.phone}</Text> 

    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
      <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>{item.date}</Text> 
      <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11}}>Account Balance</Text> 

    </View>
    </View>
  )
}

  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
    <StatusBar translucent={true}
         barStyle={'dark-content'}
              backgroundColor={'white'}
             />
        
            <View style={{width:'100%',justifyContent:'center',marginTop:'15%',marginBottom:'3%'}}>
                 <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-Regular'}}>Clients</Text>
                 <View style={{ flexDirection: 'row',position:'absolute',marginLeft:'5%' }}>
                    <TouchableOpacity onPress={()=> toggleDrawer()}>
                      {/*Donute Button Image */}
                      <Feather name="align-left" size={20} color={"rgba(0,0,0,0.5)"} />
                
                    </TouchableOpacity>
                  </View>


             </View>
             <TextInput
                      onChangeText={text => setSearchText(text)}
                      value={searchText}

                      // onChangeText={RefCode => this.setState({RefCode})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
                      placeholder="Search for a client"
                      placeholderTextColor='#E0E0E0' 
                      style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'90%'}}
                      />
            

        
        <FlatList
            
            horizontal={false}
            style={{width:"90%",alignSelf:'center'}}
            data={filteredData}
            // keyExtractor={(item)=> item.phone.toString()}
            renderItem={renderItem}  
            
          />

    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
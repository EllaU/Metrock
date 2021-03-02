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
  FlatList
} from 'react-native';


const HomeScreen=({navigation})=>{

  const [searchText,setSearchText]=useState();

  const[data,setData]=useState([])

  AsyncStorage.getItem('Clients').then(
    (value) =>
    setData(JSON.parse(value))
  );
     
 

  const filteredData = searchText
  ? data.filter(x =>
      x.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : data;


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
        <Feather name="align-left" size={20} color={"rgba(255,2555,255,1.0)"} />

      </TouchableOpacity>
    </View>
  );
}



const renderItem = ({ item,index }) => {

  return (
    <TouchableOpacity style={{height:80,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
      <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>{item.name}</Text> 
      {item.owe == "true"?
      <Text style={{fontFamily:"Quicksand-SemiBold",color:"red",fontSize:13}}>N{item.amountD}</Text> 
      :
        <Text style={{fontFamily:"Quicksand-SemiBold",color:"green",fontSize:13}}>N{item.amountD}</Text> 

      }
    </View>
    <View style={{flexDirection:'row',paddingHorizontal:'5%',}}>
      <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>{item.phone}</Text> 

    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
      <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>{item.date}</Text> 
      <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11}}>Available Balance</Text> 

    </View>
    </TouchableOpacity>
  )
}

  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar translucent={true}
              backgroundColor={'#4e3caf'}
             />
             
        
        <View style={{height:hp("40%"),backgroundColor:'#4e3caf',width:"100%",borderBottomLeftRadius:40,borderBottomRightRadius:40}}>

          <View style={{height:'100%',alignItems:'center',paddingTop:'13%'}}>
            <Image
            source={require('../assets/logo.png')}
            style={{resizeMode: 'contain',height:"25%",width:"25%"}}

              />
            <Text style={{fontFamily:"Quicksand-SemiBold",color:'white',fontSize:20,marginTop:"4%"}}>Client</Text> 
            <Text style={{fontFamily:"Quicksand-Regular",color:'white',fontSize:11,marginTop:"5%"}}>Start selling, start earning</Text> 
            <TextInput
                          onChangeText={text => setSearchText(text)}
                          value={searchText}
                      underlineColorAndroid='transparent'
                      placeholder="Search for customers"
                      placeholderTextColor='grey' 
                      style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'75%',backgroundColor:'white',borderRadius:5,marginTop:'5%'}}
                      />
            </View>
          <View style={{position:'absolute',marginTop:'20%',marginLeft:'5%',}}>
          <NavigationDrawerStructure navigationProps={navigation} />

          </View> 


          </View>
      
         
         
          <View style={{width:'90%',alignSelf:'center'}}>

          <FlatList
              horizontal={false}
              style={{width:"100%",alignSelf:'center'}}
              data={filteredData}
              keyExtractor={(item)=> item.phone.toString()}
              renderItem={renderItem}  
              
             />

            <View style={{height:100}}>

            </View>

          </View>
        

     
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
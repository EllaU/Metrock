// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";

import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';


import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect} from 'react';



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
  Share,
  TextInput,
  Image,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';


const HomeScreen=({navigation,route})=>{
  const {tname}=route.params;
  const {tDate}=route.params;
  const {tphone}=route.params;
  const {tRef}=route.params;
  const {tProducts}=route.params;
  const {tamountP}=route.params;
  const {tOwe}=route.params;
  const {tTotal}=route.params;
  const {tSync}=route.params;


  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar translucent={true}
         barStyle={'dark-content'}
              backgroundColor={'white'}
             />

            <ScrollView style={{alignSelf:'center',width:'90%',height:'80%'}}>
             <View style={{width:'100%',justifyContent:'center',marginTop:'15%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>View</Text>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute'}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:'3%'}}>
                <Image
                source={require('../assets/logo.png')}
                style={{resizeMode: 'contain',height:80,width:80}}

                  />

                <Text style={{fontSize:13,color:'grey',fontFamily:'Quicksand-SemiBold'}}>{tDate}</Text>


                </View>
                <View style={{width:'100%',marginBottom:'5%'}}>
                 <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare curabitur viverra.
                 </Text>



                </View>

                <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'5%',borderTopWidth:1,borderColor:'#E0E0E0'}}>
                <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>Client Details</Text>


                {/* <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                   navigation.goBack()}}>
                  <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-SemiBold'}}>Close</Text>
               

                </TouchableOpacity> */}
                


                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{width:'30%'}}>
                  <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>Id</Text>

                  </View>
                  <View style={{flex:1}}>
                  <Text style={{fontSize:12,color:'black',fontFamily:'Quicksand-SemiBold'}}>{tRef}</Text>

                  </View>

                </View>

                <View style={{flexDirection:'row',marginTop:'2%'}}>
                  <View style={{width:'30%'}}>
                  <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>Name</Text>

                  </View>
                  <View style={{flex:1}}>
                  <Text style={{fontSize:12,color:'black',fontFamily:'Quicksand-SemiBold'}}>{tname}</Text>

                  </View>

                </View>

                <View style={{flexDirection:'row',marginTop:'2%'}}>
                  <View style={{width:'30%'}}>
                  <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>Phone No</Text>

                  </View>
                  <View style={{flex:1}}>
                  <Text style={{fontSize:12,color:'black',fontFamily:'Quicksand-SemiBold'}}>{tphone}</Text>

                  </View>

                </View>
                <View style={{flexDirection:'row',marginTop:'2%'}}>
                  <View style={{width:'30%'}}>
                  <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>Status</Text>

                  </View>
                  <View style={{flex:1}}>
                  <Text style={{fontSize:12,color:'black',fontFamily:'Quicksand-SemiBold'}}>{tSync? "Synced" : "Not Synced"}</Text>

                  </View>

                </View>

                <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingTop:'10%',}}>
                  <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>Items </Text>

                </View>
                <FlatList
              horizontal={false}
              style={{width:"100%",alignSelf:'center'}}
              data={tProducts}
              keyExtractor={(item)=> item.product_id.toString()}
              renderItem={({item,index})=>
            
              <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'5%',borderBottomWidth:1,borderColor:"#e0e0e0"}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>{item.name} </Text>

              </View>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}> x{item.quantity} </Text>

            </View>
              }  
              // extraData={isRender}
             />

               

            </ScrollView>
            <View style={{elevation:30,backgroundColor:'white',height:'20%',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:'90%',alignSelf:'center',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'3%',borderBottomWidth:1,borderColor:"#e0e0e0"}}>
                 <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold',marginLeft:2}}>Total </Text>

                  <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>N{tTotal} </Text>

                </View>

                <View style={{width:'90%',alignSelf:'center',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'3%',borderBottomWidth:1,borderColor:"#e0e0e0"}}>
                 <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold',marginLeft:2}}>Amount Paid </Text>

                    {tOwe == "true"?
                                      <Text style={{fontSize:13,color:"red",fontFamily:'Quicksand-SemiBold'}}>N{tamountP} </Text>
                            :
                            <Text style={{fontSize:13,color:"green",fontFamily:'Quicksand-SemiBold'}}>N{tamountP} </Text>

                                
                            }

                </View>
                
          
               
            
            

            </View>

            
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
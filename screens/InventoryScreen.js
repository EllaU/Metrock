// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';

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
  TextInput,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';



const HomeScreen=({navigation,route})=>{
 

  const [getProducts,setGetProducts]=useState([]);
  AsyncStorage.getItem('InvoiceP').then(
    (value) =>
      {
        
        setGetProducts(JSON.parse(value));
        // console.log(value)
      

      }
    );
  // const { Products } = route.params;
  const[visible,setVisible]=useState(false);
     
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // console.log(Products)
  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
    
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
  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar translucent={true}
              backgroundColor={'#4e3caf'}
             />
        <ScrollView style={{flexGrow:1,height:'100%'}}>
        <View style={{height:hp("40%"),backgroundColor:'#4e3caf',width:"100%",borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
          
          <View style={{height:'100%',alignItems:'center',paddingTop:'13%'}}>
            <Image
            source={require('../assets/logo.png')}
            style={{resizeMode: 'contain',height:"25%",width:"25%"}}

              />
            <Text style={{fontFamily:"Quicksand-SemiBold",color:'white',fontSize:20,marginTop:"4%"}}>Let's start the day</Text> 
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',marginTop:'8%'}}>
                <View>
                    <Text style={{fontFamily:"Quicksand-SemiBold",color:'white',fontSize:11}}>Inventory count</Text> 
                    <Text style={{fontFamily:"Quicksand-Bold",color:'white',fontSize:17,marginTop:"2%"}}>200</Text> 
                </View>
                <View>
                    <Text style={{fontFamily:"Quicksand-SemiBold",color:'white',fontSize:11}}>Total sales</Text> 
                    <Text style={{fontFamily:"Quicksand-Bold",color:'white',fontSize:17,marginTop:"2%"}}>200</Text> 
                </View>
                <View>
                    <Text style={{fontFamily:"Quicksand-SemiBold",color:'white',fontSize:11}}>Total cash</Text> 
                    <Text style={{fontFamily:"Quicksand-Bold",color:'white',fontSize:17,marginTop:"2%"}}>N300,000</Text> 
                </View>

            </View>
            
            
          </View>
          <View style={{position:'absolute',marginTop:'20%',marginLeft:'5%',}}>
          <NavigationDrawerStructure navigationProps={navigation} />

          </View> 

          


          </View>
          <View >
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
              <TouchableOpacity
                    style={[styles.UserGreet,{marginTop:15,borderRadius:10,flexDirection:'row',height:40,width:"48%",backgroundColor:'white',borderWidth:1,borderColor:"#4E3CAF"}]}
                    onPress={()=>showDialog()}
                                    >
                    <Text style={{fontSize:13,color:'#4E3CAF',fontFamily:'Quicksand-Bold'}}>Close inventory</Text>


                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.UserGreet,{marginTop:15,borderRadius:10,flexDirection:'row',height:40,width:"48%",backgroundColor:'#4E3CAF'}]}
                    onPress={()=>  navigation.navigate('ProductsScreen', {
                                    getProducts:getProducts,
                                  })}
                                    >
                    <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Start Selling</Text>


                </TouchableOpacity>
              </View>
          
          <View style={{width:'90%',alignSelf:'center'}}>
          <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13,marginTop:17}}>Outstanding Payments</Text> 

            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
            <View style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </View>
          </View>


          </View>
          <View style={{height:100}}>

          </View>
          <Dialog.Container visible={visible}
                  onBackdropPress={handleCancel}
                  contentStyle={{padding:0,paddingBottom:30}}
                  // contentStyle={{}}
                >
                  <View style={{alignItems:'center'}}>
                      <View style={{width:'80%',alignItems:'flex-end'}}>

                      <TouchableOpacity onPress={handleCancel}>
                        <Text style={{color:'black',fontFamily:'Quicksand-Bold',fontSize:16,marginLeft:20}}>X</Text>

                      </TouchableOpacity>

                      </View>
                      <View style={{width:'100%',alignItems:'center',}}>

                        <Text style={{fontFamily:'Quicksand-SemiBold',color:'#4e3caf',fontSize:17}}>Load Inventory</Text>

                      </View>
                      <View style={{width:'80%',alignItems:'center',marginTop:5}}>

                        <Text style={{fontFamily:'Quicksand-SemiBold',color:'grey',textAlign:'center',fontSize:11,}}>
                        Input your invoice number to load your inventory for the day
                        </Text>

                        </View>
                      {/* <View style={{width:'90%',alignItems:'center',marginTop:10}}> */}

                      <TextInput
                      // onChangeText={RefCode => this.setState({RefCode})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
                      placeholder="Invoice number"
                      placeholderTextColor='grey' 
                      style={{marginTop:15,fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'grey',borderRadius:10,fontSize:13,color:'black',width:'90%'}}
                      />
                     
                  </View>

                  

                  {/* <View style={{width:'100%'}}>
                      
                    </View>
                 <Dialog.Title
                    style={{fontFamily:'Quicksand-SemiBold',alignSelf:'center',color:'#4e3caf'}}

                  >Load Inventory</Dialog.Title>
                  <Dialog.Description
                    style={{fontFamily:'Quicksand-Regular',color:'grey',textAlign:'center',fontSize:11,width:200,alignSelf:'center'}}

                  >
                    Input your invoice number to load your inventory for the day
                  </Dialog.Description>
                  <Dialog.Input
                  // onChangeText={RefCode => this.setState({RefCode})}
 
                  // Making the Under line Transparent.
                  underlineColorAndroid='transparent'
                  placeholder="Invoice number"
                  placeholderTextColor='grey' 
                  style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:5,width:"100%",borderWidth:1,borderColor:'grey',borderRadius:10,fontSize:13,color:'black'}}
                  /> */}
    
                  {/* <Dialog.Button color={'#4E3CAF'} style={{fontFamily:'Quicksand-Light'}} label="Ok" onPress={handleCancel} /> */}

        </Dialog.Container>

        </ScrollView>
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
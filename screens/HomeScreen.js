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
  TouchableOpacity
} from 'react-native';


const HomeScreen=({navigation})=>{
  const[visible,setVisible]=useState(false);
  const[load,setLoad]=useState(false);
  const[success,setSuccess]=useState(false);
  const[token,setToken]=useState();
  const [error,setError]=useState();
  const[invoice,setInvoice]=useState()
  const [products,setProducts]=useState([]);

  AsyncStorage.getItem('Token').then(
    (value) =>
    setToken(value)
  );
     
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setError(undefined);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  const loadInventory=()=>{
    setLoad(true);
    
    setError();
    AsyncStorage.setItem('Invoice', invoice);


    fetch("http://mobile.metrockenterprises.ng/api/v1/invoices/fetch/"+ invoice, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' +token
      }
    })
   .then(response => response.json())
   .then(data => {
     console.log(data)
      if(data.success == true){
        console.log(data)
        AsyncStorage.setItem('InvoiceP', JSON.stringify(data.data));
        setSuccess(true);
      }else{
        setLoad(false);
        setError(data.message);

      }
      // setSuccess(true);
      
    })
    .catch((error) => {
      setError("Please check your internet connection")
      setLoad(false);
      console.log(error);
    });



  }

  const goToInventory=()=>{
    console.log(products);
    setVisible(false);
    navigation.navigate('InventoryScreen', {
      Products:products,
    });
  }
    
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
            <Text style={{fontFamily:"Quicksand-Regular",color:'white',fontSize:11,marginTop:"5%"}}>Total outstanding payments</Text> 
            <Text style={{fontFamily:"Quicksand-Bold",color:'white',fontSize:17,marginTop:"2%"}}>N50,000</Text> 
          </View>
          <View style={{position:'absolute',marginTop:'20%',marginLeft:'5%',}}>
          <NavigationDrawerStructure navigationProps={navigation} />

          </View> 


          </View>
          <View >
         
          
          <TouchableOpacity
            style={[styles.UserGreet,{marginTop:15,borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF'}]}
            onPress={()=>showDialog()}
                              >
              <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Load Inventory</Text>


          </TouchableOpacity>
          <View style={{width:'90%',alignSelf:'center'}}>
          <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13,marginTop:17}}>Outstanding Payments</Text> 

            <TouchableOpacity onPress={()=>navigation.navigate("InventoryScreen")} style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>AsyncStorage.clear()}style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>Okemati Lanre</Text> 
                <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>N30,000</Text> 
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                <Text style={{fontFamily:"Quicksand-Regular",color:'#828282',fontSize:11}}>24/10/2020</Text> 
                <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:11}}>Remaining Balance</Text> 
              </View>

            </TouchableOpacity>
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
                  contentStyle={{padding:0,paddingBottom:40}}
                  // contentStyle={{}}
                >
                  {!success?
                  <View style={{alignItems:'center'}}>
                  <View style={{width:'80%',alignItems:'flex-end'}}>

                  <TouchableOpacity onPress={handleCancel}>
                    <Text style={{color:'black',fontFamily:'Quicksand-Bold',fontSize:16,marginLeft:20}}>x</Text>

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

                <View style={{flexDirection:'row',alignSelf:'center',width:'90%',marginTop:15}}>
                <TextInput
                  onChangeText={UserInvoice => setInvoice(UserInvoice)}
                  underlineColorAndroid='transparent'
                  placeholder="Invoice number"
                  placeholderTextColor='grey' 
                  style={{fontFamily:'Quicksand-Regular',paddingLeft:15,height:40,width:"80%",borderWidth:0.5,borderColor:'#e0e0e0',borderTopLeftRadius:10,borderBottomLeftRadius:10,fontSize:13,color:'black',width:'90%',borderRightWidth:0}}
                  />
                  <View style={{width:'10%',alignItems:'center',justifyContent:'center',backgroundColor:'white',height:40,borderWidth:0.5,borderColor:'#e0e0e0',borderTopRightRadius:10,borderBottomRightRadius:10,borderLeftWidth:0,marginRight:10}}>
                    {!load?
                    <TouchableOpacity onPress={()=>loadInventory()}>
                      <Feather name="search" size={20} color={"#E0E0E0"} />
                    </TouchableOpacity>
                    :
                    <SkypeIndicator  color='#E0E0E0' size={20} />
                    
                     }
                  </View>

                </View>
                
                {!error== " "?
                    <Text style={{fontSize:11,color:'red',fontFamily:'Quicksand-Regular'}}>*{error}</Text>
                    :
                    undefined
                  }
                  
                 
              </View>

                    :
                    <View style={{alignItems:'center'}}>
                  <View style={{width:'80%',alignItems:'flex-end'}}>

                  </View>
                  <View style={{width:'100%',alignItems:'center',}}>

                    <Text style={{fontFamily:'Quicksand-SemiBold',color:'#4e3caf',fontSize:17}}>Great</Text>

                  </View>
                  <View style={{width:'60%',alignItems:'center',marginTop:5}}>

                    <Text style={{fontFamily:'Quicksand-SemiBold',color:'grey',textAlign:'center',fontSize:11,}}>
                     Your inventory has been loaded successfully.
                    </Text>

                    </View>
                  {/* <View style={{width:'90%',alignItems:'center',marginTop:10}}> */}

                <View style={{flexDirection:'row',alignSelf:'center',width:'70%',marginTop:15}}>
                <TouchableOpacity
                  style={[styles.UserGreet,{marginTop:5,borderRadius:10,flexDirection:'row',height:40,width:"100%",backgroundColor:'#4E3CAF'}]}
                  onPress={()=>goToInventory()}
                                    >
                    <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Done</Text>


                </TouchableOpacity>

                </View>
                 
              </View>

                  }

        </Dialog.Container>

        </ScrollView>
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
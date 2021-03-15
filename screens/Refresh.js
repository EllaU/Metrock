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
  BackHandler
} from 'react-native';


const HomeScreen=({navigation})=>{
  const[visible,setVisible]=useState(false);
  const[load,setLoad]=useState(false);
  const[success,setSuccess]=useState(false);
  const[token,setToken]=useState();
  const [error,setError]=useState();
  const[invoice,setInvoice]=useState()
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  },[]);
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


  const refreshToken=()=>{
    setLoad(true);
    setError();
  


    console.log(token)
    fetch("http://mobile.metrockenterprises.ng/api/v1/refresh",{
      method: "POST",
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' +token
      }
    })
   .then(response => response.json())
   .then(data => {

    console.log(data)
        if(data.success == true){
            setSuccess(true)
        }else{
            setLoad(false)
            setError(data.message)

            

        }  
    })
    .catch((error) => {
        console.log(error)
      setError("Oops! something went wrong")
      setLoad(false);
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
        <Feather name="arrow-right" size={20} color={"black"} />

      </TouchableOpacity>
    </View>
  );
}

  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar 
            barStyle={'dark-content'}
              backgroundColor={'white'}
             />
                     
          <View style={{height:hp("100%"),backgroundColor:'white',width:"100%",borderBottomLeftRadius:40,borderBottomRightRadius:40}}>

            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
              

               {
                   success?
                   <View style={{width:'100%',alignItems:'center'}}>
                        <Image
                        source={require('../assets/done.gif')}
                        style={{resizeMode: 'contain',height:"60%",width:"80%"}}

                            />
                        
                        
                        <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:20,marginTop:"10%",}}>Token Refreshed Succesfully!</Text> 
                   </View>

                   :
                   <View style={{width:'100%'}}>
                       
                    
                   <Text style={{fontFamily:"Quicksand-SemiBold",color:'#4e3caf',fontSize:20,marginTop:"3%",alignSelf:'center'}}>Refresh Token</Text> 
                   <Text numberOfLines={3} style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11,marginTop:"3%",width:'80%',textAlign:'center',alignSelf:'center'}}>
                   {token} 
                   </Text> 
                   
                    
                   {/* <Text style={{fontFamily:"Quicksand-Bold",color:'grey',fontSize:17,marginTop:"2%"}}>N50,000</Text>  */}
                  
                   <TouchableOpacity
                     style={[styles.UserGreet,{marginTop:20,borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"30%",backgroundColor:'#4E3CAF'}]}
                     onPress={()=>refreshToken()}
                                       >
                                           {
                                               load?
                                               <SkypeIndicator  color='white' size={20} />
                                             :
                                             <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Refresh</Text>
     
                                           }
     
                   </TouchableOpacity>

                   <Text style={{fontFamily:"Quicksand-Regular",color:'red',fontSize:13,marginTop:"3%",alignSelf:'center',textAlign:'center'}}>{error}</Text> 


                   </View>
                
                  

               }
               
            </View>
            <View style={{position:'absolute',marginTop:'20%',marginLeft:'5%',}}>
              <NavigationDrawerStructure navigationProps={navigation} />

            </View> 


          </View>

    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
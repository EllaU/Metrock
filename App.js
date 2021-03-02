// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code

import * as React from 'react';

import styles from "./stylesheet/style";

import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';

import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect} from 'react';


import Welcome from './screens/Welcome';
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



function App({navigation}){
  
 
 

  const SplashScreen = ({navigation}) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
 
    useEffect(() => {   
     
       

        setTimeout(() => {

          AsyncStorage.getItem('UserId').then(
            (value) =>
            {
              if(value===null){
                navigation.navigate("Login")
              }else{
                navigation.navigate('Welcome');

              }
            }
          );
 
         }, 2000);
    }, []);
  
    return (
      <View style={[styles.container,{backgroundColor:"white"}]}>
        <StatusBar translucent={true}
              backgroundColor={'white'}
             />
         <Image
            source={require('./assets/sLogo.png')}
            style={{resizeMode: 'contain',height:"30%",width:"30%"}}

          />
        <ActivityIndicator
          animating={animating}
          color="#4E3CAF"
          size="large"
          style={styles.activityIndicator}
        />
        
      </View>
    );
  };

  const Stack = createStackNavigator();
  

  function Login({navigation}) {
    const[userName ,setUserName]=useState('');
    const[userPassword, setUserPassword] = useState('');
    const[spinner,setSpinner] = useState(false);
    const[error , setError] = useState();
  
    const [visible, setVisible] = useState(false);
    const [connect, setConnect] = useState(false);
  
       
      const showDialog = () => {
        setVisible(true);
      };
    
      const handleCancel = () => {
        setVisible(false);
      };
      const handleConnect = () => {
        setConnect(false);
      };
    
      const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
      };
   
    

    const handleChangeTI = (text) => {
      setUserName(text);
     }

     const handleChangePass = (text) => {
      setUserPassword(text);
     }

     const fetchData=()=>{
      setSpinner(true);
      

      const {UserName} = userName;
      const {UserPassword} = userPassword;

      fetch('http://mobile.metrockenterprises.ng/api/v1/login',
      {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username: UserName,
          password: UserPassword,
        })
     }
     )
     .then(response => response.json())
     .then(data => {

      console.log('got data from login')
      
        if(data.success==false){
          showDialog();
          setSpinner(false);
          
        }else{
          // console.log(data.data.user.id)
          AsyncStorage.setItem('Token', data.data.token);
          AsyncStorage.setItem('UserId', JSON.stringify(data.data.user.id));
          AsyncStorage.setItem('UserName', data.data.user.username);
          AsyncStorage.setItem('FirstName', data.data.user.first_name)
          AsyncStorage.setItem('LastName', data.data.user.last_name)
          AsyncStorage.setItem('FullName', data.data.user.full_name)
          // console.log(data.data.token);

          AsyncStorage.getItem('Token').then(
            (value) =>
            {
              console.log("hiii" + value)
              fetch("http://mobile.metrockenterprises.ng/api/v1/sales-locations", {
                method: "GET",
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + value
                }
              })
            .then(response => response.json())
            .then(data => {
              console.log('got locations')
              console.log(data)

              if(data.success==true){
                AsyncStorage.setItem('Locations',JSON.stringify(data.data));
                navigation.navigate("Welcome");

              }

              
                
              })
              .catch((error) => {
                console.log('no location' + error);
              });
            }
          );


        }
        
        
      }).catch((error) => {
        console.log('cannot login' + error)
        setSpinner(false)
        setConnect(true);
      });
  
    }
   
    return(
      <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={{ }}>
        <StatusBar translucent={true}
          barStyle="light-content"
        backgroundColor={'#4E3CAF'}
        />
        <ScrollView 
        // contentContainerStyle={{height:'100%'}}
        // contentContainerStyle={{flexGrow: 1}}
        style={{height:"100%",flexGrow:1,backgroundColor:'white'}}
        >
        <View style={{height:hp('60%'),backgroundColor:'#4E3CAF',borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
          <View style={{height:'45%',alignItems:'center',paddingTop:'17%'}}>
              <Image
              source={require('./assets/logo.png')}
              style={{resizeMode: 'contain',height:"40%",width:"40%"}}

            />
            <Text style={{fontFamily:"Quicksand-Bold",color:'white',fontSize:20,marginTop:15}}>Some Welcome Message</Text> 
            <Text style={{fontFamily:"Quicksand-Regular",color:'white',fontSize:11,marginTop:7}}>A better way to manage your sales.</Text> 
          </View>
          <View style={{height:'55%',alignItems:'center',justifyContent:'center',bottom:0}}>
            <View style={{height:"10%"}}></View>
          <Image
            
            source={require('./assets/chef.png')}
            style={{ resizeMode: 'contain',height:'90%'}}
            />

          </View>
         
        </View>
        <View style={{height:hp('40%')}}>
          <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:12,width:"80%",alignSelf:'center',marginTop:'5%'}}>Username</Text>
          <TextInput
            onChangeText={UserName=> setUserName({UserName})}
            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            underlineColorAndroid='transparent'
            placeholder="John doe"
            placeholderTextColor='grey' 
            style={{fontFamily:'Quicksand-Regular',fontSize:12,paddingLeft:'5%',alignSelf:'center',height:40,width:"80%",borderWidth:1,marginTop:10,borderColor:'#E0E0E0',backgroundColor:'white',borderRadius:10}}
            />

          <Text style={{fontFamily:"Quicksand-Regular",color:'black',marginTop:'5%',fontSize:12,width:"80%",alignSelf:'center'}}>Password</Text>
          <TextInput
            onChangeText={UserPassword => setUserPassword({UserPassword})}
            secureTextEntry={true}
            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            underlineColorAndroid='transparent'
            placeholder="Password"
            placeholderTextColor='grey' 
            style={{fontFamily:'Quicksand-Regular',fontSize:12,paddingLeft:'5%',alignSelf:'center',height:40,width:"80%",borderWidth:1,marginTop:10,borderColor:'#E0E0E0',backgroundColor:'white',borderRadius:10}}
            />

                <TouchableOpacity
                                style={[styles.UserGreet,{marginTop:'5%',borderRadius:10,alignSelf:'center',flexDirection:'row',height:"15%",width:"80%",backgroundColor:'#4E3CAF'}]}
                                onPress={()=>fetchData()}
                            >
                                {spinner?
                                <ActivityIndicator
                                animating={spinner}
                                color="white"
                                size="small"
                                style={styles.activityIndicator}
                              />
                              :
                              <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Log in</Text>

                              }

                </TouchableOpacity>



        </View>
        {/* <View style={{height:200}}></View>  */}
        </ScrollView>
       
        <Dialog.Container visible={visible}
                  onBackdropPress={handleCancel}
                  contentStyle={{height:100}}
                >
                  <Dialog.Title
                    style={{fontFamily:'Quicksand-Regular',fontSize:13}}

                  >Invalid Login Credentials</Dialog.Title>
    
                  <Dialog.Button color={'#4E3CAF'} style={{fontFamily:'Quicksand-Light'}} label="Ok" onPress={handleCancel} />

        </Dialog.Container>
        <Dialog.Container visible={connect}
                  onBackdropPress={handleConnect}
                  contentStyle={{height:100}}
                >
                  <Dialog.Title
                    style={{fontFamily:'Quicksand-Regular',fontSize:13}}

                  >Please check your internet connection.</Dialog.Title>
    
                  <Dialog.Button color={'#4E3CAF'} style={{fontFamily:'Quicksand-Light'}} label="Ok" onPress={handleConnect} />

        </Dialog.Container>
     
      </View>
      </>

  

    );
  }

  return (
    
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={({navigation})=>({
              
              headerTitle:"",
              headerLeft:null,
              headerTransparent:true,
              headerRight: null,
                headerStyle:{
                  backgroundColor:'black',
                  // borderBottomColor:'black'
              }
          

          })} 
          />
          <Stack.Screen name="Login" component={Login} options={({navigation})=>({
            
              headerTitle:"",
              headerLeft:null,
              headerTransparent:true,
              headerRight:null,
                headerStyle:{
                  backgroundColor:'black',
              }
          

          })} 
           />
          <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
 


export default App;

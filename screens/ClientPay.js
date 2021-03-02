// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import styles from "../stylesheet/style";
import { SwipeListView } from 'react-native-swipe-list-view';

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
  TextInput,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('window').width;

const Home=({navigation,route})=>{
    const [visible,setVisible]=useState(false);
    const[value,setValue]=useState("");
    const[owe,setOwe]=useState();
    const[status,setStatus]=useState();


    const showDialog = () => {
        setVisible(true);
      };
    
      const handleCancel = () => {
        setVisible(false);
      };
    
    const handleCal=()=>{
        const a = sum - value;
        // console.log(a);
        if(a > 0){
            setOwe(a);
            setStatus('owe')
            showDialog();
        }else{
            if(a<0){
                const positive = Math.abs(a)
                setOwe(positive);
                setStatus('balance')
                showDialog();
            }else{
                if(a==0){
                    setOwe(a);
                    setStatus('paid');
                    showDialog();
                }
            }
        }

        
       
    }

      const handleInput = (input) => {
        setValue(value + input);
      };
      const handleDelete = () => {
        let str = value;
        str = str.slice(0, -1); 

        setValue(str);
      
      };

      const navigate=()=>{
        AsyncStorage.setItem('AmountP',value);
        AsyncStorage.setItem('AmountD',JSON.stringify(owe))

        handleCancel();
        navigation.navigate('Home Screen');
      }
  
    return (
        <>
         <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
            <StatusBar translucent={true}
                backgroundColor={'white'}
                barStyle={"dark-content"}
                />
           <View style={{height:'90%'}}>
           <View style={{width:'100%',justifyContent:'center',marginTop:'15%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Okemati Lanre</Text>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute',marginLeft:"5%"}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
                </View>
              
                <View style={{width:'90%',alignSelf:'center',marginTop:"10%"}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                        <Text style={{fontSize:15,alignSelf:'center',color:'#828282',fontFamily:'Quicksand-SemiBold'}}>Amount to be paid</Text>
                        <Text style={{fontSize:17,alignSelf:'center',color:'red',fontFamily:'Quicksand-Bold'}}>N32,000</Text>
                    </View>

                    <View style={{marginTop:"10%"}}>
                        <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Amount Paid</Text>

                        <TextInput
                        // onChangeText={text => setValue[0](text)}
                        // value={value}
                        defaultValue={value}
                        keyboardType="numeric"
                        editable={false}

                        // onChangeText={RefCode => this.setState({RefCode})}

                        underlineColorAndroid='transparent'
                        style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',borderRadius:10,marginTop:"1%"}}
                        />
                    </View>

                </View>

                <View style={{justifyContent:'space-between',flex:1,marginVertical:hp('5%')}}>
                <View style={{flexDirection:'row',width:'75%',alignSelf:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("1")}}
                    >

                    <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("2")}}
                    >

                       <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("3")}}
                    >

                        <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>3</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flexDirection:'row',width:'75%',alignSelf:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("4")}}
                    >

                    <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("5")}}
                    >

                       <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("6")}}
                    >

                        <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>6</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flexDirection:'row',width:'75%',alignSelf:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("7")}}
                    >

                    <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>7</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("8")}}
                    >

                       <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{handleInput("9")}}
                    >

                        <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>9</Text>
                    </TouchableOpacity>

                </View>
                <View style={{width:'75%',alignSelf:'center'}}>
          

                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,elevation:3,borderRadius:50,alignItems:'center',justifyContent:'center',alignSelf:'center'}}
                        onPress={()=>{handleInput("0")}}
                    >

                       <Text style={{fontSize:15,color:'black',fontFamily:'Quicksand-SemiBold'}}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:60,alignItems:'center',justifyContent:'center',alignSelf:'flex-end',position:'absolute'}}
                        onPress={()=>{handleDelete()}}
                    >

                       <Text style={{fontSize:13,color:'red',fontFamily:'Quicksand-SemiBold'}}>Delete</Text>
                    </TouchableOpacity>
              

                </View>
                </View>

                
                
           </View>
          <View style={{paddingVertical:10,elevation:30,backgroundColor:'white',height:'10%'}}>
            
            <TouchableOpacity
                style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF'}]}
                // onPress={()=>handleCal()}
                onPress={()=>navigation.navigate('HomeScreen')}

                                >
                <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Complete Payment</Text>


            </TouchableOpacity>

            </View>
          
        
        
        
        </SafeAreaView>
        </>
            
  
    );

}

export default Home;

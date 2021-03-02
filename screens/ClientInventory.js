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
        navigation.navigate('ClientScreen');
      }
  
    return (
        <>
         <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
            <StatusBar translucent={true}
                backgroundColor={'white'}
                barStyle={"dark-content"}
                />
           <ScrollView style={{height:'90%'}}>
           <View style={{width:'100%',justifyContent:'center',marginTop:'15%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Okemati Lanre</Text>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute',marginLeft:"5%"}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
                </View>
              
                <View style={{width:'90%',alignSelf:'center',marginTop:"10%"}}>
                <View
                        //  onPress={() => etId} 
                        
                        style={{height:70,width:'100%',backgroundColor:'white',justifyContent:'center',marginTop:7,flexDirection:'row'}}>
                        <View style={{width:'20%',height:'100%',backgroundColor:'#4e3caf',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                        <Image
                        source={require('../assets/pot.png')}
                        style={{resizeMode: 'contain',height:"70%",width:"70%",}}

                        />

                        </View>
                        <View style={{width:'80%',justifyContent:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                        <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13,width:"77%",}}>Refigirator</Text> 
                        <View style={{width:'3%'}}></View>
                        <View style={{flexDirection:'row',width:"20%"}}>
                            <Text style={{fontFamily:"Quicksand-Bold",color:'#4e3caf',fontSize:13}}>N2,000</Text> 


                        </View>
                        </View>
                    

                        </View>

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'5%'}}>
                        <Text style={{fontSize:13,alignSelf:'center',color:'#828282',fontFamily:'Quicksand-SemiBold'}}>Amount Purchased</Text>
                        <Text style={{fontSize:13,alignSelf:'center',color:'black',fontFamily:'Quicksand-Bold'}}>23</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'5%'}}>
                        <Text style={{fontSize:13,alignSelf:'center',color:'#828282',fontFamily:'Quicksand-SemiBold'}}>Amount Purchased</Text>
                        <Text style={{fontSize:13,alignSelf:'center',color:'black',fontFamily:'Quicksand-Bold'}}>23</Text>
                    </View>

                    <View style={{marginTop:"10%"}}>
                        <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Defected Items</Text>

                        <TextInput
                        // onChangeText={text => setValue[0](text)}
                        // value={value}
                        defaultValue={value}
                        

                        // onChangeText={RefCode => this.setState({RefCode})}

                        underlineColorAndroid='transparent'
                        style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',borderRadius:10,marginTop:"1%"}}
                        />
                    </View>
                    <View style={{marginTop:"10%"}}>
                        <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Good Items</Text>

                        <TextInput
                        // onChangeText={text => setValue[0](text)}
                        // value={value}
                        defaultValue={value}
                        

                        // onChangeText={RefCode => this.setState({RefCode})}

                        underlineColorAndroid='transparent'
                        style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',borderRadius:10,marginTop:"1%"}}
                        />
                    </View>

                </View>
                
                
           </ScrollView>
          <View style={{paddingVertical:10,elevation:30,backgroundColor:'white',height:'10%'}}>
            
            <TouchableOpacity
                style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF'}]}
                onPress={()=>navigation.navigate('ClientPay')}
                                >
                <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Replace Items</Text>


            </TouchableOpacity>

            </View>
           
        
        
        
        </SafeAreaView>
        </>
            
  
    );

}

export default Home;

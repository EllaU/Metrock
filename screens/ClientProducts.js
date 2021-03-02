// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";
import InputSpinner from "react-native-input-spinner";
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect,useRef} from 'react';
import SmoothPicker from 'react-native-smooth-picker';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';





// import all the components we are going to use
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
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





const HomeScreen=({navigation,route})=>{
 
  const[value,setValue]=useState(0);
  const [itemId,setItemId]=useState();
  
  const refRBSheet = useRef();
  const [searchText,setSearchText]=useState();

  const [data,setData]=useState([])
  useEffect(() => {  
    AsyncStorage.getItem('Clients').then(
        (value) =>
        {setData(value)
        console.log(value)}
      );

    }, []);
  

 

  const filteredData = searchText
      ? data.filter(x =>
          x.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : data;

     
  const[isRender,setisRender]=useState(false)
    


const setId = (pId)=>{
  setItemId(pId)
  setValue(0)
  refRBSheet.current.open()
}

const renderItem = ({ item,index }) => {

  return (
    <TouchableOpacity
    onPress ={()=>{navigation.navigate('ClientInventory')}}
    //  onPress={() => etId} 
     
     style={{height:70,width:'100%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15,flexDirection:'row'}}>
    <View style={{width:'20%',height:'100%',backgroundColor:'#4e3caf',alignItems:'center',justifyContent:'center'}}>
    <Image
      source={require('../assets/pot.png')}
      style={{resizeMode: 'contain',height:"70%",width:"70%"}}

      />

    </View>
    <View style={{width:'80%',justifyContent:'center'}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
      <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13,width:"77%",}}>Regigirator</Text> 
      <View style={{width:'3%'}}></View>
     
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11}}>N2,000</Text> 
              <Text style={{fontFamily:"Quicksand-Regular",color:'grey',fontSize:11}}>x2</Text>


      </View>
      <View style={{flexDirection:'row'}}>
              <Text style={{fontFamily:"Quicksand-Bold",color:'black',fontSize:13}}>N4,000 </Text>

      </View>
    </View>

    </View>

  </TouchableOpacity>
  );
};

  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar translucent={true}
         barStyle={'dark-content'}
              backgroundColor={'white'}
             />
             <View style={{width:'100%',justifyContent:'center',marginTop:'15%',marginBottom:'3%'}}>
                 <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Okemati Lanre</Text>
                 <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute',marginLeft:"5%"}}>
                 <Feather name="arrow-left" size={20} color={"black"} />
                 </TouchableOpacity>

             </View>
             <View style={{marginBottom:'1%'}}>
             <TextInput
                      onChangeText={text => setSearchText(text)}
                      value={searchText}

                      // onChangeText={RefCode => this.setState({RefCode})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
                      placeholder="Search for products"
                      placeholderTextColor='#E0E0E0' 
                      style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'90%'}}
                      />
             </View>
             <FlatList
              horizontal={false}
              style={{width:"90%",alignSelf:'center'}}
              data={filteredData}
            //   keyExtractor={(item)=> item.product_id.toString()}
              renderItem={renderItem}  
              extraData={isRender}
             />

     
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
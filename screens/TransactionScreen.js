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
  TouchableOpacity,
  ToastAndroid
} from 'react-native';





const HomeScreen=({navigation,route})=>{
 
  const[value,setValue]=useState(0);
  const [itemId,setItemId]=useState();
  const[spinner,setSpinner]=useState(false);
  
  const refRBSheet = useRef();
  const [searchText,setSearchText]=useState();
  const [token,setToken]=useState();

  const [syncData,setSyncData]=useState([]);
  useEffect(() => { 
    AsyncStorage.getItem('Sync').then(
        (value) =>
          {
            
            setSyncData(JSON.parse(value));
          
    
          }
        );

        AsyncStorage.getItem('Token').then(
          (value) =>
            {
              
              setToken(value);
            
      
            }
          );
  


}, []);
  

  const[visible,setVisible]=useState(false);
     
  const showDialog = () => {
    setVisible(true);
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };



  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  const filteredData = searchText
      ? syncData.filter(x =>
          x.ref.toLowerCase().includes(searchText.toLowerCase())
        )
      : syncData;

     
  const[isRender,setisRender]=useState(false)
    
  const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };


  return (
    <View style={{ flexDirection: 'row',position:'absolute',marginLeft:'5%' }}>
    <TouchableOpacity onPress={()=> toggleDrawer()}>
      {/*Donute Button Image */}
      <Feather name="align-left" size={20} color={"rgba(0,0,0,0.5)"} />

    </TouchableOpacity>
  </View>
  );
}

const picked= syncData.filter(x =>
  x.synced == false //not quantity but new quantity prop
);

console.log(picked)

const sync=()=>{

  syncData.forEach(myFunction);

}

function myFunction(item,index){

  if(item.synced == false){
    const data =  {
      "ref":item.ref,
      "invoice_no": item.invoice_no,
      "sales_location_id":parseInt(item.sales_location_id),
      "performed_at":JSON.stringify(item.performed_at),
      "amount_paid":parseInt(item.amount_paid),
      "client":{
        "phone": item.client.phone,
        "name":item.client.name
      },
      "products":item.products
    }
  
    // console.log(data)
  
    
    fetch("http://mobile.metrockenterprises.ng/api/v1/transactions/sync", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' +token,
        "Content-Type": 'application/json',
      },
      body:JSON.stringify(data)
    })
   .then(response => response.json())
   .then(data => {
    if(data.success==true){
      syncData[index].synced = true;
      setisRender(!isRender);
  
      console.log(item.synced);
      showToast(item.ref + "synced succesfully")
    
    }
    else{
      console.log(data)
    }
       //  toastr synced and async storage sync where ref == item.ref 
  
    })
    .catch((error) => {
      showToast("No internet connection")
      console.log('aww'+ error)
      setSpinner(false)
      
    });

  }


 

}



const renderItem = ({ item,index }) => {

  return (
    <TouchableOpacity
      onPress={()=>{
        navigation.navigate("ViewScreen",{
          tDate : item.date,
          tname: item.client.name,
          tphone: item.client.phone,
          tRef: item.ref,
          tProducts: item.products,
          tamountP: item.amount_paid,
          tOwe: item.owe,
          tTotal: item.total,
          tSync: item.synced,
        });

      }}
    style={{height:100,width:'100%',backgroundColor:'#f9f9f9',borderRadius:10,marginTop:'5%',justifyContent:'center'}}>
      <View style={{width:'90%',alignSelf:'center',}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

          <View style={{flexDirection:'row',}}>
          <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:15,marginRight:7}}>{item.client.name}</Text> 

            {item.synced?

              <Feather name="check" size={20} color={"#4e3caf"} />
            :
              undefined  
            }
          </View>
   
          <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:15}}>N{item.total}</Text> 


        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <Text style={{fontFamily:"Quicksand-Regular",color:'grey',fontSize:13}}>{item.ref}</Text> 


        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:7}}>
          <Text style={{fontFamily:"Quicksand-Regular",color:'grey',fontSize:13}}>{item.date}</Text> 
          <Text style={{fontFamily:"Quicksand-Regular",color: item.owe=='true'?'red':'green',fontSize:13}}>N{item.amount_paid}</Text> 


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
                 <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-Regular'}}>Transactions</Text>
                 <NavigationDrawerStructure navigationProps={navigation} />


             </View>
             <TextInput
                      onChangeText={text => setSearchText(text)}
                      value={searchText}

                      // onChangeText={RefCode => this.setState({RefCode})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
                      placeholder="Search in transaction Id"
                      placeholderTextColor='#E0E0E0' 
                      style={{fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height:40,width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'90%'}}
                      />
            
             <FlatList
              horizontal={false}
              style={{width:"90%",alignSelf:'center'}}
              data={filteredData}
              keyExtractor={(item)=> item.ref.toString()}
              renderItem={renderItem}  
              extraData={isRender}
             />


        {picked.length == 0?
        undefined
        :
        <View style={{paddingVertical:10,elevation:30,backgroundColor:'white'}}>
        <TouchableOpacity
            style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"30%",backgroundColor:'#4E3CAF'}]}
            onPress ={()=>{setSpinner(true),sync()}}
            
                              >
                                 {spinner?
                                <ActivityIndicator
                                animating={spinner}
                                color="white"
                                size="small"
                                style={styles.activityIndicator}
                              />
                              :
                              <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Sync</Text>

                              }


          </TouchableOpacity>

        </View>
        
      }
     
       

    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
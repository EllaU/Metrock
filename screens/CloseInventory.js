// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";

import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
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

import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect} from 'react';

import realm,{
  getSync
}from '../Database';


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
  TouchableOpacity,
  ToastAndroid
} from 'react-native';


const HomeScreen=({navigation,route})=>{

  const [invoiceP,setInvoiceP]=useState([]);

  const [token,setToken]=useState();
  const [cash,setCash]=useState();
  const [sales,setSales]=useState();

  const[showTransaction,setShowTransaction]=useState(false)

  const [invoice,setInvoice]=useState([]);
  const [sync,setSync]=useState(getSync());
  const [todaysDate,setTodaysDate]=useState();

  const [visible,setVisible]=useState(false);
  

  const [load,setLoad]=useState(false);
  
  const [searchText,setSearchText]=useState();

 

  

    useEffect(() => {
      
    AsyncStorage.getItem('Token').then(
      (value) =>
      setToken(value)
    );
    AsyncStorage.getItem('Cash').then(
      (value) =>
      setCash(value)
    );
    AsyncStorage.getItem('Sales').then(
      (value) =>
      setSales(value)
    );

    AsyncStorage.getItem('Invoice').then(
      (value) =>
      setInvoice(JSON.parse(value))
    );

      AsyncStorage.getItem('InvoiceP').then(
        (value) =>
        {
          const data = JSON.parse(value);
            
          const picked= data.filter(x =>
            x.quantity > 0 //not quantity but new quantity prop
          );

          setInvoiceP(picked)
        
      }
      );
 
         
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      const thisDate = date + '-' + month + '-' + year;

      setTodaysDate(thisDate);
     
    }, []);

    const filteredData = searchText
    ? invoiceP.filter(x =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : invoiceP;


    const showToast = (message) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    
    const showDialog = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };

    const closeInventory=()=>{
      setLoad(true)

      var isSynced = true;
      var itemsProcessed = 0;

      sync.forEach((item,index,array)=>{
        console.log(item.synced)
        if(item.synced == false){

          isSynced = false;

        }

        itemsProcessed++;
        console.log("stat"+isSynced)

        if(itemsProcessed === array.length){
          if(isSynced == false){
            setLoad(false)
            setShowTransaction(true)

          }else{
            
                const filter = invoiceP.map((item,index)=>{
                  const data = {
                    product_id : item.product_id,
                    quantity : item.quantity
                  }

                  return data;
                })
              
                console.log(invoice)
              
                fetch("http://mobile.metrockenterprises.ng/api/v1/transactions/close", {
                  method: "POST",
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' +token,
                    
                  },
                  body:JSON.stringify(
                    {
                      "invoice_no": invoice,
                      "total_sales": parseInt(sales),
                      "total_cash": parseInt(cash),
                      "products": filter
                    }
                  )
                })
              .then(response => response.json())
              .then(data => {
                if(data.success == true){
                  AsyncStorage.removeItem('InvoiceP')
                  AsyncStorage.removeItem('Invoice')
                  AsyncStorage.removeItem('Sales')
                  AsyncStorage.removeItem('Cash')

                  showToast('Sale closed successfully');
                  handleCancel;
                  navigation.reset({
                              index: 0,
                              routes: [{ name: 'HomeScreen' }],
                            });
                  
                }else{
                  setLoad(false)
                  showToast('Oops something went wrong');
                }
                console.log(data)

              })
              .catch((err)=>{
                setLoad(false)
                showToast('Please check your internet connection');
                  console.log(err)
              })
          }
        }
      })

      

      

      //end point
    }


  return (
    <>
    <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
         <StatusBar translucent={true}
         barStyle={'dark-content'}
              backgroundColor={'white'}
             />

            <View style={{alignSelf:'center',width:'90%',height:'90%'}}>
             <View style={{width:'100%',justifyContent:'center',marginTop:'15%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Close Sales</Text>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute'}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:'3%'}}>
                <Image
                source={require('../assets/logo.png')}
                style={{resizeMode: 'contain',height:80,width:80}}

                  />

                <Text style={{fontSize:13,color:'grey',fontFamily:'Quicksand-SemiBold'}}>{todaysDate}</Text>

               

                </View>
                <View style={{flexDirection:'row',}}>
                <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>Total Sale:</Text>
                <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-Bold',marginLeft:5}}>N{sales}</Text>


                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>Total Cash:</Text>
                <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-Bold',marginLeft:5}}>N{cash}</Text>


                </View>
                <View style={{width:'100%',marginBottom:'5%'}}>
                 {/* <Text style={{fontSize:12,color:'grey',fontFamily:'Quicksand-Regular'}}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare curabitur viverra.
                 </Text> */}



                </View>

                <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'5%',borderTopWidth:1,borderColor:'#E0E0E0'}}>
                <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>Products Available</Text>

                </View>
                <TextInput
                      onChangeText={text => setSearchText(text)}
                      value={searchText}

                      // onChangeText={RefCode => this.setState({RefCode})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
                      placeholder="Search for a product..."
                      placeholderTextColor='#E0E0E0' 
                      style={{fontFamily:'Quicksand-Regular',alignSelf:'center',height:40,width:"100%",borderBottomWidth:0.4,borderColor:'grey',fontSize:13,color:'black'}}
                      />

                <FlatList
              horizontal={false}
              style={{width:"100%",alignSelf:'center'}}
              data={filteredData}
              keyExtractor={(item)=> item.product_id.toString()}
              renderItem={({item,index})=>
            
              <View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'5%',borderBottomWidth:1,borderColor:"#e0e0e0"}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>{item.name} </Text>
              {/* <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular',marginLeft:2}}>{item.quantity} </Text> */}

              </View>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-SemiBold'}}>{item.quantity} left</Text>

            </View>
              }  
              // extraData={isRender}
             />

               

            </View>
            <View style={{elevation:30,backgroundColor:'white',height:'10%',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:'80%',alignSelf:'center',justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingVertical:'3%'}}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                <Text style={{fontSize:13,color:'red',fontFamily:'Quicksand-SemiBold',marginLeft:2}}>Cancel </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{showDialog()}}>
                <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-SemiBold',marginLeft:2}}>Proceed </Text>
                </TouchableOpacity>
                </View>

            </View>

            
      
            <Dialog.Container visible={visible}
                  onBackdropPress={handleCancel}
                  contentStyle={{padding:0,paddingBottom:40,width:'20%'}}
                  // contentStyle={{}}
                >
                  <View style={{alignItems:'center'}}>
                  {
                    !showTransaction?
                    <View style={{width:'100%'}}>
                        <View style={{width:'60%',alignSelf:'center',flexDirection:'row',justifyContent:'center'}}>

                          <Text style={{fontFamily:'Quicksand-SemiBold',color:'#4e3caf',fontSize:17}}>Close Sale</Text>
                            {
                              load?
                              <SkypeIndicator  color='grey' size={20} />
                              :
                              undefined
                            }
                          </View>
                      <View style={{width:'100%',alignItems:'center',marginTop:5}}>

                      <Text style={{fontFamily:'Quicksand-Regular',color:'grey',textAlign:'center',fontSize:11,marginTop:10,alignSelf:'center',width:'60%'}}>
                          Are you sure you want to close your sales?
                      </Text>
          
                    </View>
                  

                  <View style={{flexDirection:'row',alignSelf:'center',width:'90%',marginTop:0}}>
                  <TouchableOpacity
                    style={[styles.UserGreet,{marginTop:5,borderRadius:10,flexDirection:'row',height:40,width:"50%",backgroundColor:'white'}]}
                    onPress={handleCancel}
                                      >
                      <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-Regular'}}>NO</Text>


                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.UserGreet,{marginTop:5,borderRadius:10,flexDirection:'row',height:40,width:"50%",backgroundColor:'white'}]}
                    onPress={()=>closeInventory()}
                                      >
                      <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-Regular'}}>YES</Text>


                  </TouchableOpacity>

                  </View>
                    </View>
                    :
                  <View style={{width:'100%'}}>
                    <Text style={{fontFamily:'Quicksand-SemiBold',color:'#4e3caf',fontSize:17,alignSelf:'center'}}>Oops!</Text>
 
                     <View style={{width:'60%',alignItems:'center',marginTop:5,alignSelf:'center'}}>
 
                     <Text style={{fontFamily:'Quicksand-Regular',color:'grey',textAlign:'center',fontSize:11,marginTop:10,alignSelf:'center'}}>
                        Please sync all transactions before proceeding.
                     </Text>
 
                     </View>
           
                   <View style={{flexDirection:'row',alignSelf:'center',width:'90%',marginTop:0,justifyContent:'flex-end'}}>
                 <TouchableOpacity
                   style={[styles.UserGreet,{marginTop:5,borderRadius:10,flexDirection:'row',height:40,width:"50%",backgroundColor:'white',marginRight:5}]}
                   onPress={()=>{navigation.navigate('TransactionScreen'),handleCancel()}}
                                     >
                     <Text style={{fontSize:13,color:'#4e3caf',fontFamily:'Quicksand-SemiBold',marginRight:5}}>Go To Transactions</Text>
 
                     <Feather name="arrow-right" size={20} color={"#4e3caf"}  />
 
                 </TouchableOpacity>
                 </View>
                  </View>
                  
                
                   }
                  </View>

        </Dialog.Container>
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;



// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";
import { SwipeListView } from 'react-native-swipe-list-view';

import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useState,useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
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
  ToastAndroid
} from 'react-native';

const width = Dimensions.get('window').width;

const Home=({navigation})=>{
  const [serverData, setServerData] = useState([]);
    const [value,setValue]=useState();
    const [number,setNumber]=useState();
    const [name,setName]=useState();
    const [slid,setSlid]=useState();
    const [spinner,setSpinner]=useState();
    const [token,setToken]=useState();
    const [ref,setRef]=useState();
    const [total,setTotal]=useState();
    const [owe,setOwe]=useState();
    const [amountD,setAmountD]=useState();


    const [invoice,setInvoice]=useState();
    const [amountP,setAmountP]=useState();
    const [products,setProducts]=useState([]);
    const [clients,setClients]=useState([]);
   
    const showToast = (message) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    

      useEffect(() => {
        AsyncStorage.getItem('Token').then(
          (value) =>
          {setToken(value)
          console.log(value)}
        );
        AsyncStorage.getItem('Invoice').then(
          (value) =>
          {setInvoice(value)
          console.log(value)}
        );
        AsyncStorage.getItem('Total').then(
          (value) =>
          {setTotal(value)
          console.log(value)}
        );
        AsyncStorage.getItem('Owe').then(
          (value) =>
         { setOwe(value)
          // console.log(value)
        }
        );
        AsyncStorage.getItem('AmountD').then(
          (value) =>
         { setAmountD(value)
          // console.log(value)
        }
        );
        AsyncStorage.getItem('AmountP').then(
          (value) =>
         { setAmountP(value)
          // console.log(value)
        }
        );
        AsyncStorage.getItem('ClientProducts').then(
          (value) =>
          {
            setProducts(JSON.parse(value))
          // console.log(value)
        }
        );
        AsyncStorage.getItem('Clients').then(
          (value) =>{}
          // {setProducts(JSON.parse(value))
          // console.log(value)
        );
        AsyncStorage.getItem('Locations').then(
          (value) =>
          {
            // console.log(value)
          setServerData(JSON.parse(value))
        }

        );
       
      }, []);

      const generateData=()=>{

        setSpinner(true)
        // console.log(name + number)
        // AsyncStorage.clear();

        // get client info

      
        // get refid
       
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 15; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

      setRef(result)
     

      //  get transaction time
        var time = Math.floor(Date.now() / 1000)
      
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        const todaysDate = date + '-' + month + '-' + year;//format: dd-mm-yyyy;

       
        //get all the async
        
        AsyncStorage.getItem('Clients')
        .then((res) => {
          var o = [];
           o = res ? JSON.parse(res) : [];
           o.push(
            {phone:number ,
              name:name,
              date:todaysDate,
              owe:owe,
              amountD:amountD
            }
          )
          AsyncStorage.setItem('Clients', JSON.stringify(o));
        });


        const data =  {
          "ref":result,
          "invoice_no": invoice,
          "sales_location_id":parseInt(slid),
          "performed_at":JSON.stringify(time),
          "amount_paid":parseInt(amountP),
          "client":{
            "phone":number,
            "name":name
          },
          "products":products
        }

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

            AsyncStorage.getItem('Sync')
            .then((res) => {
              console.log('hi' +res)
              var o = [];
               o = res ? JSON.parse(res) : [];
    
               var length = o.length-1;
               o.push(
                {
                  id:length,
                  ref:result,
                  invoice_no:invoice,
                  sales_location_id:parseInt(slid),
                  performed_at:time,
                  amount_paid:parseInt(amountP),
                  total:total,
                  owe:owe,
                  synced:true,
                  date:todaysDate,
                  client:{
                    phone:number,
                    name:name
                  },
                  products:products
                }
              )
              console.log(o)
              AsyncStorage.setItem('Sync', JSON.stringify(o));
            });
            
            showToast(result + "synced succesfully")
          
          }
         
      
        })
        .catch((error) => {
          
          AsyncStorage.getItem('Sync')
          .then((res) => {
            console.log('hi' +res)
            var o = [];
             o = res ? JSON.parse(res) : [];
  
             var length = o.length-1;
             o.push(
              {
                id:length,
                ref:result,
                invoice_no:invoice,
                sales_location_id:parseInt(slid),
                performed_at:time,
                amount_paid:parseInt(amountP),
                total:total,
                owe:owe,
                synced:false,
                date:todaysDate,
                client:{
                  phone:number,
                  name:name
                },
                products:products
              }
            )
            console.log(o)
            AsyncStorage.setItem('Sync', JSON.stringify(o));
          });
          
        });

       

       

        // ======================
       setSpinner(false);
        navigation.navigate("ReceiptScreen",{
          tDate : todaysDate,
          tname: name,
          tphone: number,
          tLocation: value
        });


      }
  
    return (
        <>
         <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
            <StatusBar translucent={true}
                backgroundColor={'white'}
                barStyle={"dark-content"}
                />
           <ScrollView
           keyboardShouldPersistTaps='always'
           style={{height:'90%',width:'90%',alignSelf:'center'}}>
           <View style={{width:'100%',justifyContent:'center',marginTop:'15%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Client's Info</Text>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{position:'absolute'}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
            </View>
            <View style={{marginTop:"10%"}}>
                        <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Location</Text>

                        <SearchableDropdown
                          onTextChange={(text) => console.log(text)}
                          // Change listner on the searchable input
                          onItemSelect={(item) => { setValue(item.name),setSlid(item.sales_location_id),console.log(item.sales_location_id)}}
                          // Called after the selection from the dropdown
                          containerStyle={{width:'100%',marginTop:"3%"}}
                          // Suggestion container style
                          // defaultValue={value}
                          resetValue={false}
                          textInputStyle={{
                            fontFamily:'Quicksand-Regular',
                            paddingLeft:15,
                            alignSelf:'center',
                            height:50,
                            width:"100%",
                            borderWidth:1,
                            borderColor:'#E0E0E0',
                            fontSize:13,
                            color:'black',
                            borderRadius:10,
                  
                          }}
                          textInputProps={
                            {
                              value: value,
                              onChangeText:(text)=>setValue(text)
                              
                             }
                          }
                          itemStyle={{
                            // Single dropdown item style
                            padding: 10,
                            marginTop: 5,
                            backgroundColor: 'white',
                            borderRadius:5,
                            borderWidth:1,
                            borderColor:'#E0E0E0',
                            
                            // borderWidth: 1,
                          }}
                          itemTextStyle={{
                            // Text style of a single dropdown item
                            color: '#222',
                            fontFamily:'Quicksand-Regular',
                          }}
                          itemsContainerStyle={{
                            // backgroundColor:'red',
                            // Items container style you can pass maxHeight
                            // To restrict the items dropdown hieght
                            // height: '30%',
                            maxHeight:140
                          }}
                          items={serverData}
                          // Mapping of item array
                          defaultIndex={2}
                          // Default selected item index
                          placeholder="Select a location"
                          // Place holder for the search input
                          resetValue={false}
                          // Reset textInput Value with true and false state
                          underlineColorAndroid="transparent"
                          // To remove the underline from the android input
                        />

              </View>
              
            <View style={{marginTop:"10%"}}>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Phone number</Text>

              <TextInput
              onChangeText={text => setNumber(text)}
              value={number}
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              keyboardType="numeric"
              style={{
                fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height: 50,marginTop:'3%',width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'100%',borderRadius:10
              }}
              />
          </View>
          <View style={{marginTop:"10%"}}>
              <Text style={{fontSize:13,color:'black',fontFamily:'Quicksand-Regular'}}>Client's name</Text>

              <TextInput
              onChangeText={text => setName(text)}
              value={name}
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // keyboardType="numeric"
              style={{
                fontFamily:'Quicksand-Regular',paddingLeft:15,alignSelf:'center',height: 50,marginTop:'3%',width:"100%",borderWidth:1,borderColor:'#E0E0E0',fontSize:13,color:'black',width:'100%',borderRadius:10
              }}
              />
          </View>
           
           </ScrollView >
           <View style={{paddingVertical:10,elevation:30,backgroundColor:'white',height:'10%'}}>
            
            <TouchableOpacity
                style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF'}]}
                onPress={()=>generateData()}
                                >
                          {spinner?
                                <ActivityIndicator
                                animating={spinner}
                                color="white"
                                size="small"
                                style={styles.activityIndicator}
                              />
                              :
                              <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Generate Receipt</Text>

                              }

            </TouchableOpacity>

            </View>
        
        
        
        </SafeAreaView>
        </>
            
  
    );

}

export default Home;


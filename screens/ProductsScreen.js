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

  const {getProducts}= route.params;
  useEffect(() => {  

}, []);
  

  const[visible,setVisible]=useState(false);
     
  const showDialog = () => {
    setVisible(true);
  };



  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  const [data,setdata]=useState(getProducts)

  const filteredData = searchText
      ? data.filter(x =>
          x.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : data;

     
  const[isRender,setisRender]=useState(false)
    
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
        <Image
          source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const openDrawer =()=>{

}

const handleEditItem =()=>{
  console.log('hi'+getProducts)

  const newData = data.map(item=>{
    if(item.product_id == itemId){
      
      item.quantity = item.quantity - value;
      item.quantityOrdered = value;
      console.log(item)
      return item;
    }

    return item;
  })
  setdata(newData);
  // AsyncStorage.setItem('InvoiceP',JSON.stringify(newData))

  // console.log(filteredData)
  setisRender(!isRender);

}

const setId = (pId)=>{
  setItemId(pId)
  setValue(0)
  refRBSheet.current.open()
}

const navigate =()=>{
  
 const picked= data.filter(x =>
    x.quantityOrdered > 0 //not quantity but new quantity prop
  );
  // console.log(picked)
  navigation.navigate('CartScreen', {
    myCart:picked,
  });

}

const renderItem = ({ item,index }) => {

  return (
    <TouchableOpacity
    onPress ={()=>{setId(item.product_id)}}
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
      <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13,width:"77%",}}>{item.name}</Text> 
      <View style={{width:'3%'}}></View>
      <View style={{flexDirection:'row',width:"20%"}}>
        <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>{item.quantity}</Text> 
        <Text style={{fontFamily:"Quicksand-Light",color:'black',fontSize:11,marginLeft:4}}>in stock</Text> 


      </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
      <Text style={{fontFamily:"Quicksand-Bold",color:'#4e3caf',fontSize:11}}>N{item.unit_price}</Text> 
      {!item.quantityOrdered==0?
      <View style={{flexDirection:'row'}}>
              <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11}}>Qty: </Text>
              <Text style={{fontFamily:"Quicksand-Bold",color:'#4e3caf',fontSize:11}}>{item.quantityOrdered}</Text>


      </View>
      :
      undefined  
     }
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
                 <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Products</Text>
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
              keyExtractor={(item)=> item.product_id.toString()}
              renderItem={renderItem}  
              extraData={isRender}
             />

     
        <View style={{paddingVertical:10,elevation:30,backgroundColor:'white'}}>
        <TouchableOpacity
            style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF'}]}
            onPress ={()=>{navigate()}}
            
                              >
              <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Proceed to Cart</Text>


          </TouchableOpacity>

        </View>
        <RBSheet
        ref={refRBSheet}
        onClose={()=>handleEditItem()}
        // animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnDragDown={true}
        customStyles={{
          container:{
            backgroundColor:'#4e3caf',
            borderTopRightRadius:30,
            borderTopLeftRadius:30,
            height:hp('35%')
          },
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.4)"
          },
          draggableIcon: {
            backgroundColor: "#bbb"
          }
        }}
      >
           <View style={{width:'100%',justifyContent:'center',height:"20%"}}>
                 <Text style={{fontSize:20,alignSelf:'center',color:'rgba(255,255,255,0.5)',fontFamily:'Quicksand-SemiBold'}}>Quantity</Text>
               
             </View>
         <View style={styles.wrapperHorizontal}>
         <InputSpinner
              onChange={(num) => {
                setValue(num)
              }}
							value={value}
							style={{width:'100%',height:30,alignItems:'center',justifyContent:'center'}}
							color={"rgba(255,255,255,0.5)"}
              inputStyle={{fontFamily:'Quicksand-Regular',fontSize:30,color:'white'}}
              buttonStyle={{height:70,width:70,opacity:6,backgroundColor:'rgba(255,255,255,0.5)',alignItems:'center',justifyContent:'center',borderRadius:50}}
						/>
      </View>
      </RBSheet>
        
      
     
     
    </SafeAreaView>
    </>
  );
}

export default HomeScreen;
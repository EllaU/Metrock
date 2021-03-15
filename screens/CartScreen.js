// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';

import styles from "../stylesheet/style";
import Feather from 'react-native-vector-icons/Feather';

import { SwipeListView } from 'react-native-swipe-list-view';

import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';

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

export default class Home extends React.Component{
    constructor(props) {
    super(props)
    

    this.state ={
        value:0,
        total:0,
        data: [{}],
        render:false,
        showButton:false,
    }

}

 componentDidMount() {
   
    const {myCart} = this.props.route.params;

    this.setState({data:myCart});

  }

  deleteItemById = (id) => {
      console.log(id)
    const filteredData = this.state.data.filter(item => item.product_id !== id);
    this.setState({ data: filteredData });
    console.log(this.state.data)

    this.setState({render:!this.state.render});
  }

  navigate =(a)=>{
    const {navigate} = this.props.navigation;
    AsyncStorage.setItem('Total', JSON.stringify(a));

    // console.log("value")
    var o = [];
   
    this.state.data.forEach(function (item, index) {
        o.push(
         {
             product_id:parseInt(item.product_id) ,
             quantity:parseInt(item.quantityOrdered),
             price:parseInt(item.unit_price),
             name:item.name

         }
        )

          AsyncStorage.setItem('ClientProducts', JSON.stringify(o));
      
      });
    
    // AsyncStorage.setItem('Products', JSON.stringify(this.state.data));
    navigate('PayScreen',{
        sum:a
    })

  }
  

    render = () =>{
        
        
        const {navigate} = this.props.navigation;
        const a = this.state.data.reduce( function(cnt,o){ return cnt + (o.unit_price * o.quantityOrdered)}, 0);

       
        // AsyncStorage.setItem('Total',a)
        return (
    <>
        <SafeAreaView style={{backgroundColor:'white',height:'100%' }}>
            <StatusBar translucent={true}
                backgroundColor={'white'}
                barStyle={"dark-content"}
                />
                <View style={{width:'100%',justifyContent:'center',marginTop:'15%',marginBottom:'3%'}}>
                    <Text style={{fontSize:20,alignSelf:'center',color:'black',fontFamily:'Quicksand-SemiBold'}}>Cart</Text>
                    <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={{position:'absolute',marginLeft:"5%"}}>
                    <Feather name="arrow-left" size={20} color={"black"} />
                    </TouchableOpacity>
                </View>
              
                <SwipeListView
                    data={this.state.data}
                    extraData={this.state.render}
                    // keyExtractor={(item)=> item.product_id.toString()}
                        renderItem={ ({item, rowMap}) => (
                            <View  style={{height:70,width:'90%',backgroundColor:'#F9F9F9',justifyContent:'center',marginTop:15,flexDirection:'row',alignSelf:'center'}}>
                                <View style={{width:'20%',height:'100%',backgroundColor:'#4e3caf',alignItems:'center',justifyContent:'center'}}>
                                <Image
                                    source={require('../assets/pot.png')}
                                    style={{resizeMode: 'contain',height:"70%",width:"70%"}}

                                    />

                                </View>
                                <View style={{width:'80%',justifyContent:'center'}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%'}}>
                                    <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>{item.name}</Text> 
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontFamily:"Quicksand-SemiBold",color:'black',fontSize:13}}>{item.quantity}</Text> 
                                        <Text style={{fontFamily:"Quicksand-Light",color:'black',fontSize:11,alignSelf:'flex-end',marginLeft:4}}>in stock</Text> 


                                    </View>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'5%',marginTop:'1%'}}>
                                    <Text style={{fontFamily:"Quicksand-Bold",color:'#4e3caf',fontSize:11}}>N{item.unit_price}</Text> 
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontFamily:"Quicksand-Regular",color:'black',fontSize:11}}>Qty: </Text>
                                        <Text style={{fontFamily:"Quicksand-Bold",color:'#4e3caf',fontSize:11}}>{item.quantityOrdered}</Text>


                                </View>
                                </View>

                                </View>

                            </View>
                            
                        )}
                        renderHiddenItem={ ({item}) => (
                            <View style={{width:"85%",marginTop:15,alignSelf:'center',alignItems:'flex-end',height:70,justifyContent:'center'}}>
                               
                                <TouchableOpacity
                                    onPress={() => this.deleteItemById(item.product_id)}
                                style={{height:20,width:20,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                 <Text style={{fontFamily:'Quicksand-Bold',color:'white',alignSelf:'center',fontSize:13,marginTop:-3}}>x</Text>


                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={0}
                        rightOpenValue={-55}

                    />
          <View style={{paddingVertical:10,elevation:30,backgroundColor:'white'}}>
              <View style={{width:'90%',alignSelf:'center',justifyContent:'space-between',flexDirection:'row'}}>
              <Text style={{fontSize:15,alignSelf:'center',color:'black',fontFamily:'Quicksand-Regular'}}>Total</Text>
              <Text style={{fontSize:17,alignSelf:'center',color:'#4e3caf',fontFamily:'Quicksand-Bold'}}>N{a}</Text>

              </View>

              {
                a > 0?
                <TouchableOpacity
                    style={[styles.UserGreet,{borderRadius:10,alignSelf:'center',flexDirection:'row',height:40,width:"90%",backgroundColor:'#4E3CAF',marginTop:10}]}
                    onPress={()=>
                        this.navigate(a)
                        }
                                    >
                    <Text style={{fontSize:13,color:'white',fontFamily:'Quicksand-Bold'}}>Proceed</Text>


                </TouchableOpacity>
                :
                undefined
                
                }
            

        </View>
            
        
        
        
        </SafeAreaView>
        </>
    );
    }
}

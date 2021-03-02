import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
      },
      container2: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
        padding: 30,
        flexDirection:"row"
        // justifyContent: 'center',
      },
      coverOverlayContainer: {
        backgroundColor: 'transparent',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        justifyContent: 'space-between'
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
      image:{
        height:250,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
      },
      Tagline:{
        color:'white',
        fontSize:16,
        fontFamily:'Prompt-Bold',
        paddingHorizontal:14,
        marginBottom:30
      },
      buttonCircle: {
        width: 80,
        height: 80,
        backgroundColor: '#700A72',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-30
      },
      DarkOverlay:{
        position:"absolute",
        top:0,
        right:0,
        left:0,
        height:250,
        backgroundColor:'#000',
        opacity:0.0,

         
      },
      scene: {
        // flex: 1,
        height:500,
        width:"100%"
      },
      myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      },
      searchContainer:{
        paddingTop:170,
        paddingLeft:40,

      },
      backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      toolbar: {
        marginTop: 30,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        height:'100%',
        width:'100%',
        backgroundColor: 'black',
        justifyContent: 'center',
      },
      header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls:{
      backgroundColor:'rgba(0,0,0,0.5)',
      height:48,
      left:0,
      bottom:0,
      right:0,
      position:'absolute',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      paddingHorizontal:10,

    },
    mainButton:{
      marginRight:15,
    },
    duration:{
      color:'#FFF',
      marginLeft:15
    },
    footer: {
        height:'20%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
      postDesc:{
        color:'grey',
        fontSize:12,
        paddingVertical:10,
        paddingHorizontal:15,
        paddingBottom:0
      },

      UserGreet:{
        alignItems: "center",
        justifyContent:'center',
        backgroundColor: "#700A72",
        borderRadius:12

      },
      UserGreet2:{
        alignItems: "center",
        justifyContent:'center',
        backgroundColor: "#700A72",
        // padding: 20, 
        // borderRadius:12

      },

      ImageOverlay:{
        bottom:0,
        width:150,
        height:40,
        marginRight:5,
        position:'absolute',
        backgroundColor:'#000',
        opacity:0.6

      },
      ImageText:{
        position:'absolute',
        color:'white',
        marginTop:4,
        fontSize: 14,
        left: 20,
        bottom:10


      }
      ,
      regTitle:{
        fontSize:22,
        fontFamily:'Prompt-Bold',
        fontFamily:'sans-serif-thin'
      },
      regDesc:{
        marginTop:15,
        fontSize:17,
        fontFamily:'sans-serif-thin'

        // fontFamily:'Prompt-Bold'
      },
      loginText:{
        color:'white'
      },
      logo:{
        color:"#700A72",
        fontSize:13,
        marginTop:10
      },
      page:{
        width:'100%',

      },
      inputView:{
        width:"60%",
        // backgroundColor:"#363030",
        // // height:10,
        color:"white",
        // borderWidth:1,
        
        // // borderColor:'#860270',
        // // backgroundColor:'#363030'
        // // borderRadius:5,
        // // height:10,
        // marginBottom:40,
        // justifyContent:"center",
        alignItems:'center',
        // // paddingBottom:40,
        // // paddingTop:20,
        
        // // // paddingVertical:30,
        // // paddingHorizontal:5
        
      },
      inputText:{
        
        color:"grey",
        fontSize:11,
        marginTop:10,
        alignItems:'center'
      },
      searchRow:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        justifyContent:'space-between'
      },
      searchRowItem:{
        width:150,
        height:50,
        paddingHorizontal:20
      }
      ,
      searchBox:{
        marginTop:"5%",
        backgroundColor:'white',
        paddingLeft:"5%",
        padding:'2%',
        borderTopRightRadius: 20,
        borderBottomRightRadius:20,
        color:'black',
        
      },
      forgot:{
        color:"grey",
        fontSize:13,
        marginTop:10
      },
      csDesc:{
       alignSelf:'center',
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between'
      },
      cdDescText:{
        color:"white",
        // width:100,
        // backgroundColor:'red'
      },
      remindMeBtn:{
        width:250,
        paddingHorizontal:20,
        paddingVertical:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
      }
      ,
      loginBtn:{
        width:"60%",
        // backgroundColor:"#",
        // borderRadius:2,
        height:40,
        color:'white',
        borderColor:'white',
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },
      titleStyle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
      paragraphStyle: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
      },
      introImageStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300,
        height: 300,
        marginTop:-90
    
      },
      parentView:{
        width: 400,
        height:150
      },
      containerView:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'black'
      },
      rowContainer: {
        flex: 1,
        flexDirection: 'column',
      },
      rowItem:{
        flex: 1
      },
      child1:{
        backgroundColor: 'red',
        position: 'absolute',
      },
      child2: {
        alignSelf: 'center',
        backgroundColor: 'yellow'
      },
    
      wrapperHorizontal: {
       flexGrow:1,
        width: "60%",
        justifyContent:'center',
      
        alignSelf:'center',

     

      },
     
      OptionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
       
        height: "100%",

        
      },
})
 
export default styles;

import React from 'react'
import {
 Dimensions,Image, View,Text,TextInput,StyleSheet,TouchableOpacity,Alert
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';


export default class bashments extends  React.Component {
  constructor(props){

    super(props);
   
    this.state={
      shop_id:'',
      projectid:'',
       recceedata: [],
            outletcode: '',
            project_id: '',
    }
  };

  logout=async()=>{
  await  AsyncStorage.removeItem('processidd');
  //this.props.navigation.navigate('LoginScreen') 

  this.props.navigation.navigate('Loginselection');
  }
  onShopIdFunc= async ()=>{
    const outlet_code=this.state.shop_id;
    console.log('shopid---',this.state.outletcode)
   // const outlet_code=await AsyncStorage.getItem('outletcodee')
const project_id=await AsyncStorage.getItem('projectidd')
   
if(this.state.outletcode==""){
    
      Alert.alert('Please Enter Shop ID')
     }else{

      this.getrecceedata();
     //  this.props.navigation.navigate('Showdata',{shop_id:this.state.outletcode})
    //this.props.navigation.navigate('InstallationImage',{shop_id:outletcode})
     }
  }


  getrecceedata = async () => {
    // const shop_id = await this.props.navigation.getParam('shop_id');
    // const project_id = await AsyncStorage.getItem('projectidd')
    const project_id = await AsyncStorage.getItem('projectidd');
    
    this.setState({project_id:project_id});

   console.log('outletcode----',this.state.outletcode)
   console.log('projectid-----',this.state.project_id)
   
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://www.brandspring.in/BSIS/api/search-shop/" + this.state.outletcode + "/" + this.state.project_id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            this.setState({ recceedata: [] })
            if (result.status == true ) {
                console.log('inside if')
                if(result.data.length>0){
                for (let i = 0; i < result.data.length; i++) {
                    this.state.recceedata.push(result.data[i])
                }

                this.props.navigation.navigate('Showdata',{shop_id:this.state.outletcode, reccee_data:this.state.recceedata})
                
              } else{
                    this.setState({recceedata:[]});
                alert('No data found')
                }
            }
            else {
                alert(result.message)
            }
            console.log('recceedata ---', this.state.recceedata)
        })
        .catch(error => console.log('error', error));
}


render() {

    return (
<View style={styles.container}>
<View style={{padding:width/70,flexDirection:'row',backgroundColor:'red'}}>
     <View style={{flex:1,flexDirection:'row',margin:10}}>

<View style={{flex:2}}>

<Text style={{fontSize:18, color:'white'}}>Online Report System</Text>
</View>

{/* <View style={{flex:0.2}}>

<Icon name="cog-outline"  style={{fontSize :25}}/>

</View> */}
<View style={{flex:0.2}}>
<TouchableOpacity onPress={()=>this.logout()}>

<Icon name="logout"  style={{fontSize :25}}/>

</TouchableOpacity>
</View>

</View>

     </View>
     <View style={{flex:3}}>
       <Text style={{fontSize:18,fontWeight:'bold', padding:25}}>Shop ID</Text>
     <View style={{padding:width/35}}>

     <TextInput 
              style={styles.input}
              mode='outlined'

      label="Shop ID"
 placeholderTextColor='red'
 placeholder="Shop ID"

      value={this.state.outletcode}
      onChangeText={(shopid) => this.setState({outletcode:shopid, shop_id:shopid})}

    />
     </View>
     </View>
     <View style={{flex:0.5,marginTop:5}}>
     <TouchableOpacity  
     onPress={()=>this.onShopIdFunc() } 
     style={{backgroundColor:"red",padding:10,marginLeft:20,marginRight:20,borderRadius:5}} >
     <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Next </Text>
 </TouchableOpacity>
     </View>

</View>
    )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
},
inner: {
    // padding: 24,
    flex: 1,
    // justifyContent: "flex-end",
},
header: {
    fontSize: 36,
    marginBottom: 48,
},
lable:{
  fontSize:22,
  fontWeight:'bold',
  color:'black'
},
input: {
    height: height/15,
   borderRadius:8,
   marginLeft:width/25,
   marginRight:width/25,
   marginTop:0,
   marginBottom:0,
  //  padding:7,
    // backgroundColor:'white',
    borderWidth:1.5,
     color:"black",
    borderColor:'black'
    
 
   
},
btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
},
});
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,TouchableOpacity,
//   Image,Alert,Dimensions,} from 'react-native';
// var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height
// import axios from 'axios';
// import { Provider, TextInput } from 'react-native-paper';
// export default class Forgot extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         email:'',
      
//     };
//   }
 
//   async onForgotFun(){

//     const {email} = this.state;
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
   
//     if(email==""){
      
//      Alert.alert('Please Fill Email Field')
//     }
    
//     else  if(reg.test(email) === false)
//     {
//       Alert.alert('Please Fill Vaild Email ')
    
     
//       }

   

//     else{
//       axios.post('http://webapplicationindia.com/demo/quidsinapi​/api​/auth​/forgot-password', {
       
//         email:this.state.email,
     
//   })
//   .then((res)=> {
//       // AsyncStorage.setItem('user_id',res.data.user_id)

//       this.props.navigation.navigate('VerifyDetailsScreen') 
  
//   }).catch((e) => {
//       // console.log('enternal server error', e);
//       Alert.alert('enternal server error')

//   });

//     }
  
      
 

//   }

//   render() {
    
//     return (
//       <View   style={{flex:1}} >

// <View style={{padding:width/35,flexDirection:'row',backgroundColor:'red'}}>
//  <View style={{flex:0.22}}>
//    <Text style={{textAlign:'center'}}>abc</Text>
//  </View>
//  <View style={{flex:0.8}}>

//  <Text style={{textAlign:'center'}}>Online Report System</Text>
//  </View>

//  <View style={{flex:0.2}}>

//  <Text style={{textAlign:'center'}}>abc</Text>
//  </View>
//  <View style={{flex:0.2}}>

//  <Text style={{textAlign:'center'}}>abc</Text>
//  </View>
//  </View>
    
//  <View style={{height:height/5}}>
//   <View style={{padding:width/35,}}>
//       <Text style={{font:25,color:"red",textAlign:'center'}}> Branding Shop Details</Text>
//       </View>
//    <View style={{padding:width/35}}>
//               <TextInput 
//               style={styles.input}
//               mode='outlined'

//       label="Outlet Code"
//  placeholderTextColor='red'

//       // value={text}
//       onChangeText={(email) => this.setState({email})}

//     />
//  </View>
//  <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}>

//  <View style={{padding:width/35}}>
//  <Text style={{color:'red',right:0,position:'absolute',marginRight:width/12,fontSize:13}} >Create New Outlet</Text>
   
//  </View>
//  </TouchableOpacity>
 
//  </View>

//                </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
// },
// inner: {
//     // padding: 24,
//     flex: 1,
//     // justifyContent: "flex-end",
// },
// header: {
//     fontSize: 36,
//     marginBottom: 48,
// },
// lable:{
//   fontSize:22,
//   fontWeight:'bold',
//   color:'black'
// },
// input: {
//     height: height/15,
//    borderRadius:8,
//    marginLeft:width/25,
//    marginRight:width/25,
//    marginTop:0,
//    marginBottom:0,
//   //  padding:7,
//     backgroundColor:'white',
//     // borderWidth:1,
//     //  color:"red"
    
 
   
// },
// btnContainer: {
//     backgroundColor: "#2b003b",
//     marginTop: 12,
// },
// });

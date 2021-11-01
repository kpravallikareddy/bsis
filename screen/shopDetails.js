
import React from 'react'
import {
  Dimensions, Image, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal,
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';


export default class bashments extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      outletcode: '',
      showmodal: false,
      shopdetails:'',
    }
  };


  async componentDidMount() {
    // const outlet_codeData=await AsyncStorage.getItem('outletcodee')
   // this.setState({ outletcode: outlet_code })

  }


  getshopdetails = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://brandspring.in/BSIS/api/shop-details/" + this.state.outletcode, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('shop details--', result)
        if (result.status == 1) {
          AsyncStorage.setItem('outletcodee', this.state.outletcode)
          this.setState({  shopdetails:result.shop_details, showmodal:true});
          //this.props.navigation.navigate('BrandingInstallScreen',{outletcode:this.state.outletcode})
          console.log('shopdetails----',this.state.shopdetails)
        }
        else {
          alert(result.status)
        }
      })
      .catch(error => console.log('error', error));
  }


  logout = async () => {
    await AsyncStorage.removeItem('processidd');
    this.props.navigation.navigate('Loginselection');
  }

  onShopDetails = async () => {
    const outletcode = this.state.outletcode;

    console.log('{}{{}', outletcode)
    if (outletcode == "") {

      Alert.alert('Please Enter Outlet Code')
    } else {
      console.log('outletcode-----', this.state.outletcode)
      this.getshopdetails();

    }
  }

  modalclose= () =>{
   this.setState({showmodal:false})
  this.props.navigation.navigate('BrandingInstallScreen',{outletcode:this.state.outletcode})
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={{ padding: width / 70, flexDirection: 'row', backgroundColor: 'red' }}>
          <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>

            <View style={{ flex: 2 }}>

              <Text style={{ fontSize: 18, color: 'white' }}>Online Report System</Text>
            </View>

            {/* <View style={{flex:0.2}}>

<Icon name="cog-outline"  style={{fontSize :25}}/>

</View> */}
            <View style={{ flex: 0.2 }}>
              <TouchableOpacity onPress={() => this.logout()}>

                <Icon name="logout" style={{ fontSize: 25 }} />

              </TouchableOpacity>
            </View>

          </View>

        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 25, textAlign: 'center' }}>Branding Shop Details</Text>
          <View style={{ padding: width / 35 }}>

            <TextInput
              style={styles.input}
              mode='outlined'

              label="Outlet Code"
              placeholderTextColor='red'
              placeholder="Outlet Code"

              value={this.state.outletcode}
              onChangeText={(outletcode) => this.setState({ outletcode })}

            />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateNewShop')}>
            <View style={{ padding: width / 35 }}>

              <Text style={{ color: 'red', right: 0, position: 'absolute', marginRight: width / 17 }}>Create New Outlet</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.showmodal?
          <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showmodal}
            //onRequestClose={this.setState({showmodal:false})}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
               <View style={{ width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
              onPress={() =>this.setState({showmodal:false})}
              style={{alignItems:'flex-end',marginRight:0,marginLeft:Dimensions.get('window').width-80}}
              >
                <Text style={{color:'red',fontSize:20}}>
                  X
                </Text>
                </TouchableOpacity>
                <Text >
                  {this.state.shopdetails.shop_name}
                </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.shop_address}
                  </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.area},{this.state.shopdetails.city}
                </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.district},{this.state.shopdetails.state}
                </Text>

                <TouchableOpacity
            onPress={() => this.modalclose()}
           // onPress={() =>this.props.navigation.navigate('BrandingInstallScreen',{outletcode:this.state.outletcode})}
            style={{ backgroundColor: "red", padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 5,marginTop:10 }} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Continue </Text>
          </TouchableOpacity>             
              </View>
            </View>
          </Modal>
        </View>
          :
        <View style={{ flex: 0.5, marginTop: 5 }}>
          
          <TouchableOpacity
            onPress={() => this.onShopDetails()}
            style={{ backgroundColor: "red", padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 5 }} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Next </Text>
          </TouchableOpacity>
          
        </View>
          }
        {/* <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showmodal}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,

              }}
            >
               <View style={{ width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>

                <Text >
                  {this.state.shopdetails.shop_name}
                </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.shop_address}
                  </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.area},{this.state.shopdetails.city}
                </Text>
                <Text style={{marginTop:10}}>
                  {this.state.shopdetails.district},{this.state.shopdetails.state}
                </Text>

                <TouchableOpacity
            //onPress={() => this.onShopDetails()}
            onPress={() =>this.props.navigation.navigate('BrandingInstallScreen',{outletcode:this.state.outletcode})}
            style={{ backgroundColor: "red", padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 5 }} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Continue </Text>
          </TouchableOpacity>             
              </View>
            </View>
          </Modal>
        </View> */}
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
  lable: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    height: height / 15,
    borderRadius: 8,
    marginLeft: width / 25,
    marginRight: width / 25,
    marginTop: 0,
    marginBottom: 0,
    //  padding:7,
    // backgroundColor:'white',
    borderWidth: 1.5,
    color: "black",
    borderColor: 'black'



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

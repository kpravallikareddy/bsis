import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,TouchableOpacity,
  Image,Alert,Dimensions,} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import axios from 'axios';
import { Provider, TextInput } from 'react-native-paper';
export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
      
    };
  }
 
   onForgotFun=()=>{

    const {email} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
   
    if(email==""){
      
     Alert.alert('Please Fill Email Field')
    }
    
    else  if(reg.test(email) === false)
    {
      Alert.alert('Please Fill Vaild Email ')
    
     
      }

   

    else{
      axios.post('https://www.webapplicationindia.com/demo/reporting-system/api​/auth​/forgot-password', {
       
        email:this.state.email,
     
  })
  .then((res)=> {
      // AsyncStorage.setItem('user_id',res.data.user_id)

      this.props.navigation.navigate('VerifyDetailsScreen') 
  
  }).catch((e) => {
      // console.log('enternal server error', e);
      Alert.alert('enternal server error')

  });

    }
  
      
 

  }

  render() {
    
    return (
      <View   style={{flex:1}} >

     <View style={{height:height/4,justifyContent:'center',alignItems:'center'}}>
      
     <Image source={require('../assets/images/logo.jpeg')}  style={{width:(width/2)+((width/5)),height :height/10,marginTop:10}}/>
     </View>
    
 <View style={{height:height/5}}>
  <View style={{padding:width/35, marginLeft:width/25,}}>
      <Text style={{font:17,color:"red"}}> Forgot Password</Text>
      </View>
   <View style={{padding:width/35}}>
              <TextInput 
              style={styles.input}
              mode='outlined'

      label="Email"
 placeholderTextColor='red'

      // value={text}
      onChangeText={(email) => this.setState({email})}

    />
 </View>
 <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}>

 <View style={{padding:width/35}}>
 <Text style={{color:'red',right:0,position:'absolute',marginRight:width/12,fontSize:18}} >Signin</Text>
   
 </View>
 </TouchableOpacity>
   <View style={{padding:width/35}}>
  <TouchableOpacity  
  style={{backgroundColor:"gray",padding:10,marginLeft:width/4,marginRight:width/4}}
  onPress={()=>this.onForgotFun()}>
                             {/* <ImageBackground source={require('../assets/logbtn.png')}  style={{flexDirection:'row',width :(width/2)+5, height :height/13,justifyContent:'center',alignItems:'center',borderRadius:35 }}> */}
                              <Text style={{fontSize:20,fontWeight:'bold',color:'red',textAlign:'center'}}>Done </Text>
                              {/* </ImageBackground> */}
 </TouchableOpacity>
  </View>
 </View>

               </View>
    );
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
    backgroundColor:'white',
    // borderWidth:1,
    //  color:"red"
    
 
   
},
btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
},
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,TouchableOpacity,
  Image,Alert,Dimensions,ActivityIndicator} from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height
  import axios from 'axios';
  import {Picker} from '@react-native-picker/picker';
  import AsyncStorage from '@react-native-community/async-storage';
  import { Provider, TextInput } from 'react-native-paper';
  // import GetLocation from 'react-native-get-location'
  // import MapView  from 'react-native-maps';
export default class Loginselection extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        user:'',
        data:[],
        userValues:[],
        isLoader:false,
selectedValue:'',
latitude: "",
longitude: "",
    };
  }
//   async componentDidMount() {
//     axios.get('http://brandspring.co.in/BSIS/api/process-project-next', {
     
   
// })
// .then((res)=> {
//   console.log('+++++', res.data.projects)
  
//   let myUsers = res.data.projects.map((myValue,myIndex)=>{
//         console.log('========',myValue.project_name)
//         return(
//         <Picker.Item label={myValue.project_name} value={myValue.id} key={myIndex}/>
//         )
//         });
//         this.setState({
//           data:myUsers
//       })
// }).catch((e) => {
//     Alert.alert('enternal server error')

// });


// ////////////////============********************************//////////////////////////////////////

// GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 15000,
// })
// .then(location => {
//     console.log(location);
//     this.setState({
//       latitude:location.latitude,
//       longitude:location.longitude
//     })
//     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyANUak7seRUFnbf0BxDQU-iBomEaE_FJZs')
//         .then((response) => response.json())
//         .then((responseJson) => {
//           var dd=responseJson;
//           dd.results.map(ele=>{
            
//             console.log("llllllllllll",ele.formatted_address);
//           })
          
// })
// })
// .catch(error => {
//     const { code, message } = error;
//     console.warn(code, message);
// })
// }
//    onLogin=async()=>{

// this.setState({isLoader:true})
  
// // this.setState({loader:true})

//     const {selectedValue,email,password} = this.state;
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
//     if(selectedValue==""){
      
//      Alert.alert('Please Select Projet..')
// this.setState({isLoader:false})

//     }
//     else if(email==""){
      
//      Alert.alert('Please Fill Email Field')
// this.setState({isLoader:false})

//     }
//     else if(password==""){
//      Alert.alert('Please Fill Password Field')
// this.setState({isLoader:false})

//   }
    
//     else  if(reg.test(email) === false)
//     {
//       Alert.alert('Please Fill Vaild Email ')
// this.setState({isLoader:false})

    
     
//       }

   
//     else{
//     console.log(">??????????",this.state.selectedValue,this.state.email,this.state.password)
      
//       axios.post('http://brandspring.co.in/BSIS/api/auth/login', {
//         project_id :this.state.selectedValue,
//         email:this.state.email,
//         password:this.state.password,
     
//   })
//   .then((res)=> {
// console.log('99999999999',res.data)
// this.setState({isLoader:false})
//       if(res.data.process_id == 1){
//       AsyncStorage.setItem('Authentication', 'logged');
//       AsyncStorage.setItem('userid',res.data.user_id)
//         console.log('======Reccee=====',res.data)

//         AsyncStorage.setItem('outletcodee',res.data.outlet_code)
        
//         AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
//         AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
//         this.props.navigation.navigate('ShopDetails') 
//       }else  if(res.data.process_id ==2){
//         console.log('======Installation=====',res.data)
//       AsyncStorage.setItem('Authentication', 'logged');
//       AsyncStorage.setItem('userid',res.data.user_id)
//         AsyncStorage.setItem('outletcodee',res.data.outlet_code)
        
//         AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
//         AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
//         this.props.navigation.navigate('Entershopid') 

//       } if(res.data.process_id ==3){
//         console.log('======Direct Fix=====',res.data)
//       AsyncStorage.setItem('Authentication', 'logged');
//       AsyncStorage.setItem('userid',res.data.user_id)
//         AsyncStorage.setItem('outletcodee',res.data.outlet_code)
        
//         AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
//         AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
//         this.props.navigation.navigate('CreateNewShop') 

//       } 
//   }).catch((e) => {
//       console.log('Something went wrong..');
//       // Alert.alert('enternal server error')

//   });

//     }
//   }

  render() {
    
    return (
      <View   style={{flex:1}} >
    
     <View style={{height:height/4,justifyContent:'center',alignItems:'center'}}>
      
     <Image source={require('../assets/images/logo.jpeg')}  style={{width:(width/3)+((width/5)),height :height/14,marginTop:10}}/>
     </View>


    <View>
        <View>
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            style={{backgroundColor:'red', 
            height: height/15,
            borderRadius:8,
            marginLeft:width/25,
            marginRight:width/25,
            marginTop:50,
            marginBottom:0,
            alignItems:'center',
            justifyContent:'center',
            }}
            >
                <Text style={{color:'white',fontWeight:'bold'}}>
                    User Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Teamlogin')}
            style={{backgroundColor:'red', 
            height: height/15,
            borderRadius:8,
            marginLeft:width/25,
            marginRight:width/25,
            marginTop:50,
            marginBottom:0,
            alignItems:'center',
            justifyContent:'center',
            }}
            >
                <Text style={{color:'white',fontWeight:'bold'}}>
                    Team Login
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    
 {/* <View style={{height:height/5}}>
  <View style={{padding:width/35, marginLeft:width/25,}}>
      <Text style={{fontSize:26,fontWeight:'bold',color:"red"}}> SignIn</Text>
      </View>

    <View style={{height:height/14,marginLeft:width/15,marginRight:width/14,borderWidth:1,borderColor:'black',borderRadius:15}}> */}
    {/* <RNPickerSelect
  placeholder={{
    label: 'Select a Category...',
    value: '',
}}
        // onValueChange={(value) =>this.selectCategory(value)}
        // items={['ibv','bvbvb']}
        // value={this.state.img_cat}
     
    /> */}
    {/* <Picker selectedValue={this.state.selectedValue} onValueChange={(value)=>this.setState({selectedValue:value})}>
    <Picker.Item label="--Please Select Project--" />

    {this.state.data}
            </Picker>
        </View> 
   <View style={{padding:width/35}}>
              <TextInput 
              style={styles.input}
              mode='outlined'

      label="Email"
      // value={text}
      onChangeText={(email) => this.setState({email})}
    />
 </View>

   <View style={{padding:width/35}}>

                      <TextInput
                      style={styles.input}
              mode='outlined'
secureTextEntry={true}
      label="Password"
      // value={}
      onChangeText={(password) => this.setState({password})}
    />
 </View> */}
  {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotScreen')}>
 <View style={{padding:width/35}}>
   
 <Text style={{color:'red',right:0,position:'absolute',marginRight:width/12,fontSize:15}} >Forgot Password?</Text>
   
 </View>
 </TouchableOpacity> */}
 {/* <View style={{padding:width/35}}>
 {this.state.isLoader?(<ActivityIndicator  size="small" color="#0000ff" />):<TouchableOpacity  style={{backgroundColor:"gray",padding:10,marginLeft:width/4,marginRight:width/4}}
 onPress={()=>this.onLogin()}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'red',textAlign:'center'}}>Login </Text>
</TouchableOpacity>}
 </View>
 </View>*/}

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
  spinnerTextStyle: {
    color: 'red',
  },
});

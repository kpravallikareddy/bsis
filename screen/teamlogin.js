import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,TouchableOpacity,
  Image,Alert,Dimensions,ActivityIndicator, Platform} from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height
  import axios from 'axios';
  import {Picker} from '@react-native-picker/picker';
  import AsyncStorage from '@react-native-community/async-storage';
  import { Provider, TextInput } from 'react-native-paper';
  import DropDownPicker from 'react-native-dropdown-picker';
  // import GetLocation from 'react-native-get-location'
  // import MapView  from 'react-native-maps';
  import ModalDropdown from 'react-native-modal-dropdown';

export default class Teamlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        username:'',
        password:'',
        user:'',
        data:[],
        userValues:[],
        isLoader:false,
        teamvalues:['Sales Team', 'MIS','Brand Team'],
selectedValue:'',
latitude: "",
longitude: "",
fcm_token:'',
    };
  }
  componentDidMount = ()=> {

  this.renderteamnames();
 //await this.renderpickervalues();
//     axios.get('http://brandspring.co.in/BSIS/api/process-project-next', {
     
   
// })
// .then((res)=> {
//   console.log('+++++', res.data.projects)
  
// //   let myUsers = res.data.projects.map((myValue,myIndex)=>{
// //         console.log('========',myValue.project_name)
// //         return(
// //         <Picker.Item label={myValue.project_name} value={myValue.id} key={myIndex}/>
// //         )
// //         });

// let myUsers = this.state.teamvalues.map((myValue,myIndex)=>{
//              console.log('========',myValue)
//              return(
//              <Picker.Item label={myValue.label} value={myValue.value} key={myIndex}/>
//              )
//              });
//         this.setState({
//           data:myUsers
//       })
// }).catch((e) => {
//     Alert.alert('enternal server error')

// });

this.checkPermission();
    this.createNotificationListeners();
}

componentWillUnmount() {
  this.notificationListener;
  this.notificationOpenedListener;
}

renderteamnames = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://www.brandspring.in/BSIS/api/user-types", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // let myUsers = result.data.map((myValue,myIndex)=>{
      //   console.log('team names',myValue.title)
      //   return(
      //   <Picker.Item label={myValue.title} value={myValue.id} key={myIndex}/>
      //   )
      //   });

      // let myUsers = result.data.map((myValue,myIndex)=>{
      //      console.log('team names',myValue.title)
      //      return(
      //       <DropDownPicker.Item label={myValue.title} value={myValue.id} key={myIndex} />
      //      )
      //     });
      // for(let i=0;i<result.data.length;i++){
      //   this.state.data.push({label:result.data[i].title,value: result.data[i].title})
      // }
      for(let i=0;i<result.data.length;i++){
           this.state.data.push(result.data[i])
         }
      

    //  console.log('data',this.state.data)
  //  this.setState({
  //    data:myUsers})
     })
    .catch(error => console.log('error', error));
}

renderpickervalues =() => {
    let myUsers = this.state.teamvalues.map((myValue,myIndex)=>{
        console.log('========',myValue)
        return(
        <Picker.Item label={myValue} value={myValue} key={myIndex}/>
        )
        });
   this.setState({
     data:myUsers})


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
}

 //Check whether Push Notifications are enabled or not
 async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    this.getToken();
  } else {
    this.requestPermission();
  }
}

//Get Device Registration Token
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken:', fcmToken);
      this.setState({fcm_token:fcmToken});
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
}

//Request for Push Notification
async requestPermission() {
  try {
    await firebase.messaging().requestPermission();
    // If user allow Push Notification
    this.getToken();
  } catch (error) {
    // If user do not allow Push Notification
    console.log('Rejected');
  }
}

async createNotificationListeners() {
  
  // If your app is in Foreground
 
  // this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const localNotification = new firebase.notifications.Notification({
  //       show_in_foreground: true,
  //     })
  //     .setNotificationId(notification.notificationId)
  //     .setTitle(notification.title)
  //     .setBody(notification.body)

  //     firebase.notifications()
  //       .displayNotification(localNotification)
  //       .catch(err => console.error(err));
  // });

  this.notificationListener = firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;
    this.showAlert(title, body);
});


  //If your app is in background

  // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //   const { title, body } = notificationOpen.notification;
  //   console.log('onNotificationOpened:');
  //   Alert.alert(title, body)
  // });

  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { title, body } = notificationOpen.notification;
    this.showAlert(title, body);
});


  // If your app is closed

  // const notificationOpen = await firebase.notifications().getInitialNotification();
  // if (notificationOpen) {
  //   console.log('getInitialNotification:');
  // }

  const notificationOpen = await firebase.notifications().getInitialNotification();
if (notificationOpen) {
    const { title, body } = notificationOpen.notification;
    this.showAlert(title, body);
}

  // For data only payload in foreground

//     this.messageListener = firebase.messaging().onMessage
// ((message) => {
//       //process data message
//       console.log("Message", JSON.stringify(message));
//     });

this.messageListener = firebase.messaging().onMessage((message) => {
//process data message
console.log(JSON.stringify(message));
});

}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}

   onLogin=async()=>{

this.setState({isLoader:true})
  
// this.setState({loader:true})

console.log('value',this.state.selectedValue)
    const {selectedValue,email,password} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(selectedValue==""){
      
     Alert.alert('Please Select Projet..')
this.setState({isLoader:false})

    }
    else if(email==""){
      
     Alert.alert('Please Fill Email Field')
this.setState({isLoader:false})

    }
    else if(password==""){
     Alert.alert('Please Fill Password Field')
this.setState({isLoader:false})

  }
    
//     else  if(reg.test(email) === false)
//     {
//       Alert.alert('Please Fill Vaild Email ')
// this.setState({isLoader:false})
//       }

   
    else{
    console.log(">??????????",this.state.selectedValue,this.state.email,this.state.password)
      
      axios.post('https://www.brandspring.in/BSIS/api/auth/teamlogin', {
        user_type_id :this.state.selectedValue,
        email:this.state.email,
        password:this.state.password,
        fcm_token:this.state.fcm_token,
     
  })
  .then((res)=> {
console.log('99999999999',res.data)
this.setState({isLoader:false})
      if(res.data.process_id == 1 && res.data.user_type_id == "3"){
      AsyncStorage.setItem('Authentication', 'logged');
      AsyncStorage.setItem('userid',JSON.stringify(res.data.user_id))
        console.log('======Reccee  -- MIS=====',res.data)
        AsyncStorage.setItem('usertypeid',res.data.user_type_id)
        AsyncStorage.setItem('state',res.data.state)
        AsyncStorage.setItem('district',res.data.district)
        AsyncStorage.setItem('city',res.data.city)

       // AsyncStorage.setItem('outletcodee',res.data.outlet_code)
        
        AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
       // AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
       // this.props.navigation.navigate('ShopDetails') 
       this.props.navigation.navigate('Bsinfo') 
      }else  if(res.data.process_id ==2 && res.data.user_type_id =="3" ){
        console.log('======Installation -- sales =====',res.data)
      AsyncStorage.setItem('Authentication', 'logged');
      AsyncStorage.setItem('userid',JSON.stringify(res.data.user_id))
        //AsyncStorage.setItem('outletcodee',res.data.outlet_code)
        AsyncStorage.setItem('usertypeid',res.data.user_type_id)
        AsyncStorage.setItem('state',res.data.state)
        AsyncStorage.setItem('district',res.data.district)
        AsyncStorage.setItem('city',res.data.city)
        
        AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
       // AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
       // this.props.navigation.navigate('Entershopid') 
       this.props.navigation.navigate('Bsinfo') 
      } 
      else if(res.data.process_id ==3 && res.data.user_type_id == "3"){
        console.log('======Direct Fix -- Marketing=====',res.data)
      AsyncStorage.setItem('Authentication', 'logged');
      AsyncStorage.setItem('userid',JSON.stringify(res.data.user_id))
       // AsyncStorage.setItem('outletcodee',res.data.outlet_code)
       AsyncStorage.setItem('usertypeid',res.data.user_type_id)
        AsyncStorage.setItem('state',res.data.state)
        AsyncStorage.setItem('district',res.data.district)
        AsyncStorage.setItem('city',res.data.city)
        
        AsyncStorage.setItem('processidd',JSON.stringify(res.data.process_id))
       // AsyncStorage.setItem('projectidd',JSON.stringify(res.data.project_id))
       // this.props.navigation.navigate('CreateNewShop') 
       this.props.navigation.navigate('Bsinfo') 

      }



  
  }).catch((e) => {
      console.log('Something went wrong..');
      // Alert.alert('enternal server error')

  });

    }

  }

  renderTeamCodeRow(rowData) {
       
    const { id, title } = rowData;
    return(
     <View style={{height:30, marginBottom:5,justifyContent:'center'}}>
       <Text style={{fontSize:16}}>{`${title}`} </Text>
       {/* <Text > {`${state_id}`}</Text> */}
     </View>
    );
  }
  
  renderButtonText(rowData){
    const { id, title } = rowData;
    console.log(`${id} - ${title}`);
    return ` ${title}`;
  }
  


  render() {
    
    return (
      <View   style={{flex:1}} >
    
     <View style={{height:height/4,justifyContent:'center',alignItems:'center'}}>
      
     <Image source={require('../assets/images/logo.jpeg')}  style={{width:Platform.OS === 'android'?(width/2)+((width/5)):(width/2)+((width/4)),height :Platform.OS === 'android'?height/10:height/12,marginTop:10}}/>
     </View>
    
 <View style={{height:height/5}}>
  <View style={{padding:width/35, marginLeft:width/25,}}>
      <Text style={{fontSize:26,fontWeight:'bold',color:"red"}}> SignIn</Text>
      </View>

    <View >
    {/* <RNPickerSelect
  placeholder={{
    label: 'Select a Category...',
    value: '',
}}
        // onValueChange={(value) =>this.selectCategory(value)}
        // items={['ibv','bvbvb']}
        // value={this.state.img_cat}
     
    /> */}
    {/* <Picker 
    itemStyle={{textAlign:'center',height:height/14 }}
    style={{height:height/14,marginLeft:width/15,marginRight:width/14,borderWidth:1,borderColor:'black',borderRadius:15,}}
    selectedValue={this.state.selectedValue} 
    onValueChange={(value)=>this.setState({selectedValue:value})}
    >
    {/* <Picker.Item label="--Please Select Project--" /> */}
    {/* {this.state.teamvalues} 
    {this.state.data}
            </Picker> */}

            {/* <DropDownPicker 
           // defaultValue={this.state.selectedValue}
            defaultIndex={0}
            containerStyle={{height: height/14, width:width-50, marginLeft:width/15,marginRight:width/14}}
            items={this.state.data}
            onChangeItem={(item) => this.setState({selectedValue:item.value})}
            /> 
            let myUsers = result.data.map((myValue,myIndex)=>{
      //   console.log('team names',myValue.title)
      //   return(
      //   <Picker.Item label={myValue.title} value={myValue.id} key={myIndex}/>
      //   )
      //   });
            */}
          <ModalDropdown 
          options={this.state.data}
          //defaultIndex={0}
         // defaultValue={this.state.selectedValue}
          //onSelect={value =>this.setState({selectedValue:(String(this.state.data[value]))})}
          //onSelect={value =>this.setState({selectedValue:this.state.data[id]})}
          style={{height: height/15, width:width-50, marginLeft:width/15,marginRight:width/14,borderColor:'black',borderRadius:15,borderWidth:1,justifyContent:'center'}}
          dropdownTextStyle={{color:'black',fontSize:14, marginTop:5,marginBottom:5}}
          dropdownStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3,marginTop:30,marginLeft:10 }}
          textStyle={{color:'black',fontSize:18, marginLeft:10}}
          renderRow={this.renderTeamCodeRow.bind(this)}
          renderButtonText={(rowData)=>this.renderButtonText(rowData)}
          onSelect={ async(idx, value)=> await this.setState({selectedValue:value.id})}
          // console.log('selected team ---',value.id)
          />

        </View> 
   <View style={{padding:width/35}}>
              <TextInput 
              style={styles.input}
              mode='outlined'
              autoCapitalize='none'
              placeholderTextColor="red"
      label="Email/phonenumber"
      // value={text}
      //theme={{ colors: { primary: 'red', } }}
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
 </View>
  {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotScreen')}>
 <View style={{padding:width/35}}>
   
 <Text style={{color:'red',right:0,position:'absolute',marginRight:width/12,fontSize:15}} >Forgot Password?</Text>
   
 </View>
 </TouchableOpacity> */}
 <View style={{padding:width/35}}>
 {this.state.isLoader?(<ActivityIndicator  size="small" color="#0000ff" />):
 <TouchableOpacity  style={{backgroundColor:"gray",padding:10,marginLeft:width/4,marginRight:width/4}}
 onPress={()=>this.onLogin()}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'red',textAlign:'center'}}>Login </Text>
</TouchableOpacity>
 } 
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
  spinnerTextStyle: {
    color: 'red',
  },
});

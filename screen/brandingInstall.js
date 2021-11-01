
// import React from 'react'
// import {
//  Dimensions,Image, View,Text,StyleSheet,TouchableOpacity,Alert, ScrollView
// } from 'react-native'
// var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Picker} from '@react-native-picker/picker';
// import axios from 'axios';
// import { Provider, TextInput } from 'react-native-paper';
// // import { RNCamera } from 'react-native-camera';
// import * as ImagePicker from 'react-native-image-picker';
// import AsyncStorage from '@react-native-community/async-storage';

// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// var radio_props = [
//   {label: 'Yes    ', value:'Yes' },
//   {label: 'No   ', value:'No' },

// ];

// export default class bashments extends  React.Component {
//   constructor(props){

//     super(props);
   
//     this.state={
//       data:[],
// selectedValue:'',
// showCamera:false,
// filepath: {
//   data: '',
//   uri: ''
// },
// fileData: '',
// fileUri: '',
// option:'Yes',
// takingPic:false,
// shop_id:''
//     }
//   };
//   logout=async()=>{
//   await  AsyncStorage.removeItem('Authentication');
//   this.props.navigation.navigate('LoginScreen') 


//   }
//   async componentDidMount() {
//     axios.get('http://brandspring.co.in/BSIS/api/process-project-next', {
     
   
// })
// .then((res)=> {
  
//   let myUsers = res.data.processes.map((myValue,myIndex)=>{
//         return(
//         <Picker.Item label={myValue.process_title} value={myValue.id} key={myIndex}/>
//         )
//         });
//         this.setState({
//           data:myUsers
//       })
// }).catch((e) => {
//     Alert.alert('enternal server error')

// });
//   }
//   // takePicture = async () => {
//   //   this.setState({
//   //     showCamera:true
//   //   })
//   //   console.log('-------',this.state.showCamera)
//   //   if (this.camera) {
//   //     const options = { quality: 0.5, base64: true };
//   //     const data = await this.camera.takePictureAsync(options);
//   //     console.log(data.uri);
//   //   }
//   // };
//   onShow=()=>{
//     console.log('?????????')
//     this.setState({showCamera:true})
//   }
//   takePicture = async () => {
//     if (this.camera && !this.state.takingPic) {

//       let options = {
//         quality: 0.85,
//         fixOrientation: true,
//         forceUpOrientation: true,
//       };

//       this.setState({takingPic: true});

//       try {
//          const data = await this.camera.takePictureAsync(options);
//          const capture=data;
//          console.log('77777777777',capture)
//         //  Alert.alert('Success', JSON.stringify(data));
//          this.setState({takingPic: false,showCamera:false,fileUri:capture.uri});
//       } catch (err) {
//         Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
//         return;
//       } finally {
//       }
//     }
//   };
// //===============================================================================

// launchCamera = () => {
//   let options = {
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };
//   ImagePicker.launchCamera(options, (response) => {
//     console.log('Response = ', response);

//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton);
//       alert(response.customButton);
//     } else {
//       const source = { uri: response.uri };
//       console.log('response', JSON.stringify(response));
//       this.setState({
//         filePath: response,
//         fileData: response.data,
//         fileUri: response.uri
//       });
//     }
//     console.log('-------1',this.state.filePath)
//     console.log('-------2',this.state.fileData)
//     console.log('-------3',this.state.fileUri)

//   });

// }
//  submitBrandingspace=async()=>{
//    if(this.state.option === "Yes"){
//     console.log('YesYesYes')

//      setTimeout(()=>{
//       // this.props.navigation.navigate('BrandingInstallScreen') 

//     },5000)

//    }else{
//   const userid=await AsyncStorage.getItem('userid')
     
// // const outlet_code=await AsyncStorage.getItem('outletcodee')

// const outlet_code = await this.props.navigation.getParam('outletcode');
// const project_id=await AsyncStorage.getItem('projectidd')
// const process_id=await AsyncStorage.getItem('processidd')
     
//   const {selectedValue,elementheight,elementwidth,fileUri,option} = this.state;
//   console.log('8888888888881',selectedValue)
//   console.log('8888888888882',elementheight)
//   console.log('8888888888883',elementwidth)
//   console.log('8888888888884',this.state.fileUri)
//   console.log('8888888888885',option)

//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
 
//   if(selectedValue==""){
    
//    Alert.alert('Please Select Installation Element')
//   }
//   else if(elementheight==""){
//    Alert.alert('Please Enter Element Width(inch')
// }
  
//   else  if(elementwidth=="")
//   {
//     Alert.alert('Please Enter Element Height(inch) ')
  
   
//     }
//     else  if(fileUri === null)
//     {
//       Alert.alert('Please Upload Image! ')
    
     
//       }
//       else  if(option=="")
//       {
//         Alert.alert('Please Select One Option! ')
      
       
//         }
 
//   else{
//     console.log('222222222',userid,project_id,process_id, outlet_code,selectedValue, elementheight, elementwidth,)
//     var formData = new FormData();
//     formData.append("project_id", project_id);
//     formData.append("process_id", process_id);
//     formData.append("outlet_code", outlet_code);
//     formData.append("installation_element", selectedValue);
//     formData.append("element_height", elementheight);
//     formData.append("element_width", elementwidth);
//     formData.append("branding_space_picture",  {
//       uri: fileUri,
//       type: 'image/jpeg',
//       name: 'image.jpg',
//     });

//     axios.post(`http://brandspring.co.in/BSIS/api/save-branding-space/${userid}`,
//     formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     } 
// )
// .then((res)=> {
// // Alert.alert(res.data);
// console.log('====+++++++++++====',res.data)
// if(res.data.status ==1){

//   this.props.navigation.navigate('FrontImgScreen',{shop_id:JSON.stringify(res.data.shop_id)}) 
// }else{
  
// }
  
// }).catch((e) => {
//     console.log('Something went wrong',e);

// });

//   }
// }
// }


// removeImage =()=>{
//   this.setState({fileUri:''})
// }
// render() {
// // if(this.state.showCamera){
// //   return(
// //     <>

// //     <RNCamera 
// //       ref={ref => {
// //         this.camera = ref;
// //       }}
// //       captureAudio={false}
// //       style={{flex: 1}}
// //       type={RNCamera.Constants.Type.back}
// //       androidCameraPermissionOptions={{
// //         title: 'Permission to use camera',
// //         message: 'We need your permission to use your camera',
// //         buttonPositive: 'Ok',
// //         buttonNegative: 'Cancel',
// //       }} 
    
// //       >
// //         {/* <View   activeOpacity={0.5}
// //       style={styles.btnAlignment}
// //       onPress={this.takePicture()}>
// // <Icon name="camera" size={50} color="#fff" />
// //         </View> */}
// //         {/* <TouchableOpacity onPress={()=>this.takePicture()}>

// //         <View style={{alignItems:'center'}} >
// // <Icon name="camera" size={50} color="white"style={{marginBottom:5}} />
// //         </View>
// //         </TouchableOpacity> */}
// //         </RNCamera>

// //         <TouchableOpacity onPress={()=>this.takePicture()}>

// //         <View style={{flexDirection:'column',backgroundColor:'white',alignItems:'center'}} >
// // <Icon name="camera" size={50} color="black" />
// //         </View>
// //         </TouchableOpacity>
// //         </>
// //   )
// // }else{
// //   console.log('88888888888',this.state.fileUri)
//     return (
// <View style={styles.container}>
//      <View style={{padding:width/70,flexDirection:'row',backgroundColor:'red'}}>
//      <View style={{flex:1,flexDirection:'row',margin:10}}>

// <View style={{flex:2}}>

// <Text style={{fontSize:18, color:'white'}}>Online Report System</Text>
// </View>

// {/* <View style={{flex:0.2}}>

// <Icon name="cog-outline"  style={{fontSize :25}}/>

// </View> */}
// <View style={{flex:0.2}}>
// <TouchableOpacity onPress={()=>this.logout()}>

// <Icon name="logout"  style={{fontSize :25}}/>

// </TouchableOpacity>
// </View>

// </View>

//      </View>
//      <View style={{flex:3}}>
//      <ScrollView>
//      {/* <View style={{flex:0.2}}> */}
//      <View style={{padding:width/70,marginLeft:width/20,marginTop:25,marginRight:width/20
//       ,borderWidth:1,borderColor:'black',borderRadius:8}}>

//      <Picker selectedValue={this.state.selectedValue} onValueChange={(value)=>this.setState({selectedValue:value})}>
//     <Picker.Item label="--Please Select Installation Element--" />
//     {this.state.data}

//             </Picker>
//      </View>
//      {/* </View> */}

//      <View style={{padding:width/35,marginTop:25,borderWidth:0.2,shadowColor:'gray',borderRadius:10,
//      marginLeft:width/20,marginRight:width/20}}>
 
//               <TextInput 
//               style={styles.input}
//               mode='outlined'

//               label="Size of Element-Width(inch)"

//       // value={text}
//       onChangeText={(elementheight) => this.setState({elementheight})}
//     />
//  </View>
//  <View style={{padding:width/35,marginTop:25,
//      marginLeft:width/20,marginRight:width/20,borderWidth:0.2,shadowColor:'gray',borderRadius:10}}>
 
//               <TextInput 
//               style={styles.input}
//               mode='outlined'

//               label="Size of Element-height(inch)"

//       // value={text}
//       onChangeText={(elementwidth) => this.setState({elementwidth})}
//     />
//  </View>

// <View style={{padding:width/45,marginTop:25,borderWidth:0.2,shadowColor:'gray',borderRadius:10,
// marginLeft:width/20,marginRight:width/20,}}>
//   <View>

// <Text style={{fontSize:18,fontWeight:'bold'}}>Click Installation Picture</Text>
//   </View>
// <TouchableOpacity onPress={this.launchCamera}>
// <View style={{justifyContent:'center',alignItems:'center'}}>

// {this.state.fileUri ?(
//   <View style={{flexDirection:'row'}}>
//   <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>

// <Image source={{uri:this.state.fileUri}} style={{width:(width/3),height :height/5}}/>
//   </View>
//   <View style={{flex:0.2}}>
//     <TouchableOpacity onPress={()=>this.removeImage()}>

// <Text style={{color:'black'}}>dd</Text>
//     </TouchableOpacity>
//   </View>
//   </View>

//   ):<Image source={require('../assets/images/addpic.png')}  style={{width:(width/3),height :height/5}}/>}
// </View>
// </TouchableOpacity>

// </View>
// <View style={{padding:width/35,marginTop:20,borderWidth:0.2,shadowColor:'gray',borderRadius:10,marginLeft:width/20,marginRight:width/20}}>
// <Text style={{fontSize:18,marginTop:5,fontWeight:'bold'}}>Add Another branding area?</Text>
// <RadioForm
//   radio_props={radio_props}
//   initial={0}
//   // formHorizontal={true}
//  animation={true}
//   // labelHorizontal={true}
//   onPress={(option) => {this.setState({option})}}
// />
// </View>
//      </ScrollView>
//      </View>
//      <View style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//      <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ShopDetails') }
//      style={{backgroundColor:"gray",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center',margin:10}} >
//      <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Previous </Text>
//  </TouchableOpacity>
//  <TouchableOpacity  
//  onPress={()=>this.submitBrandingspace()} 
// //  onPress={()=>this.props.navigation.navigate('FrontImgScreen') }
//  style={{backgroundColor:"red",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center'}}>
//      <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Next </Text>
//  </TouchableOpacity>
//      </View>

// </View>
//     )
// // }    
// }
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
//   height: height/18,
//  borderRadius:8,
//  marginLeft:width/25,
//  marginRight:width/25,
//  marginTop:0,
//  marginBottom:0,
// //  padding:7,
//   backgroundColor:'white',
// },
// btnContainer: {
//     backgroundColor: "#2b003b",
//     marginTop: 12,
// },
// });


import React from 'react'
import {
  Dimensions,Image, View,Text,StyleSheet,TouchableOpacity,Alert, ScrollView,ActivityIndicator
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Provider, TextInput } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location'

import Marker from "react-native-image-marker"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Yes    ', value:'Yes' },
  {label: 'No   ', value:'No' },

];

export default class bashments extends  React.Component {
  constructor(props){

    super(props);
   
    this.state={
      data:[],
selectedValue:'',
showCamera:false,
filepath: {
  data: '',
  uri: ''
},
fileData: '',
fileUri: '',
option:'Yes',
takingPic:false,
shop_id:'',
elementheight:'',
elementwidth:'',
        isLoader:false,
        markResult:'',
        latitude: "",
longitude: "",
addressFatch:'',

    }
  };
  logout=async()=>{
  await  AsyncStorage.removeItem('processidd');
  //this.props.navigation.navigate('LoginScreen') 
  this.props.navigation.navigate('Loginselection');


  }
  async componentDidMount() {
await console.log('outletcodeinbrandinstall ------',this.props.navigation.getParam('outletcode'))

    axios.get('https://www.brandspring.in/BSIS/api/get_installation_options', {
     
   
})
.then((res)=> {
 // console.log('vvvvvvvvv',res.data)
  let myUsers = res.data.installation_options.map((myValue,myIndex)=>{
        return(
        <Picker.Item label={myValue.option} value={myValue.id} key={myIndex}/>
        )
        });
        this.setState({
          data:myUsers
      })
}).catch((e) => {
    // Alert.alert('enternal server error')

});
////////////////============********************************//////////////////////////////////////

GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
.then(location => {
  console.log(location);
  this.setState({
    latitude:location.latitude,
    longitude:location.longitude
  })
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyANUak7seRUFnbf0BxDQU-iBomEaE_FJZs')
      .then((response) => response.json())
      .then((responseJson) => {
        var dd=responseJson;
       // console.log('kkkkk',dd.results)
        var aa="";
          dd.results.map(ele=>{
            if(aa==""){

              aa=ele.formatted_address;
            //  console.log("llllllllllll",aa);
              this.setState({addressFatch:aa})
            }else{

            }
       
        })
        
})
})
.catch(error => {
  const { code, message } = error;
  console.warn(code, message);
})
  }


// add text watermark to a photo

// takePicture = async () => {
  //   this.setState({
    //     showCamera:true
    //   })
  //   console.log('-------',this.state.showCamera)
  //   if (this.camera) {
    //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };
  onShow=()=>{
    this.setState({showCamera:true})
  }
  takePicture = async () => {
    if (this.camera) {

      let options = {
         width: 600,
         height: 800,
        compressImageQuality: 0.2,
        //quality: 0.2,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      // this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        const capture=data;
         console.log('77777777777',capture,this.state.addressFatch)
         //  Alert.alert('Success', JSON.stringify(data));
         this.setState({showCamera:false,});
         Marker.markText({
          src: capture.uri,
          text: this.state.addressFatch, 
          X: 30,
          Y: 30, 
          color: 'black',
          position:'center',
          fontName: 'Arial-BoldItalicMT',
          fontSize: 40,
          // shadowStyle: {
          //     dx: 10.5,
          //     dy: 20.8,
          //     radius: 20.9,
          //     color: 'black'
          // },
          textBackgroundStyle: {
              type: 'stretchX ',
              paddingX: 40,
              paddingY: 40,
              color: 'yellow',
           
          },
          scale: 1, 
          quality: 100
       }).then((res) => {
         console.log('==========',res)
         const ww='file://';
          //  this.setState({
          //     loading: false,
          //     markResult: ww.concat(res)
          //  })
          this.setState({
            markResult: Platform.OS === 'android' ? 'file://' + res : res,
            loading: false
        })
          console.log("the path is"+res)
       }).catch((err) => {
          console.log(err)
         //  this.setState({
         //      loading: false,
         //      err
         //  })
       })
        } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
      }
    }
  };
//===============================================================================

submitBrandingspace=async()=>{
this.setState({isLoader:true})

const userid=await AsyncStorage.getItem('userid')
const outlet_code = await this.props.navigation.getParam('outletcode');
const project_id=await AsyncStorage.getItem('projectidd')
const process_id=await AsyncStorage.getItem('processidd')
const {selectedValue,elementheight,elementwidth,option} = this.state;
if(option == "Yes"){
  this.setState({isLoader:false})

  this.setState({
    selectedValue:"",
    elementheight:'',
    elementwidth:'',
    markResult:''
  })
}

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  
  if(selectedValue==""){
    
   Alert.alert('Please Select Installation Element')
  this.setState({isLoader:false})
  
  }
  else if(elementheight==""){
   Alert.alert('Please Enter Element Width(inch')
  this.setState({isLoader:false})
  
}

  else if(elementwidth =="")
  {
    Alert.alert('Please Enter Element Height(inch) ')
    this.setState({isLoader:false})
  
   
  }
    else if(this.state.markResult == "")
    {
      Alert.alert('Please Upload Image! ')
      
  this.setState({isLoader:false})
  
      }
      else  if(option=="")
      {
        Alert.alert('Please Select One Option! ')
        this.setState({isLoader:false})
      }
 
      else{
    console.log('222222222',userid,project_id,process_id, outlet_code,selectedValue, elementheight, elementwidth,)
    var formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("process_id", process_id);
    formData.append("outlet_code", outlet_code);
    formData.append("installation_element", selectedValue);
    formData.append("element_height", elementheight);
    formData.append("element_width", elementwidth);
    formData.append("branding_space_picture",  {
      uri: this.state.markResult,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    axios.post(`https://www.brandspring.in/BSIS/api/save-branding-space/${userid}`,
    formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } 
    )
.then((res)=> {

console.log('====+++++++++++====',res.data)
this.setState({isLoader:false})
if(res.data.status ==1){
  this.props.navigation.navigate('StoreFrontPicture',{shop_id:outlet_code})   //JSON.stringify(res.data.shop_id)
  //this.props.navigation.navigate('FrontImgScreen',{shop_id:JSON.stringify(res.data.shop_id)}) 
}else{
  alert(res.data.message)
}

}).catch((e) => {
  console.log('Something went wrong',e);

});

}
}
removeImage =()=>{

  this.setState({markResult:'',isLoader:false})
}
render() {
  console.log("============",this.state.showCamera)
  
  
  if(this.state.showCamera){
    return(
      <>

    <RNCamera 
      ref={ref => {
        this.camera = ref;
      }}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} 
      
      >
        {/* <View   activeOpacity={0.5}
      style={styles.btnAlignment}
      onPress={this.takePicture()}>
<Icon name="camera" size={50} color="#fff" />
        </View> */}
        {/* <TouchableOpacity onPress={()=>this.takePicture()}>

<View style={{alignItems:'center'}} >
<Icon name="camera" size={50} color="white"style={{marginBottom:5}} />
        </View>
        </TouchableOpacity> */}
        </RNCamera>
      
        <TouchableOpacity onPress={()=>this.takePicture()}>

        <View style={{flexDirection:'column',backgroundColor:'white',alignItems:'center'}} >
<Icon name="camera" size={50} color="black" />
        </View>
        </TouchableOpacity>
        </>
  )
}else{
  console.log('88888888888',this.state.markResult)
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
     <ScrollView>
     {/* <View style={{flex:0.2}}> */}
     <View style={{padding:width/70,marginLeft:width/20,marginTop:25,marginRight:width/20
      ,borderWidth:1,borderColor:'black',borderRadius:8}}>

     <Picker selectedValue={this.state.selectedValue} onValueChange={(selectedValue)=>this.setState({selectedValue})}>
    <Picker.Item label="--Please Select Installation Element--" />
    {this.state.data}

            </Picker>
     </View>
     {/* </View> */}

     <View style={{padding:width/35,marginTop:25,borderWidth:0.2,shadowColor:'gray',borderRadius:10,
     marginLeft:width/20,marginRight:width/20}}>
 
              <TextInput 
              style={styles.input}
              mode='outlined'
            numeric
          keyboardType={'numeric'}
              label="Size of Element-Width(inch)"

      value={this.state.elementheight}
      onChangeText={(elementheight) => this.setState({elementheight})}
    />
 </View>
 <View style={{padding:width/35,marginTop:25,
     marginLeft:width/20,marginRight:width/20,borderWidth:0.2,shadowColor:'gray',borderRadius:10}}>
 
              <TextInput 
              style={styles.input}
              mode='outlined'
               placeholderTextColor="red"
 numeric
          keyboardType={'numeric'}
              label="Size of Element-height(inch)"

      value={this.state.elementwidth}
      onChangeText={(elementwidth) => this.setState({elementwidth})}
    />
 </View>

<View style={{padding:width/45,marginTop:25,borderWidth:0.2,shadowColor:'gray',borderRadius:10,
marginLeft:width/20,marginRight:width/20,}}>
  <View>

<Text style={{fontSize:18,fontWeight:'bold'}}>Click Installation Picture</Text>
  </View>
<View style={{justifyContent:'center',alignItems:'center'}}>

{this.state.markResult ?(
  <View style={{flexDirection:'row'}}>
  <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>

<Image source={{uri:this.state.markResult}} style={{width:(width/3),height :height/5}}/>
  </View>
  <View style={{flex:0.2}}>
    <TouchableOpacity onPress={()=>this.removeImage()}>

{/* <Text style={{color:'black'}}>dd</Text> */}
<Icon name="delete"  style={{fontSize :25}}/>

    </TouchableOpacity>
  </View>
  </View>

  ):
<TouchableOpacity onPress={()=>this.onShow()}>
  <Image source={require('../assets/images/addpic.png')}  style={{width:(width/2),height :height/5}}/>
</TouchableOpacity>
  }
</View>

</View>
<View style={{padding:width/35,marginTop:20,borderWidth:0.2,shadowColor:'gray',borderRadius:10,marginLeft:width/20,marginRight:width/20}}>
<Text style={{fontSize:18,marginTop:5,fontWeight:'bold'}}>Add Another branding area?</Text>
<RadioForm
  radio_props={radio_props}
  initial={0}
  // formHorizontal={true}
 animation={true}
  // labelHorizontal={true}
  onPress={(option) => {this.setState({option})}}
/>
</View>
     </ScrollView>
     </View>
     {this.state.isLoader?
     (<ActivityIndicator  size="small" color="#0000ff" />)
     :
     <View style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
     <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ShopDetails') }
     style={{backgroundColor:"gray",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center',margin:10}} >
     <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Previous </Text>
 </TouchableOpacity>
 <TouchableOpacity  
 onPress={()=>this.submitBrandingspace()} 
//  onPress={()=>this.props.navigation.navigate('FrontImgScreen') }
 style={{backgroundColor:"red",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center'}}>
     <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Next </Text>
 </TouchableOpacity>
     </View>
     } 

</View>
    )
}    
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
  height: height/18,
 borderRadius:8,
 marginLeft:width/25,
 marginRight:width/25,
 marginTop:0,
 marginBottom:0,
//  padding:7,
  backgroundColor:'white',
},
btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
},
});


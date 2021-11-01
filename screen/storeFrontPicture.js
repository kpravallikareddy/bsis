
import React from 'react'
import {
  Dimensions, Image, View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Provider, TextInput } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location'
import Marker from "react-native-image-marker"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
var radio_props = [
  { label: 'Male    ', value: 'Male' },
  { label: 'Female   ', value: 'Female' },
  { label: 'Other    ', value: 'Other' },

];

export default class bashments extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      data: [],
      selectedValue: '',
      showCamera: false,
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      isLoader: false,
      markResult: '',
      latitude: "",
      longitude: "",
      addressFatch: '',
    }
  };
  async componentDidMount() {
    ////////////////============********************************//////////////////////////////////////

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude
        })
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyANUak7seRUFnbf0BxDQU-iBomEaE_FJZs')
          .then((response) => response.json())
          .then((responseJson) => {
            var dd = responseJson;
            console.log('kkkkk', dd.results)
            var aa = "";
            dd.results.map(ele => {
              if (aa == "") {

                aa = ele.formatted_address;
                console.log("llllllllllll", aa);
                this.setState({ addressFatch: aa })
              } else {

              }

            })

          })
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }
  logout = async () => {
    await AsyncStorage.removeItem('processidd');
    //this.props.navigation.navigate('LoginScreen')
    this.props.navigation.navigate('Loginselection');

  }
  onShow = () => {
    console.log('?????????')
    this.setState({ showCamera: true })
  }
  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {

      let options = {
        width: 600,
        height: 800,
        //quality: 0.2,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({ takingPic: true });

      try {
        const data = await this.camera.takePictureAsync(options);
        const capture = data;
        console.log('77777777777', capture, this.state.addressFatch)
        //  Alert.alert('Success', JSON.stringify(data));
        this.setState({ takingPic: false, showCamera: false, });
        Marker.markText({
          src: capture.uri,
          text: this.state.addressFatch,
          X: 30,
          Y: 30,
          color: 'black',
          position: 'center',
          fontName: 'Arial-BoldItalicMT',
          fontSize:40,
          //fontSize: 60,
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
          console.log('==========', res)
          const ww = 'file://';
          //  this.setState({
          //     loading: false,
          //     markResult: ww.concat(res)
          //  })
          this.setState({
            markResult: Platform.OS === 'android' ? 'file://' + res : res,
            loading: false
          })
          console.log("the path is" + res)
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

  onSubmitfrontImg = async () => {
    this.setState({ isLoader: true })
    const userid = await AsyncStorage.getItem('userid')

    const outlet_code = await AsyncStorage.getItem('outletcodee')
    const project_id = await AsyncStorage.getItem('projectidd')
    const process_id = await AsyncStorage.getItem('processidd')
    //const shop_id=await AsyncStorage.getItem('outletcodee')
    const shop_id = await this.props.navigation.getParam('shop_id');

    // const shop_id = await this.props.navigation.getParam('outletcode');

    console.log('user details -----', userid, outlet_code, project_id, process_id, shop_id)

    if (this.state.markResult == "") {

      Alert.alert('Please Upload Image!')
      this.setState({ isLoader: false })

    } else {

      var formdata = new FormData();
formdata.append("project_id", project_id);
formdata.append("process_id", process_id);
formdata.append("outlet_code", outlet_code);
formdata.append("shop_id", JSON.parse(shop_id));
formdata.append("store_front_photo", {
    uri: this.state.markResult,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
//formdata.append("store_front_photo", fileInput.files[0], "knob.png");

console.log('formdata------',formdata)
var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://www.brandspring.in/BSIS/api/update-brandingspace-storeimage/"+userid, requestOptions)
  .then(response => response.json())
  .then(res => {
    console.log(res)
    this.setState({ isLoader: false })
          if (res.status == 1) {
            this.props.navigation.navigate('Summary')
          }
          else {
            alert(res.message)
          }
  })
  .catch(error => console.log('error', error));


      // var formData = new FormData();
      // formData.append("project_id", project_id);
      // formData.append("process_id", process_id);
      // formData.append("outlet_code", outlet_code);
      // formData.append("shop_id", shop_id);

      // formData.append("store_front_photo", {
      //   uri: this.state.markResult,
      //   type: 'image/jpeg',
      //   name: 'image.jpg',
      // });

      // console.log('image ---', this.state.markResult);
      // console.log('formdata---', formData);
      // axios.post('https://www.brandspring.in/BSIS/api/update-brandingspace-storeimage/' + userid,
      //   formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      //   .then((res) => {
      //     console.log('data..........', res.data)
      //     this.setState({ isLoader: false })
      //     if (res.data.status == 1) {
      //       this.props.navigation.navigate('Summary')
      //     }
      //     else {
      //       alert(res.data.message)
      //     }

        // }).catch((e) => {
        //   console.log('enternal server error', e);

        // });
    }
  }
  removeImage = () => {
    this.setState({ markResult: "" })
  }
  previousbutton = async () => {
    const process_id = await AsyncStorage.getItem('processidd')

    if (process_id == 1) {
      this.props.navigation.navigate('FrontImgScreen')
    } else if (process_id == 2) {

      this.props.navigation.navigate('InstallationImage')

    } else if (process_id == 3) {
      this.props.navigation.navigate('PostFrontPcture')

    }

  }
  render() {
    console.log("============", this.state.showCamera)
    if (this.state.showCamera) {
      return (
        <>

          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            captureAudio={false}
            style={{ flex: 1 }}
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

          <TouchableOpacity onPress={() => this.takePicture()}>

            <View style={{ flexDirection: 'column', backgroundColor: 'white', alignItems: 'center' }} >
              <Icon name="camera" size={50} color="black" />
            </View>
          </TouchableOpacity>
        </>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={{ padding: width / 70, flexDirection: 'row', backgroundColor: 'red' }}>
            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>

              <View style={{ flex: 2 }}>

                <Text style={{ fontSize: 18, color: 'white' }}>Online Report System</Text>
              </View>

              {/* <View style={{flex:0.2}}>

<Icon name="settings-sharp"  style={{fontSize :25}}/>

</View> */}
              <View style={{ flex: 0.2 }}>
                <TouchableOpacity onPress={() => this.logout()}>

                  <Icon name="logout" style={{ fontSize: 25 }} />

                </TouchableOpacity>
              </View>

            </View>

          </View>
          <View style={{ flex: 3 }}>


            <View style={{
              padding: width / 45, marginTop: 25, borderWidth: 1, borderColor: 'black',
              marginLeft: width / 20, marginRight: width / 20,
            }}>
              <View>

                <Text style={{ fontSize: 18 }}>Click Store Front Picture</Text>
              </View>
              <TouchableOpacity onPress={() => this.onShow()}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                  {this.state.markResult ? (
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={{ uri: this.state.markResult }} style={{ width: (width / 3), height: height / 5 }} />
                      </View>
                      <View style={{ flex: 0.3 }}>
                        <TouchableOpacity onPress={() => this.removeImage()}>
                          <Icon name="delete" style={{ fontSize: 25 }} />

                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : <Image source={require('../assets/images/addpic.png')} style={{ width: (width / 3), height: height / 7 }} />}
                </View>
              </TouchableOpacity>

            </View>

          </View>
          {this.state.isLoader ? (<ActivityIndicator size="small" color="#0000ff" />) : 
          <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.previousbutton()} style={{ backgroundColor: "gray", borderRadius: 5, width: width / 3, height: height / 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Previous </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //  onPress={()=>this.props.navigation.navigate('Summary') }
              onPress={() => this.onSubmitfrontImg()}
              style={{ backgroundColor: "red", borderRadius: 5, width: width / 3, height: height / 15, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Next </Text>
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
  lable: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    height: height / 18,
    borderRadius: 8,
    marginLeft: width / 25,
    marginRight: width / 25,
    marginTop: 0,
    marginBottom: 0,
    //  padding:7,
    backgroundColor: 'white',
    // borderWidth:1,
    // borderColor:'black',
    //  color:"red"



  },
  btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
  },
});



import React from 'react'
import {
  Dimensions, Image, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator
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
  { label: 'Yes    ', value: 'Yes' },
  { label: 'No   ', value: 'No' },

];

export default class bashments extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      data1: [],
      branding_space_picture: '',
      element_height: '',
      element_width: '',
      selectedValue: '',
      showCamera: false,
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      option: 'Yes',
      isLoader: false,
      markResult: '',
      latitude: "",
      longitude: "",
      addressFatch: '',
      reccee_data: [],
      shop_id:'',
    }
  };
  logout = async () => {
    await AsyncStorage.removeItem('processidd');
    //this.props.navigation.navigate('LoginScreen')
    this.props.navigation.navigate('Loginselection');

  }

  async componentDidMount() {
    const shop_id = await this.props.navigation.getParam('shop_id');

    this.setState({shop_id:shop_id})

    console.log('===========', shop_id)

    this.getrecceedata();

    // axios.get(`https://www.brandspring.in/BSIS/api/fetch-reccees/${shop_id}`, {
    // })
    //   .then((res) => {
    //     console.log('result----', res)
    //     let myUsers = res.data1.completed_reccees.map((myValue, myIndex) => {
      //     return (
      //       <Picker.Item label={myValue.option} value={myValue.reccee_id} key={myIndex} />
      //     )
      //   });
      //   this.setState({
      //     data1: myUsers
      //   })
      // }).catch((e) => {
      //    Alert.alert('internal server error')

      // });
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
            // console.log('kkkkk',dd.results)
            var aa = "";
            dd.results.map(ele => {
              if (aa == "") {

                aa = ele.formatted_address;
                //  console.log("llllllllllll",aa);
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


  getrecceedata =() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://www.brandspring.in/BSIS/api/fetch-reccees/"+this.state.shop_id, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({data1:[]})
        let myUsers = res.completed_reccees.map((myValue, myIndex) => {
              return (
                <Picker.Item label={myValue.option} value={myValue.reccee_id} key={myIndex} />
              )
            });
            this.setState({
              data1: myUsers
            })

            console.log('recceeeessss---',this.state.data1)
      })
      .catch(error => console.log('error', error));
  }


  selectInstallationID = (recceeid) => {
    this.setState({ selectedValue: recceeid })
    console.log('recid-----',recceeid)
    console.log('recceeeeid----',this.state.selectedValue);
    // axios.get('https://www.brandspring.in/BSIS/api/fetchRecceeDetails/'+recceeid, {

    // })
    //   .then((res) => {
    //     console.log('result---',res);
    //     this.setState({
    //       branding_space_picture: res.data1.branding_space_picture,
      //     element_height: res.data1.element_height,
      //     element_width: res.data1.element_width,

      //   })
      // }).catch((e) => {
        // Alert.alert('enternal server error')

      // });

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://www.brandspring.in/BSIS/api/fetchRecceeDetails/1", requestOptions)
        .then(response => response.json())
        .then(res => {
          console.log(res)
          console.log('result---',res);
        this.setState({
          branding_space_picture: res.branding_space_picture,
          element_height: res.element_height,
          element_width: res.element_width,

        })
        })
        .catch(error => console.log('error', error));
  }
  //===============================================================================
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
        //  Alert.alert('Success', JSON.stringify(data));
        this.setState({ showCamera: false, });
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
          this.setState({
            loading: false,
            markResult: ww.concat(res)
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
  ///===========
  //===============================================================================

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }

    });

  }
  submitBrandingspace = async () => {
    this.setState({ isLoader: true })

    const userid = await AsyncStorage.getItem('userid')
    const shop_id = await this.props.navigation.getParam('shop_id');
    const project_id = await AsyncStorage.getItem('projectidd')
    const process_id = await AsyncStorage.getItem('processidd')
    const { selectedValue, element_width, element_height, option } = this.state;
    if (option == "Yes") {
      this.setState({ isLoader: false })

      this.setState({
        selectedValue: "",
        elementheight: '',
        elementwidth: '',
        markResult: '',
        branding_space_picture: '',
        element_width: '',
        element_height: '',
        editableTextInput: true
      })
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (selectedValue == "") {

      Alert.alert('Please Select Installation Element')
      this.setState({ isLoader: false })

    }
    else if (element_height == "") {
      Alert.alert('Please Enter Element Width(inch')
      this.setState({ isLoader: false })

    }

    else if (element_width == "") {
      Alert.alert('Please Enter Element Height(inch) ')
      this.setState({ isLoader: false })
    }
    else if (this.state.markResult == "") {
      Alert.alert('Please Upload Image! ')
      this.setState({ isLoader: false })
    }
    else if (option == "") {
      Alert.alert('Please Select One Option! ')
      this.setState({ isLoader: false })
    }

    else {
      console.log('222222222', userid, project_id, process_id, shop_id, selectedValue, option)
      var formData = new FormData();
      formData.append("project_id", project_id);
      formData.append("process_id", process_id);
      formData.append("shop_id", shop_id);
      formData.append("installation_no", selectedValue);
      formData.append("installation_image", {
        uri: this.state.markResult,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      console.log('formdata----',formData);
      axios.post(`https://www.brandspring.in/BSIS/api/save-installation-space/${userid}`,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(')))))))))))))))', res.data)
          this.setState({ isLoader: false, editableTextInput: false })

          this.props.navigation.navigate('StoreFrontPicture',{shop_id:JSON.stringify(res.data.shop_id)})

        }).catch((e) => {
          console.log('enternal server error', e);

        });

    }

  }
  removeImage = () => {
    this.setState({ markResult: '' })
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
            <ScrollView>
              {/* <View style={{flex:0.2}}> */}
              <View style={{
                padding: width / 70, marginLeft: width / 20, marginTop: 25, marginRight: width / 20
                , borderWidth: 1, borderColor: 'black', borderRadius: 8
              }}>

                <Picker selectedValue={this.state.selectedValue} onValueChange={(value) =>this.selectInstallationID(value)}>  
                {/* this.selectInstallationID(value) */}
                  <Picker.Item label="--Please Select Installation Element--" />
                  {this.state.data1}

                </Picker>
              </View>
              {/* </View> */}

              <View style={{
                padding: width / 45, marginTop: 25, borderWidth: 0.2, shadowColor: 'gray', borderRadius: 10,
                marginLeft: width / 20, marginRight: width / 20,
              }}>
                <View>

                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Set Installation Image</Text>
                </View>
                {/* <TouchableOpacity onPress={this.launchCamera}> */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                  {this.state.branding_space_picture ? (
                    <Image source={{ uri: this.state.branding_space_picture }} style={{ width: (width / 3), height: height / 5 }} />) : <Image source={require('../assets/images/addpic.png')} style={{ width: (width / 3), height: height / 7 }} />}
                </View>
                {/* </TouchableOpacity> */}

              </View>
              <View style={{ padding: width / 35, marginTop: 25, borderWidth: 0.2, shadowColor: 'gray', borderRadius: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>

                  <TextInput style={styles.input}
                    mode='outlined'
                    label="Width"
                    value={this.state.element_width}
                    editable={this.state.editableTextInput}
                  //   onChangeText={(elementheight) => this.setState({elementheight})}
                  />
                </View>
                <View style={{ flex: 0.5 }}>

                  <TextInput
                    style={styles.input}
                    mode='outlined'

                    label="height"
                    editable={this.state.editableTextInput}
                    value={this.state.element_height}
                  //   onChangeText={(elementheight) => this.setState({elementheight})}
                  />
                </View>
              </View>

              <View style={{
                padding: width / 45, marginTop: 25, borderWidth: 0.2, shadowColor: 'gray', borderRadius: 10,
                marginLeft: width / 20, marginRight: width / 20,
              }}>
                <View>

                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Click Installation Picture</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                  {this.state.markResult ? (

                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={{ uri: this.state.markResult }} style={{ width: (width / 3), height: height / 7 }} />
                      </View>
                      <View style={{ flex: 0.2 }}>
                        <TouchableOpacity onPress={() => this.removeImage()}>
                          <Icon name="delete" style={{ fontSize: 25 }} />

                        </TouchableOpacity>
                      </View>
                    </View>

                  ) :
                    <TouchableOpacity onPress={() => this.onShow()}>
                      <Image source={require('../assets/images/addpic.png')} style={{ width: (width / 3), height: height / 7 }} />
                    </TouchableOpacity>
                  }
                </View>

              </View>
              <View style={{ padding: width / 35, marginTop: 20, borderWidth: 0.2, shadowColor: 'gray', borderRadius: 10, marginLeft: width / 20, marginRight: width / 20 }}>
                <Text style={{ fontSize: 18, marginTop: 5, fontWeight: 'bold' }}>Any more installation in this shop?</Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  // formHorizontal={true}
                  animation={true}
                  // labelHorizontal={true}
                  onPress={(option) => { this.setState({ option }) }}
                />
              </View>
            </ScrollView>
          </View>
          {this.state.isLoader ? (<ActivityIndicator size="small" color="#0000ff" />) :
           <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopDetails')}
              style={{ backgroundColor: "gray", borderRadius: 5, width: width / 3, height: height / 15, justifyContent: 'center', alignItems: 'center', margin: 10 }} >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Previous </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.submitBrandingspace()}
              //  onPress={()=>this.props.navigation.navigate('FrontImgScreen') }
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
  },
  btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
  },
});


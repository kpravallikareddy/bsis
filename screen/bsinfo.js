import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity,
    Image, Alert, Dimensions, ActivityIndicator, ScrollView, TouchableHighlight
} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider, TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MenuDrawer from 'react-native-side-drawer'
import MenuOverlay from './menuOverlay';
import menuOverlayStyle from '../style/menuOverlayStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Bsinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            open: false,
            userid: 0,
            statename: '',
            district: '',
            city: '',
            usertypeid: 0,
            recceedata: [],
            installationdata: [],
            fixinstallationdata: [],
            outletcode: '',
            bsdata: [],
            clientstatus: ['Pending', 'Approved', 'Disapproved'],
            clientvalue: 'Pending',
            process_id:'',
            brandfixid:'',
            showloader:false,
            processidd:0,

        };
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: JSON.parse(userid) });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('userid', this.state.userid);

        await AsyncStorage.getItem('state').then((state) => {
            if (state) {
                this.setState({ statename: state });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('statename', this.state.statename);

        await AsyncStorage.getItem('city').then((city) => {
            if (city) {
                this.setState({ city: city });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('city', this.state.city);

        await AsyncStorage.getItem('district').then((district) => {
            if (district) {
                this.setState({ district: district });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('district', this.state.district);

        await AsyncStorage.getItem('usertypeid').then((usertypeid) => {
            if (usertypeid) {
                this.setState({ usertypeid: JSON.parse(usertypeid) });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('usertypeid', this.state.usertypeid);

        await AsyncStorage.getItem('processidd').then((processidd) => {
            if (processidd) {
                this.setState({ processidd: JSON.parse(processidd) });

            }
            // console.log('userid',this.state.userid);
        });

        console.log('processidd', this.state.processidd);

       // await this.getrecceedata();
       // await this.getmyinstallationdata();
        //await this.getmyfixinstallationdata();

        await this.checkconditions();
    }

    checkconditions =() =>{
        if(this.state.processidd === 1){
            this.getrecceedata()
        }
        else if(this.state.processidd === 2){
            this.getmyinstallationdata()
        }
        else{
            this.getmyfixinstallationdata()
        }
    }


    searchoutletcode = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"
        formdata.append("outlet_code", this.state.search);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        console.log('formdata ----', formdata)

        fetch("https://www.brandspring.in/BSIS/api/mybranding-spaces/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('recceedata search --', result)
               // this.state.bsdata.length = 0;
               this.setState({bsdata:[]})
                if (result.status == 1) {

                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.recceedata.push(result.data[i])
                    // }
                    if (result.data.length > 0) {
                        // if (result.data[0].outlet_code == this.state.search) {
                        for (let i = 0; i < result.data.length; i++) {
                            // this.setState({documentslist:result.data[i].document})
                            this.state.bsdata.push(result.data[i])
                        }
                        // }
                        console.log('bsdata in search---',this.state.bsdata)
                    }
                    else {
                        //this.state.bsdata.length = 0;
                        this.setState({bsdata:[]});
                        alert('No data found')
                        //this.searchinstallationoutletcode();
                    }


                    //this.setState({ open: !this.state.open })
                }
            })
            .catch(error => console.log('error', error));
    }





    searchinstallationoutletcode = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"
        formdata.append("outlet_code", this.state.search);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.brandspring.in/BSIS/api/myinstallations/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('installation', result)
                // this.state.bsdata.length = 0;
                this.setState({ bsdata: [] });
                if (result.status === 1) {
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.recceedata.push(result.data[i])
                    }
                    if (result.data.length != 0) {
                        // if (result.data[0].outlet_code === this.state.search) {
                        for (let i = 0; i < result.data.length; i++) {
                            // this.setState({documentslist:result.data[i].document})
                            this.state.bsdata.push(result.data[i])
                        }
                        // }

                    } else {
                        //this.state.bsdata.length = 0;
                        this.setState({ bsdata: [] });
                        //this.searchfixinstallationoutletcode();
                    }

                    //this.setState({ open: !this.state.open })
                }
            })
            .catch(error => console.log('error', error));
    }



    searchfixinstallationoutletcode = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"
        formdata.append("outlet_code", this.state.search);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.brandspring.in/BSIS/api/myfixinstallations/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('fixinstallation', result)
                //this.state.bsdata.length = 0;
                this.setState({ bsdata: [] });
                if (result.status === 1) {
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.recceedata.push(result.data[i])
                    }
                    if (result.data.length != 0) {
                        //   if (result.data[0].outlet_code === this.state.search) {
                        for (let i = 0; i < result.data.length; i++) {
                            // this.setState({documentslist:result.data[i].document})
                            this.state.bsdata.push(result.data[i])
                        }
                        //  }

                    } else {
                        //this.state.bsdata.length = 0;
                        this.setState({ bsdata: [] });
                    }

                    //this.setState({ open: !this.state.open })
                }
            })
            .catch(error => console.log('error', error));
    }

    getrecceedata = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"

        console.log('formdata --',formdata)
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.brandspring.in/BSIS/api/mybranding-spaces/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('recceedata', result)
                this.setState({bsdata:[]});
                //this.state.bsdata.length = 0;
               // this.state.recceedata.length = 0;
                if (result.status == 1) {
                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.recceedata.push(result.data[i])
                    // }
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.bsdata.push(result.data[i])
                    }
                    this.setState({showloader:true})

                    //this.setState({ open: false })
                }
                else {
                    this.setState({bsdata:[]});
                    alert('No data found')
                }
            })
            .catch(error => console.log('error', error));
    }



    getmyinstallationdata = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        console.log('formdata', formdata)

        fetch("https://www.brandspring.in/BSIS/api/myinstallations/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('myinstallations:', result)
                this.setState({bsdata:[]});
                //this.state.installationdata.length = 0;
                if (result.status === 1) {
                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.installationdata.push(result.data[i])
                    // }
                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.bsdata.push(result.data[i])
                    // }
                    // console.log('installationdata:', this.state.bsdata)
                    //this.setState({ open: !this.state.open })
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.bsdata.push(result.data[i])
                    }
                    this.setState({showloader:true})
                }
                else {
                    this.setState({bsdata:[]});
                    alert('No data found')
                }
            })
            .catch(error => console.log('error', error));
    }

    getmyfixinstallationdata = () => {
        var formdata = new FormData();
        formdata.append("state", this.state.statename);   //"Haryana"
        formdata.append("district", this.state.district);    //"Ambala"
        formdata.append("city", this.state.city);     //"Ambala cantt"
        formdata.append("user_type_id", this.state.usertypeid);      //"3"

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.brandspring.in/BSIS/api/myfixinstallations/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('fixinstallationdata:', result)
                this.setState({bsdata:[]});
                //this.state.fixinstallationdata.length = 0;
                if (result.status === 1) {
                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.fixinstallationdata.push(result.data[i])
                    // }
                    // for (let i = 0; i < result.data.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.bsdata.push(result.data[i])
                    // }

                    //this.setState({ open: !this.state.open })
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.bsdata.push(result.data[i])
                    }
                    this.setState({showloader:true})
                }
                else {
                    this.setState({bsdata:[]});
                    alert('No data found')
                }
            })
            .catch(error => console.log('myfix error', error));
    }

    changestatus = () => {
        var formdata = new FormData();
       // formdata.append("process_id", this.state.bsdata[0].process_id);
       formdata.append("process_id", this.state.process_id);
        formdata.append("user_type_id", this.state.usertypeid);
        formdata.append("brand_inst_fix_id", this.state.brandfixid);
        formdata.append("status", this.state.clientvalue);

        console.log('formdata ----',formdata)


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.brandspring.in/BSIS/api/changeTaskStatus", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert(result.message)
            })
            .catch(error => console.log('error', error));
    }

    logout=async()=>{
        this.setState({search:''});
        await  AsyncStorage.removeItem('processidd');
        this.props.navigation.navigate('Loginselection') 
      
        }

    render() {

        return (
            <View
                style={{ flex: 1 }}
            >

                {/* <View style={{ width: Dimensions.get('window').width, height: 40, backgroundColor: '#a9a9a9' }}>

                </View> */}
                <View style={{ width: Dimensions.get('window').width, height: 40, backgroundColor: 'red', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent:'space-between'}}>
                        {/* <TouchableOpacity
                            style={{ justifyContent: 'flex-start', marginRight: 30 }}
                            onPress={() => this.setState({ open: !this.state.open })}
                        >
                            <Feather name="menu" size={25} color={'#ffffff'} />
                        </TouchableOpacity> */}
                        <View style={{alignSelf:'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: 'bold', }}>
                                Brand Spring Information System
                            </Text>
                        </View>
                        <View >
                            <TouchableOpacity 
                             style={{ alignItems: 'flex-end', marginRight: 0 }}
                            onPress={() => this.logout()}>

                                <MaterialIcons name="logout" style={{ fontSize: 25 }} />

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    {/* <View style={{ flexDirection: 'row', }}>
                        <TextInput
                            placeholder='Search Outlet Code'
                            style={{ width: Dimensions.get('window').width - 40, height: 50, fontSize: 18, backgroundColor: '#ffffff' }}
                            //placeholderTextColor={'#000000'}
                            onChangeText={async (text) => await this.setState({ search: text })}
                            value={this.state.search}
                        />
                        <TouchableOpacity
                        onPress={() =>this.searchoutletcode()}
                        >
                            <Feather name="search" size={20} color="red" style={{ marginTop: 10 }} />
                        </TouchableOpacity>
                    </View> */}
                    {this.state.bsdata ?
                        <View>
                            <View style={{ flexDirection: 'row', }}>
                                <TextInput
                                    placeholder='Search Outlet Code'
                                    style={{ width: Dimensions.get('window').width - 40, height: 50, fontSize: 18, backgroundColor: '#ffffff' }}
                                    //placeholderTextColor={'#000000'}
                                    onChangeText={async (text) => await this.setState({ search: text })}
                                    value={this.state.search}
                                />
                                <TouchableOpacity
                                    onPress={() => this.searchoutletcode()}
                                    style={{ width: 40, height: 50, backgroundColor: '#ffffff' }}
                                >
                                    <Feather name="search" size={20} color="red" style={{ marginTop: 10 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{}}>
                                {/* {this.state.recceedata || this.state.installationdata || this.state.fixinstallationdata ? */}
                                {this.state.bsdata.map((item) => {
                                    return (
                                        <View>
                                            <View>
                                                <View style={{ width: Dimensions.get('window').width, borderRadius: 10, backgroundColor: 'red', marginBottom: 10 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Name
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* installation */}
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                State
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* Haryana */}
                                                                {item.state}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                District
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* Ambala */}
                                                                {item.district}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                City
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* Ambala Cantt */}
                                                                {item.city}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Shop Name
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* testss */}
                                                                {item.shop_name}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Qty
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.qty}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {this.state.processidd==3?
                                                    null:
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Square Feet
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.element_height} * {item.element_width}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    }
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Outlet Code
                                                            </Text>
                                                        </View>
                                                        {this.state.processidd ==3?
                                                        <View style={styles.valueview}>
                                                        <Text style={styles.value}>
                                                            {/* 65 */}
                                                            {item.shop_id}
                                                        </Text>
                                                    </View>
                                                    :
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* 65 */}
                                                                {item.outlet_code}
                                                            </Text>
                                                        </View>
                                                        }
                                                    </View>
                                                    {this.state.processidd ==3?
                                                    null:
                                                    <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Installation Elem
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.installation_element}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Element Width
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                            {item.element_width}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Element Height
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.element_height}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    </View>
                                                    }
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                store front 
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            {/* <Text style={styles.value}>
                                
                            </Text> */}
                                                            <Image source={{ uri: item.store_front_photo }} style={{ height: 100, width: 100 }} />
                                                            {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                        </View>
                                                    </View>
                                                    {this.state.processidd === 3?
                                                    null
                                                    :
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Branding space 
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            {/* <Text style={styles.value}>
                                installation
                            </Text> */}
                                                            {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                            <Image source={{ uri: item.branding_space_picture }} style={{ height: 100, width: 100 }} />
                                                        </View>
                                                    </View>
                                                    }
                                                    {this.state.processidd === 2?
                                                    <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.labelview}>
                                                        <Text style={styles.label}>
                                                            Store front reccee
                                                        </Text>
                                                    </View>
                                                    <View style={styles.valueview}>
                                                        {/* <Text style={styles.value}>
                            installation
                        </Text> */}
                                                        {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                        <Image source={{ uri: item.store_front_photo_reccee }} style={{ height: 100, width: 100 }} />
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.labelview}>
                                                    <Text style={styles.label}>
                                                        Installation 
                                                    </Text>
                                                </View>
                                                <View style={styles.valueview}>
                                                    {/* <Text style={styles.value}>
                        installation
                    </Text> */}
                                                    {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                    <Image source={{ uri: item.installation_image }} style={{ height: 100, width: 100 }} />
                                                </View>
                                            </View>
                                            </View>
                                                :
                                                null}
                                                {this.state.processidd === 3?
                                                    <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.labelview}>
                                                        <Text style={styles.label}>
                                                            Pre front
                                                        </Text>
                                                    </View>
                                                    <View style={styles.valueview}>
                                                        {/* <Text style={styles.value}>
                            installation
                        </Text> */}
                                                        {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                        <Image source={{ uri: item.prefront_image }} style={{ height: 100, width: 100 }} />
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.labelview}>
                                                    <Text style={styles.label}>
                                                       Post front
                                                    </Text>
                                                </View>
                                                <View style={styles.valueview}>
                                                    {/* <Text style={styles.value}>
                        installation
                    </Text> */}
                                                    {/* <Image source={require('../assets/images/addpic.png')} style={{ height: 100, width: 100 }} /> */}
                                                    <Image source={{ uri: item.postfront_image }} style={{ height: 100, width: 100 }} />
                                                </View>
                                            </View>
                                            </View>
                                                :
                                                null}
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Marketing
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.sales_status}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Sales Status
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {/* {this.state.clientstatus} */}
                                                                {item.sales_status}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Created At
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.created_at}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Updated At
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.updated_at}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Project Name
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.project_name}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Process Title
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.process_title}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Shop Owner
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.shop_owner}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={styles.labelview}>
                                                            <Text style={styles.label}>
                                                                Mobile
                                                            </Text>
                                                        </View>
                                                        <View style={styles.valueview}>
                                                            <Text style={styles.value}>
                                                                {item.mobile}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginBottom: 20 }}>
                                                <TouchableOpacity>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <ModalDropdown
                                                            options={this.state.clientstatus}
                                                            //defaultIndex={0}
                                                            defaultValue={item.sales_status}
                                                            //onSelect={value =>this.setState({selectedValue:(String(this.state.data[value]))})}
                                                            //onSelect={value =>this.setState({selectedValue:this.state.data[id]})}
                                                            style={{ height: height / 15, width: width - 30, marginLeft: 15, marginRight: 15, borderColor: 'black', borderRadius: 15, borderWidth: 1, justifyContent: 'center' }}
                                                            dropdownTextStyle={{ color: 'black', fontSize: 14, marginTop: 5, marginBottom: 5 }}
                                                            dropdownStyle={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').height / 3, marginTop: 30, marginLeft: 10 }}
                                                            textStyle={{ color: 'black', fontSize: 18, marginLeft: 10 }}
                                                            //renderRow={this.renderTeamCodeRow.bind(this)}
                                                            //renderButtonText={(rowData)=>this.renderButtonText(rowData)}
                                                            onSelect={async (value) => await this.setState({ clientvalue: (String(this.state.clientstatus[value])), process_id:item.process_id,brandfixid:item.id }, () => this.changestatus())}
                                                        // console.log('selected team ---',value.id)
                                                        />

                                                        <View style={{ position: 'absolute', left: Dimensions.get('window').width - 50, }}>
                                                            <FontAwesome name="caret-down" size={25} color={'gray'} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    )
                                })
                                }
                            </View>
                        </View>
                        : null}

                </ScrollView>
                {this.state.open ?
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10
                    }}>
                        <MenuOverlay
                        // onToggleMenu={onToggleMenu}
                        // navigation={navigation}
                        />
                        <View style={{
                            width: Dimensions.get('window').width - 50,
                            height: Dimensions.get('window').height,
                            backgroundColor: '#ffffff',
                            top: 40,
                            position: 'absolute',
                            left: 0,
                        }}>
                            <View style={{ marginTop: 30, marginLeft: 20 }}>

                                <Image source={require('../assets/images/logo.jpeg')} style={{ height: 30, width: Dimensions.get('window').width / 3 }} />
                            </View>
                            <View style={{ marginTop: Dimensions.get('window').height / 6, marginLeft: 60 }}>
                                <Text style={{ fontSize: 20 }}>
                                    Menu
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 20 }}>
                                <View style={{ marginRight: 10 }}>
                                    <Ionicons name="person-outline" size={20} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.getrecceedata()}
                                >
                                    <Text style={{ fontSize: 20 }}>
                                        Reccee
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 20 }}>
                                <View style={{ marginRight: 10 }}>
                                    <Ionicons name="person-outline" size={20} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.getmyinstallationdata()}
                                >
                                    <Text style={{ fontSize: 20 }}>
                                        Installations
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 20 }}>
                                <View style={{ marginRight: 10 }}>
                                    <Ionicons name="person-outline" size={20} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.getmyfixinstallationdata()}
                                >
                                    <Text style={{ fontSize: 20 }}>
                                        Fix-installations
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                    : null}
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//   label:{
//       color:'#ffffff',
//       fontSize:18,
//       fontWeight:'bold'
//   },
//   value:{
//     color:'#ffffff',
//     fontSize:18
//   },
//   labelview:{
//       //height:30,
//       width:Dimensions.get('window').width/2,
//       borderBottomColor:'#ffffff',
//       paddingTop:10,
//       paddingBottom:10,
//       borderBottomWidth:1,
//       borderRightColor:'#ffffff',
//       borderRightWidth:3,
//       paddingLeft:10,
//   },
//   valueview:{
//     width:Dimensions.get('window').width/2,
//     borderBottomColor:'#ffffff',
//     paddingTop:10,
//     paddingBottom:10,
//     borderBottomColor:'#ffffff',
//     borderBottomWidth:1,
//     paddingLeft:10,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//     zIndex: 0
//   },
//   animatedBox: {
//     flex: 1,
//     backgroundColor: "#38C8EC",
//     padding: 10
//   },
//   ,
// container : {
//     flex: 1,
//     position : 'absolute',
//     left: 0,
//     top: 0,
//     width : Dimensions.get('window').width, 
//     height : Dimensions.get('window').height,
//     paddingTop : 10,
//     paddingLeft : 10,
//     paddingRight : 10,
//     paddingBottom : 10
// },
// menu: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     position : 'absolute',
//     left: 0,
//     top: 0,
//     width : Dimensions.get('window').width * 0.8, 
//     height : Dimensions.get('window').height,
//     paddingTop : 10,
//     paddingLeft : 10,
//     paddingRight : 10,
//     paddingBottom : 10
// },
// menuItem : {
//     paddingTop : 10
// },
// overlay: {
//     backgroundColor: 'rgba(52, 52, 52, 0.8)',
//     position : 'absolute',
//     left: 0,
//     top: 0,
//     width : Dimensions.get('window').width, 
//     height : Dimensions.get('window').height,
//     paddingTop : 10,
//     paddingLeft : 10,
//     paddingRight : 10,
//     paddingBottom : 10
// },
// });

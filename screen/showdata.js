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

export default class Showdata extends Component {
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
            recceedata: this.props.navigation.getParam('reccee_data'),
            outletcode: '',
            project_id: '',

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

        const shop_id = await this.props.navigation.getParam('shop_id');
        const project_id = await AsyncStorage.getItem('projectidd');
        this.setState({ outletcode: shop_id, project_id: project_id })

       // const reccee_data = await this.props.navigation.getParam('reccee_data');


      //  console.log('outletcode inside component did mount----',shop_id)

        console.log('recceeedata ------',reccee_data);
        
       // this.getrecceedata();

    }

    // Unsafe_componentWillMount(){
    //     this.getrecceedata();
    // }

    getrecceedata = async () => {
        const shop_id = await this.props.navigation.getParam('shop_id');
        const project_id = await AsyncStorage.getItem('projectidd')

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

    logout = async () => {
        this.setState({ search: '' });
        await AsyncStorage.removeItem('processidd');
        this.props.navigation.navigate('Loginselection')

    }

    renderrecceedata = () => {
        return this.state.recceedata.map((item) => {
            return (
                <View>
                    <View>
                        <Text>
                            Shop details
                        </Text>
                        <Text>
                            {item.shopdetails.shop_name}
                        </Text>
                        <Text>
                            {item.shopdetails.shop_name}
                        </Text>
                        <Text>
                            {item.shopdetails.shop_address}
                        </Text>
                        <Text>
                            {item.shopdetails.area}, {item.shopdetails.city},{item.shopdetails.state}
                        </Text>
                        <Text>
                            {item.shopdetails.shop_owner}
                        </Text>
                        <Text>
                            {item.shopdetails.mobile}
                        </Text>
                        {/* <Text>
                            {item.shopdetails.assigned date}
                        </Text> */}
                    </View>
                    <View>
                        <Text>
                            Reccee detail
                        </Text>

                        <Text>
                            {item.element_height}
                        </Text>
                        <Text>
                            {item.element_width}
                        </Text>
                        <Text>
                            {item.sq_ft}
                        </Text>
                        <Text>
                            {item.option}
                        </Text>
                        <Image

                        />
                    </View>
                </View>
            )
        })
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <View style={{ width: Dimensions.get('window').width, height: 40, backgroundColor: 'red', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>

                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>
                                Online Report System
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

                    <View style={{flex:0.8}}>
                        <View style={{}}>
                        {/* <Text>
                            Shop details
                        </Text> */}

                        {/* {this.renderrecceedata()} */}
                        {/* {this.state.recceedata ? */}
                       
                            {this.state.recceedata.map((item, index) => { console.log('item',item)
                                return (
                                    <View>
                                        <View key={index}
                                        style={{marginLeft:10, marginTop:10}}
                                        >
                                            <Text style={{fontSize:18,fontWeight:'bold'}}>
                                                Shop details
                                            </Text>
                                            {/* <Text>
                                            {item.shopdetails.shop_name}
                                        </Text> */}
                                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Name: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.shopdetails.shop_name}
                                            </Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:10,}}>
                                        <Text
                                            style={{fontSize:18,marginTop:-5}}
                                            > 
                                            Address: {' '}
                                            </Text>
                                            <View>
                                            <Text style={{flexWrap:'wrap'}}>
                                                {item.shopdetails.shop_address}
                                            </Text>
                                            <Text style={{marginTop:-10, fontSize:16}}>
                                                {item.shopdetails.area}, {item.shopdetails.city}, {item.shopdetails.state}
                                            </Text>
                                            </View>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Owner: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.shopdetails.shop_owner}
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Phone number: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.shopdetails.mobile}
                                            </Text>
                                            </View>
                                            
                                            {/* <Text>
                            {item.shopdetails.assigned date}
                        </Text> */}
                                        </View>
                                        <View  style={{marginLeft:10, marginTop:10}}>
                                            <Text style={{fontSize:18,fontWeight:'bold'}}>
                                                Reccee detail
                                            </Text>
                                            <View style={{flexDirection:'row',alignItems:'center', marginTop:10}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Height: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.element_height}
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Width: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.element_width}
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Total Area: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.sq_ft}
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Branding Subtype: {' '}
                                            </Text>
                                            <Text style={styles.textdetails}>
                                                {item.option}
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',}}>
                                            <Text
                                            style={{fontSize:18}}
                                            > 
                                            Reccee Image: {' '}
                                            </Text>
                                            <Image source={{ uri: item.store_front_photo }} style={{ height: 100, width: 100, marginTop:10 }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        //     :
                        //     <View>
                        //         <Text>
                        //             No data found
                        //         </Text>
                        //     </View>
                         }
                    </View>

                    <View style={{flex:0.2,marginTop:Dimensions.get('window').height/4,marginBottom:20}}>
                        <TouchableOpacity
                            //onPress={() => this.onShopIdFunc()}
                            onPress={() =>this.props.navigation.navigate('InstallationImage',{shop_id:this.state.outletcode})}
                            style={{ backgroundColor: "red", padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 5 }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Next </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textdetails:{
        fontSize:16,
        marginTop:5,
    }
})


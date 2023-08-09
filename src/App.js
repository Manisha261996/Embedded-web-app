import logo from './logo.svg';
import './App.css';
import  React,{Component} from 'react';
import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
import { CollectionsOutlined } from '@material-ui/icons';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


import { MapOutlined } from '@material-ui/icons';
import axios from 'axios';
import Select from "react-select";
import {
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import Login from './Login/Login';
import { Tabs, Tab } from "@material-ui/core";

import * as models from 'powerbi-models';
import { PowerBIEmbed } from 'powerbi-client-react';
import {config} from './config';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Assessment from '@material-ui/icons/Assessment'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Redirect,Route,Switch } from 'react-router';
import ReusableDrawer from './Components/ReusableDrawer/ReusableDrawer';
import { MessageList } from 'semantic-ui-react';

import { MsalProvider } from "@azure/msal-react";

// import { TabContainer } from 'react-bootstrap';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    overflowY: 'scroll'
  },
  customModalRoot: {
    right:1141,
    top:"3.5%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:"lightseagreen",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    overflowY:'scroll !important'
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
// function SubTabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 0 }}>
//       {props.children}
//     </Typography>
//   );
// }

class App extends React.Component {
  state = {
    open: false,
    openlogout:false,
    value:0,
    value1:0,
    mapWorkspace:false,
    totalUsers:[],
  totalWorkspces:[],
    selectedUser:{},
    logout:false,
    dialog:false,
    totalReports:[],
    selectedReport:{},
    open1:true,
    open2:true,
    reportId:'',
    reportUrl:'',
    openDialog:false,
    workspaces:[],
    workspaceID:'',
    workspaceName:'',
    reports:[],
    anchorEl: null,
    showreport:false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleTabChange = (event, value) => {
    this.setState({ value });
    
    
  };
  handleTabChange1 = (event, value) => {
    this.setState({ value1 : value});
    
    
  };
  componentWillMount(){
    this.setState({openlogout:false})
    
    var token = sessionStorage.getItem('Token')
    console.log('token',JSON.stringify(token))
    axios({
        
      url: "https://10.10.200.208:44386/api/values",   
      method: "GET",  
            
  }).then((response) => {
    console.log('UserList',response.data[0].UserName)
    let keys = [];
     for (let i = 0; i < response.data.length; i++) {
            let item = response.data;
            let key = item[i];
            if(key.UserName != 'Admin'){
             keys.push({ label: key.UserName, value: key.UserName });
            }
           }
    console.log('keys',keys)
    this.setState({totalUsers:keys})
    
    
     
  }).catch(console.log);
    
    
      
    
    
    // let config = () => {
    //     var user = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDA4NTAyZDYtM2Y3OS00NmYwLWFiMzctOTM1NGUzZmU4MGZmLyIsImlhdCI6MTY3MjgyNjIyNywibmJmIjoxNjcyODI2MjI3LCJleHAiOjE2NzI4MzE4ODUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE3WlplU2FKL2VsYzhMZE82Q3c5cDJVZWZJOHNhTktLK0d1UVlPakI0eEJPVEhCQzIxZnVTOCtBZXp5REFpREZyIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGV2aSIsImdpdmVuX25hbWUiOiJNYW5pc2hhIiwiaXBhZGRyIjoiMTgyLjc2LjEyNy4xMjIiLCJuYW1lIjoiTWFuaXNoYSBEZXZpIiwib2lkIjoiNGMzZmI2NTEtMGQyMC00ODZhLWIzY2UtZjM2NDdiNDE0ZDEzIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTM3MTkxNTg4NTktMTkxNDc2NTYxMS0xNTUxNTA4MzU0LTgxMTciLCJwdWlkIjoiMTAwMzIwMDA0MEREMzIxQyIsInJoIjoiMC5BVmdBMWdLRkFIa184RWFyTjVOVTRfNkFfd2tBQUFBQUFBQUF3QUFBQUFBQUFBQllBUHcuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayIsImttc2kiXSwic3ViIjoibjE5ejEwdDRmYWNHMmV4UnBPRGRhTTNBNktfNEFSUlBTWVB2VllwckdwNCIsInRpZCI6IjAwODUwMmQ2LTNmNzktNDZmMC1hYjM3LTkzNTRlM2ZlODBmZiIsInVuaXF1ZV9uYW1lIjoibWFuaXNoYS5kZXZpQHVidGlpbmMuY29tIiwidXBuIjoibWFuaXNoYS5kZXZpQHVidGlpbmMuY29tIiwidXRpIjoiYkxOVVFubTJGa09XZ25xZmxxYmRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.ICZWE3L-yJp2kRmKDc4xWxj-FH-_l94i4YKUYUjJ1nk_vW6kTzvYxnT_Oe7voHDo7nXKfLjWlebQwvIJQe5eiRMq7FSECteIObr0MS2yQo86gl5r-sfNeux0wpYfv3CRj4YNucEeM12yrLewssZWgdStGHtg2LX66JViW0LMHWYPg2wmTnXKE2lN_oAay7oCzoe_BC0sMQQriD0qFch71w53fg-ZYc-uplHP4XCRGPJaw2U_lmF5Hv_NDc5bvFK8jEYOJreYc0b45gXT_iGwXbkcwhd_vje_35ez7apzNXQIiLoD4W9NHA-eAeQo744TYGu5eAbc5yZ_e5U_EVXU9Q';
    //     if (user)
    //       return {
    //         headers: { Authorization: "bearer " + user },
    //       };
    //     else return {};
    //   };
//       var qs = require('qs');
//       sessionStorage.setItem('author',false)
//       var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//   'grant_type': 'client_credentials',
//   'scope': 'api://cf91463b-a3f0-4358-9949-2db767b0defc',
//   // 'username': 'manisha.devi@ubtiinc.com',
//   // 'password': 'hcqqqrfvjktbhkzt',
//   'client_id': 'cf91463b-a3f0-4358-9949-2db767b0defc',
//   'client_secret': 'Dao8Q~XHfQ8H4qw8K5FPQDqAoZ7jIbc6CyKGlbgf' 
// });
// var config = {
//   method: 'post',
//   url: 'https://login.microsoftonline.com/008502d6-3f79-46f0-ab37-9354e3fe80ff/oauth2/token',
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded', 
//     // 'Access-Control-Allow-Origin':'http://localhost:3000/',
//      'Cookie': 'buid=0.AWQAMe_N-B6jSkuT5F9XHpElWsOG2xm5ssxEszk22iM6O-IBAAA.AQABAAEAAAD--DLA3VO7QrddgJg7Wevry3N0yRJCj-7urK1FdJssf3FjKqXm_mtPfWxt0_ntjWNTCmAtmOx7WZEx42Kfq0W8IHmTnULSmUGvFpmIC1Hd49_2o6bYisEJYUPS2tHNFVogAA; fpc=An1o1SlCEQJPm0M0moSCPPFzHniRAQAAAFc8W9sOAAAAsJFNxQEAAAAcPFvbDgAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log('tokenfff',JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

          
    //   axios({
        
    //       url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",   
    //       method: "POST",  
    //       headers:{  
    //         "Accept": "application/json",
    //         "Content-Type": "application/x-www-form-urlencoded",
            
    //       },
    //       resource:'https://analysis.windows.net/powerbi/api',
    //       data:{
    //         grant_type:'password',
    //         username:'manisha.devi@ubtiinc.com',
    //         password:'ForceReset2022',
    //         client_id:'cf91463b-a3f0-4358-9949-2db767b0defc',
    //         client_secret:'Dao8Q~XHfQ8H4qw8K5FPQDqAoZ7jIbc6CyKGlbgf',
            
    //       }
          
           
        
    
    //   }).then((response) => {
    //     console.log('token',response)
    // }).catch(console.log);
    
    
    
      
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDA4NTAyZDYtM2Y3OS00NmYwLWFiMzctOTM1NGUzZmU4MGZmLyIsImlhdCI6MTY3MjgyNjIyNywibmJmIjoxNjcyODI2MjI3LCJleHAiOjE2NzI4MzE4ODUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE3WlplU2FKL2VsYzhMZE82Q3c5cDJVZWZJOHNhTktLK0d1UVlPakI0eEJPVEhCQzIxZnVTOCtBZXp5REFpREZyIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGV2aSIsImdpdmVuX25hbWUiOiJNYW5pc2hhIiwiaXBhZGRyIjoiMTgyLjc2LjEyNy4xMjIiLCJuYW1lIjoiTWFuaXNoYSBEZXZpIiwib2lkIjoiNGMzZmI2NTEtMGQyMC00ODZhLWIzY2UtZjM2NDdiNDE0ZDEzIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTM3MTkxNTg4NTktMTkxNDc2NTYxMS0xNTUxNTA4MzU0LTgxMTciLCJwdWlkIjoiMTAwMzIwMDA0MEREMzIxQyIsInJoIjoiMC5BVmdBMWdLRkFIa184RWFyTjVOVTRfNkFfd2tBQUFBQUFBQUF3QUFBQUFBQUFBQllBUHcuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayIsImttc2kiXSwic3ViIjoibjE5ejEwdDRmYWNHMmV4UnBPRGRhTTNBNktfNEFSUlBTWVB2VllwckdwNCIsInRpZCI6IjAwODUwMmQ2LTNmNzktNDZmMC1hYjM3LTkzNTRlM2ZlODBmZiIsInVuaXF1ZV9uYW1lIjoibWFuaXNoYS5kZXZpQHVidGlpbmMuY29tIiwidXBuIjoibWFuaXNoYS5kZXZpQHVidGlpbmMuY29tIiwidXRpIjoiYkxOVVFubTJGa09XZ25xZmxxYmRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.ICZWE3L-yJp2kRmKDc4xWxj-FH-_l94i4YKUYUjJ1nk_vW6kTzvYxnT_Oe7voHDo7nXKfLjWlebQwvIJQe5eiRMq7FSECteIObr0MS2yQo86gl5r-sfNeux0wpYfv3CRj4YNucEeM12yrLewssZWgdStGHtg2LX66JViW0LMHWYPg2wmTnXKE2lN_oAay7oCzoe_BC0sMQQriD0qFch71w53fg-ZYc-uplHP4XCRGPJaw2U_lmF5Hv_NDc5bvFK8jEYOJreYc0b45gXT_iGwXbkcwhd_vje_35ez7apzNXQIiLoD4W9NHA-eAeQo744TYGu5eAbc5yZ_e5U_EVXU9Q'
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    
    // const bodyParameters = {
    //    key: "value"
    // };
    
    // axios.post( 
    //   'https://api.powerbi.com/v1.0/myorg/groups',
    //   bodyParameters,
    //   config
    // ).then((response) => {
    //     console.log('Res',response)
    // }).catch(console.log);
  }
  
  workspaceClick = () =>{
    axios({
      method: "get",
      url: 'https://api.powerbi.com/v1.0/myorg/groups',
      crossdomain: true,
      
      headers: {
        "authorization": 'Bearer ' + sessionStorage.getItem('Token'),
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      
    }).then((response) => {
          console.log('WorkspacesResponse',response.data.value)
          let keys = [];
          // for (let i = 0; i < length; i++) {
          //   let item = response.data.value.name;
          //   let key = item[i];
          //   keys.push({ label: key, value: key });
          // }
          {response.data.value.map((text, index) => (
            keys.push({ label: text.name, value: text.name,id:text.id,url:text.embedUrl })
          ))}
          console.log('keys',keys)
          
          this.setState({ totalWorkspces: keys });
          this.setState({workspaces:response.data.value})
          this.setState({openDialog:true})
    this.setState({mapWorkspace:false})
      }).catch(console.log);
    
  }
  manageWorkspace = () =>{
    this.setState({mapWorkspace:true})
    axios({
      method: "get",
      url: 'https://api.powerbi.com/v1.0/myorg/groups',
      crossdomain: true,
      
      headers: {
        "authorization": 'Bearer ' + sessionStorage.getItem('Token'),
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      
    }).then((response) => {
          console.log('WorkspacesResponse',response.data.value)
          let keys = [];
          // for (let i = 0; i < length; i++) {
          //   let item = response.data.value.name;
          //   let key = item[i];
          //   keys.push({ label: key, value: key });
          // }
          {response.data.value.map((text, index) => (
            keys.push({ label: text.name, value: text.name,id:text.id,url:text.embedUrl })
          ))}
          console.log('keys',keys)
          
          this.setState({ totalWorkspces: keys });
          this.setState({workspaces:response.data.value})
          
    
      }).catch(console.log);
  }
  showReports =(text)=>{
    console.log('text',text)
    this.setState({workspaceID:text.id})
    this.setState({workspaceName:text.name})
    axios({
        method: "get",
        url: 'https://api.powerbi.com/v1.0/myorg/groups/'+ text.id+'/reports',
        crossdomain: true,
        
        headers: {
          "authorization": "Bearer " + sessionStorage.getItem('Token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        
      }).then((response) => {
            console.log('Resp',response.data.value)
            this.setState({reports:response.data.value})
            this.setState({reportId:response.data.value.id})
            this.setState({reportUrl:response.data.value.embedUrl
            })
        //     let length = response.data.value.length;
         let keys = [];
        // for (let i = 0; i < length; i++) {
        //   let item = response.data.value.name;
        //   let key = item[i];
        //   keys.push({ label: key, value: key });
        // }
        {response.data.value.map((text, index) => (
          keys.push({ label: text.name, value: text.name,id:text.id,url:text.embedUrl })
        ))}
        console.log('keys',keys)
        
        this.setState({ totalReports: keys });
        // this.setState({ selectedReport: keys[0] });
            // this.setState({workspaces:response.data.value})
        }).catch(console.log);
    this.setState({openDialog:false})
    this.setState({dialog:true})
  }
  renderReports = (text) =>{
    this.setState({showreport:true})
this.setState({reportId:text.id})
this.setState({reportUrl:text.embedUrl
})
  }
  handleMapping = () =>{
    console.log('PUT Method called')
    axios({
        
      url: "https://10.10.200.208:44386/api/values?" + "id=" + this.state.selectedUser.value + "&value="+ this.state.selectedWorkspaces.value,   
      method: "POST",  
      headers:{  
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        
      }         
  }).then((response) => {
    console.log('PUT',response.data.Item1)
    
     this.setState({authorize:response.data.Item1})
     this.handleLoginClick();
  }).catch(console.log);
  }
  selectedReport = (name) => (value) =>{
    this.setState({ [name]: value });
    console.log('value',value.id)
    this.setState({showreport:true})
this.setState({reportId:value.id})
this.setState({reportUrl:value.url})
  }
  selectedUsers = (name) => (value) =>{
    this.setState({ [name]: value });
    console.log('value',value.id)
    
  }
  selectedWorkspaces = (name) => (value) =>{
    this.setState({ [name]: value });
    console.log('value',value.id)
    
  }
  logout = () =>{
    localStorage.setItem('author',false)
    sessionStorage.clear();
    this.setState({logout:true})
  }
  handleToggle = () => {
    this.setState(state => ({ openlogout: ! state.openlogout }));
  };

  handleClose = event => {
    this.setState({ openlogout: false });
  };
  render(){
    const { classes, theme,fullScreen } = this.props;
    const { open } = this.state;
    const { openlogout } = this.state;
    const { anchorEl } = this.state;
    const openDialog = Boolean(anchorEl);
    if (this.state.logout === true) {
      // <Login/>
    }
    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": { font: "inherit" },
      }),
    };

    const reactSelectStyles = (base) => ({
      ...base,
      zIndex: 99999,
    });
    
 if(localStorage.getItem('author') === 'true' ){
  return (
    
    
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
          // position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Embedded PowerBI React App
            </Typography>
            {/* <label className='logout' onClick={()=>this.logout()}>Logout</label> */}
            <div className='logout'>
            <Button
            className='log'
            // buttonRef={node => {
            //   this.anchorE4 = node;
            // }}
            // aria-owns={openlogout ? 'menu-list-grow' : undefined}
            // aria-haspopup="true"
            onClick={this.handleToggle}
          >
           {localStorage.getItem('role')}
          </Button>
          <Popper open={this.state.openlogout}  transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                    
                    <MenuItem onClick={()=>this.logout()}>Logout</MenuItem>
                      
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Workspaces'].map((text, index) => (
              <ListItem button key={text} onClick={()=>this.workspaceClick()}>
                <ListItemIcon><CollectionsOutlined /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {localStorage.getItem('role') === 'admin' ?
          <List>
            {['Workspace Management'].map((text, index) => (
              <ListItem button key={text} onClick={()=>this.manageWorkspace()}>
                <ListItemIcon><MapOutlined /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          :
          <List></List>
 }
          
        </Drawer>
        <main className={classes.content}>
        <Switch>
        <Route exact path="/login" component={Login} />
        </Switch>
          <div className={classes.toolbar} />
          {this.state.dialog === true && this.state.mapWorkspace === false ?(
            <div>
              <Tabs
              value={this.state.value}
              className="tabcls"
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={this.state.workspaceName} className={"main-tab-width"} />
              
            </Tabs>
        
          {/* <div>
          <span className='icocls'><Assessment className='asses'/><b className='wname'>{this.state.workspaceName}</b> </span>
          
          <span><h3></h3></span></div>
          
        
        
        <Divider/> */}
        {this.state.value === 0 ?
        <TabContainer>
        <Grid container spacing={24}>
          <Grid xs={1}>
          <label className="search-label"><b>Reports</b></label>
          </Grid>
          <Grid xs={2}>
          <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.totalReports}
                        value={this.state.selectedReport}
                        onChange={this.selectedReport("selectedReport")}
                        placeholder="Select"
                      />

          </Grid>
          <Grid xs={2}>
          
          
                  
          </Grid>
        </Grid>
        <br/>
        <br/>
        <Grid container spacing={24}>
          <Grid xs={12}>
          {this.state.showreport === true ?
        <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		id: this.state.reportId,
		embedUrl: this.state.reportUrl,
		accessToken: sessionStorage.getItem('Token'),
		tokenType: models.TokenType.Aad,
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "report-style-class" }

	
/>
:
<div/>
    }
          </Grid>
        </Grid>
        </TabContainer>
        :
        <TabContainer/>
  }

        
        
        {/* <br/>
        <br/>
        <br/>
        <br/> */}
        {/* <div>
        <span>Name</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Type</span>
        </div> */}
        {/* {this.state.reports.map((text, index) => (
            <div>
            
                 <span onClick={()=>this.renderReports(text)}>{text.name}</span><span>{text.reportType}</span>
            </div>
            ))} */}

        
        </div>
         )
         :(
           <div/>
         )
         }
         {this.state.mapWorkspace === true ?(
          <div>
            <Tabs
              value={this.state.value1}
              className="tabcls"
              onChange={this.handleTabChange1}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={'Workspace Management'} className={"main-tab-width"} />
              
            </Tabs>
            {this.state.value1 === 0 ?
        <TabContainer>
        <Grid container spacing={24}>
          <Grid xs={1}>
          <label className="search-label"><b>Users</b></label>
          </Grid>
          <Grid xs={2}>
          <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.totalUsers}
                        value={this.state.selectedUser}
                        onChange={this.selectedUsers("selectedUser")}
                        placeholder="Select"
                      />

          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={1}>
          <label className="search-label"><b>Workspaces</b></label>
                          
          </Grid>
          <Grid xs={2}>
                       <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.totalWorkspces}
                        value={this.state.selectedWorkspaces}
                        onChange={this.selectedWorkspaces("selectedWorkspaces")}
                        placeholder="Select"
                      />
 
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={2}>
          <Button
                      variant="contained"
                      size="large"
                      color="default"
                      onClick={this.handleMapping}
                    >
                      Map
                    </Button>
          </Grid>
          </Grid>
          </TabContainer>
          :
          <TabContainer/>}
          </div>
         ):
         <div/>
          
         }
          <div className={classes.drawerHeader} />
          {/* <Popover
          id="simple-popper"
          className='diaclass'
          open={this.state.openDialog}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover> */}
        <div className='diclass'>
          <Dialog
          //fullScreen={fullScreen}
          className= {classes.customModalRoot}
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Workspaces"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {this.state.workspaces.map((text, index) => (
                <p onClick={()=>this.showReports(text)}>{text.name}</p>
            ))}
            <div className='display'>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            <p>sample</p>
            

            
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
          </DialogActions>
        </Dialog>
        </div>
        
        </main>
      </div>
      
  );
 } 
 else{
  return <Login/>
 }  
 
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);

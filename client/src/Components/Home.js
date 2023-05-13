import * as React from 'react';
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import ProductList from './ProductList'
import { useNavigate } from 'react-router-dom';
import TotProd from './TotProd';
import TotVal from './TotVal';
import OutStock from './OutStock';
import Categories from './Categories';
import AddProduct from './AddProduct';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  function handleLogout(){
    axios.post(`http://localhost:8000/api/logout`, null, {withCredentials: true})
        .then(res => {
            console.log(res);
            localStorage.clear();
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
        });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //add product dialog
  const [openDialog,setOpenDialog] = React.useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  
  const handleClose = () => {
    setOpenDialog(false);
  };







  return (
    <Box sx={{ display: 'flex' }}>
      <AddProduct open={openDialog} productList={list} setProductList={setList} close={()=>handleClose()}/>

      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor:'#9093ea'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Inventory App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            bgcolor:'#9093ea',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <span className='me-5' style={{fontSize: "20px"}}>Dashboard</span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem>
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemIcon>
                        <AddBoxIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Add Product
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <RemoveCircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Remove Product
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => handleLogout()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <div className='d-flex flex-column justify-content-between' style={{height: "fit-content", width: "100%"}}>
                <div className='d-flex flex-column p-3' style={{height: "35%", width: "100%"}}>
                  <h1 className='mb-5'>Inventory Status</h1>
                  <div className='d-flex justify-content-between'>
                    <TotProd list={list}/>
                    <TotVal list={list}/>
                    <OutStock list={list}/>
                    <Categories list={list}/>
                  </div>
                </div>
                <Divider className='ms-3 my-3' style={{width: "98%"}}/>
                <div className='d-flex flex-column p-3' style={{height: "65%", width: "100%"}}>
                  <h1>Inventory Items</h1>
                  <Divider className='mb-4 mt-3'/>
                  <ProductList list={list} setList={setList}/>
                </div>
            </div>
      </Main>
    </Box>
  );
}

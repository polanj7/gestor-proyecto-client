import React, { useContext, useEffect } from "react";

// material
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuUser from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";

// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Menu } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GroupIcon from '@mui/icons-material/Group';

import logo from "../image/logo.png";

// context
import { UserContext } from "../context/UserContext";

// routes
import { Link, useNavigate  } from "react-router-dom";


/*cookies*/
import Cookies from 'js-cookie'


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const menuLinks = [
  { text: "Proyectos", to: "/project", icon: <AutoAwesomeMosaicIcon style={{color: "#ed6c02"}} /> },
  { text: "Usuarios", to: "/mantenimiento/usuarios", icon: <GroupIcon style={{color: "#ed6c02"}} /> }
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Layout({ children }) {
 
  const { user } = useContext(UserContext);  

  const theme = useTheme();
  
  let navigate = useNavigate();
  let okOpen = window.localStorage.getItem('isOpenDawer');
  
  const [open, setOpen] = React.useState(okOpen);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerOpen = () => {
    window.localStorage.setItem('isOpenDawer', 'true')
    setOpen(true);
  };

  const handleDrawerClose = () => {
    window.localStorage.setItem('isOpenDawer', 'false')
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => { 
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () =>{
    Cookies.remove('userName');
    Cookies.remove('userProfile');
    return navigate("/sign-in", {replace: true})
  }

  const settings = [
    {text: user, action: handleCloseUserMenu, icon: <PersonIcon fontSize="small" />}, 
    {text: "Salir", action: handleLogout, icon: <LogoutIcon fontSize="small" />}
  ];

  useEffect(() =>{
    setOpen(okOpen)
  }, [])

  return (
    // <ThemeProvider theme={themes}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* /*Header*/}
      <AppBar position="fixed" open={open} style={{backgroundColor: "#083240"}} >
        <Toolbar>
          {/*Boton del menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>

          {/* Logo */}
          <Typography
            color="white"
            variant="h5"
            noWrap
            component="h1"
            sx={{ flexGrow: 1, display: { xs: "flex" }, letterSpacing: "0.50em",
            wordSpacing: "0.50em" }}
          >
            Torre de Control
          </Typography>

          {/* Avatar usuario */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(user)} />
              </IconButton>
            </Tooltip>
            <MenuUser
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={setting.action}>
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <ListItemText>{setting.text}</ListItemText>
                </MenuItem>
              ))}
            </MenuUser>
          </Box>
        </Toolbar>
      </AppBar>

      {/*Aside*/}
      <Drawer variant="permanent" open={open} color="primary">
        <DrawerHeader style={{ height: 48 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex" }, alignContent: "center" }}
          >
            <img width="95%" src={logo} alt="logo asic" loading="lazy" />
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {menuLinks.map(({ text, to, icon }, idx) => (
            <Tooltip key={idx} title={text} placement="right">
              <ListItem button key={text} component={Link} to={to}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
        
      </Drawer>

      {/*Content*/}
      <Box component="main" sx={{ flexGrow: 1, m: 2}}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
    // </ThemeProvider>
  );
}

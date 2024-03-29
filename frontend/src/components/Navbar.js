import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import cover from "../images/background.png";

const pages = [{ name: 'Dashboard', link: "home" }];
const signinPages = [{ name: 'Sign up', link: "signup" }, { name: 'Login', link: "login" }]
const settings = [{ name: 'Profile', link: "profile" }, {name:"Take Survey", link:"survey"}];


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
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 120,
        height: 120,
        fontSize: 40,
  
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [doneAuth, setDoneAuth] = React.useState(false);
    const tryAuthenticate = async (event) => {
      const token = localStorage.getItem('token')
      if (token) {
        const options = {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch('http://18.222.148.248:3600/authenticate', options);
        
        const result = await response.json();
        const status = await response.status;
        if (status === 200) {
          //setUser();
          console.log(result.user);
          props.login(result.user);
          console.log(props.loginState);
        }
        setDoneAuth(true);
      }
    }  
    
    React.useEffect(()=> {
      if (!props.loginState) {
          tryAuthenticate();
      } else {
          setDoneAuth(true);
      }
  }, []);
  
    return (
        <AppBar position="fixed" style={{ background: props.clear ? 'rgba(0,0,0,0)' : 'rgba(255, 255, 255, 0.7)', boxShadow: 'none' }}>
            {/* 'rgba(255,255,255,0.7)' */}
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={''}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            //href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Wattendance
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                    <Link
                                        style={{ textDecoration: "none", color: "black" }}
                                        to={`/${page.link}`}>
                                    </Link>

                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wattendance
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.name} style={{ textDecoration: "none", color: "black" }} to={`/${page.link}`}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >{page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {props.loginState ?
                            <>

                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Jennifer Li" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <Link key={setting.name} style={{ textDecoration: "none", color: "black" }} to={`/${setting.link}`}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting.name}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    ))}
                                    <Link style={{ textDecoration: "none", color: "black" }} to="/">
                                        <MenuItem onClick={() => {
                                            handleCloseUserMenu();
                                            props.logout();
                                        }}>
                                            <Typography textAlign="center">Log Out
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </> :
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {signinPages.map((page) => (
                                    <Link key={page.name} style={{ textDecoration: "none", color: "black" }} to={`/${page.link}`}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'black', display: 'block' }}
                                        >
                                            {page.name}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;


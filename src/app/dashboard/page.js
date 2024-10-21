"use client";

// pages/dashboard.js

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  MdDashboard,
  MdAdminPanelSettings,
  MdVideoLibrary,
} from "react-icons/md";
import { BsPlayBtnFill, BsPersonCircle } from "react-icons/bs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image"; // Next.js Image component
import Link from "next/link"; // Next.js Link for routing
import { useRouter } from "next/navigation"; // Next.js router for navigation
import logo from "../images/logo.png";
const drawerWidth = 272;
import "../components/comman.scss";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Login from "../components/Login";
// Styled Components
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const theme = useTheme();
  const router = useRouter();

  var token = typeof window !== "undefined" ? localStorage.getItem('accessToken') : null;

    React.useEffect(() => {
      if (!token) {
        router.push("/login"); // Using router.push for navigation in Next.js
      }
    }, [token]);

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeIndex, setActiveIndex] = React.useState(null); // Track active item index

  const handleListItemClick = (index) => {
    setActiveIndex(index); // Update the active index
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#019BA7" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
              <MdVideoLibrary size={20} style={{ marginRight: 5 }} />
              <Typography>Video Tutorial</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
              <MdAdminPanelSettings size={20} style={{ marginRight: 5 }} />
              <Typography>Admin</Typography>
              <ArrowDropDownIcon />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BsPersonCircle size={20} style={{ marginRight: 5 }} />
              <Typography>Marcus Jovanovich</Typography>
              <ArrowDropDownIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#00ADBB",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          {/* Use Next.js Image component for the logo */}
          <Image src={logo} alt="Logo" className="sidebar_logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem
            disablePadding
            sx={{
              backgroundColor: activeIndex === 0 ? "#018292" : "transparent",
            }}
            onClick={() => handleListItemClick(0)}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <MdDashboard />
              </ListItemIcon>
              {/* <Link href="/dashboard/home" passHref> */}
              <ListItemText primary="Dashboard" sx={{ color: "white" }} />
              {/* </Link> */}
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              backgroundColor: activeIndex === 1 ? "#018292" : "transparent",
            }}
            onClick={() => handleListItemClick(1)}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <BsPlayBtnFill />
              </ListItemIcon>
              {/* <Link href="/dashboard/signup" passHref> */}
              <ListItemText
                primary="Client Mortgage Data"
                sx={{ color: "white" }}
              />
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Home />

      </Main>
    </Box>
  );
}

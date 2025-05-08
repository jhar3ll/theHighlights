import { Amplify } from "aws-amplify";
import { fetchAuthSession, fetchUserAttributes, signOut, updateUserAttribute } from "aws-amplify/auth";
import { DataStore, Predicates, SortDirection } from "aws-amplify/datastore";
import { Hub } from "aws-amplify/utils";
import { Authenticator } from "@aws-amplify/ui-react";

import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, parsePath } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DateCalendar } from "@mui/x-date-pickers";
import FormControlLabel  from "@mui/material/FormControlLabel";
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const AWS_Services = {
    Amplify,
    Authenticator,
    DataStore,
    fetchAuthSession, 
    fetchUserAttributes, 
    Hub,
    Predicates,
    signOut,
    SortDirection,
    updateUserAttribute,
}

export const Icons = {
    AttachMoneyIcon,
    CalendarMonthIcon,
    EventIcon,
    FacebookIcon,
    InstagramIcon,
    LibraryMusicIcon,
    MonetizationOnIcon,
    SearchIcon,
    YouTubeIcon
}

export const Library = {
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Chip,
    DateCalendar,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Router: { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams,  parsePath },
    TextField
}
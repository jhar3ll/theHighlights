import { Amplify } from "aws-amplify";
import { fetchAuthSession, fetchUserAttributes, signOut, updateUserAttribute } from "aws-amplify/auth";
import { AsyncCollection, DataStore, Predicates, SortDirection } from "aws-amplify/datastore";
import { Hub } from "aws-amplify/utils";
import { Authenticator } from "@aws-amplify/ui-react";
import dayjs from 'dayjs';
import type { Dayjs } from "dayjs";
import { Reorder, useDragControls } from "framer-motion"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { DateCalendar } from "@mui/x-date-pickers";
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel  from "@mui/material/FormControlLabel";
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import type { PickerValidDate } from "@mui/x-date-pickers";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import MenuItem from '@mui/material/MenuItem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, parsePath } from "react-router-dom";

export const AWS_Services = {
    Amplify,
    AsyncCollection,
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
    AddIcon,
    AttachMoneyIcon,
    CalendarMonthIcon,
    CheckIcon,
    ClearIcon,
    DragHandleIcon,
    EditIcon,
    EventIcon,
    FacebookIcon,
    InstagramIcon,
    LibraryMusicIcon,
    LogoutIcon,
    MenuIcon,
    MessageIcon,
    MonetizationOnIcon,
    QueueMusicIcon,
    RestoreIcon,
    SearchIcon,
    VisibilityIcon,
    YouTubeIcon
}

export const Library = {
    AdapterDayjs,
    Alert, 
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    DateCalendar,
    dayjs,
    Dialog,
    Divider,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    LocalizationProvider,
    MenuItem,
    PickersDay,
    Radio,
    RadioGroup,
    Reorder,
    Router: { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams,  parsePath },
    Snackbar,
    TextField,
    useDragControls
}

export { Dayjs, PickersDayProps, PickerValidDate };
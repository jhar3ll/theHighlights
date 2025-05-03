import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, parsePath } from "react-router-dom";
import Button from '@mui/material/Button';
import FormControlLabel  from "@mui/material/FormControlLabel";
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Icons = {
    AttachMoneyIcon,
    FacebookIcon,
    InstagramIcon,
    LibraryMusicIcon,
    YouTubeIcon
}

export const Library = {
    Button,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Router: { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams,  parsePath },
    TextField
}
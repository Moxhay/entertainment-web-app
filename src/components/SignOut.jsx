import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';
import { IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';

export const SignOut = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    // Detecta si la pantalla es xl (1200px o más)
    const isXL = useMediaQuery('(min-width: 1280px)');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        Cookies.remove('jwt');
        Cookies.remove('id');
        handleClose();
        navigate('/Login');
    };

    return (
        <div className="relative flex justify-center">
            <IconButton onClick={handleClick} sx={{ color: 'white' }} className="pointer-events-auto hover:cursor-pointer">
                <FaUserCircle className="h-6 w-fit md:h-8" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: isXL ? 'center' : 'bottom',
                    horizontal: isXL ? 'right' : 'center'
                }}
                transformOrigin={{
                    vertical: isXL ? 'center' : 'top',
                    horizontal: isXL ? 'left' : 'center'
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#161D2F',
                        color: 'white',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
                    }
                }}
            >
                <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
            </Menu>
        </div>
    );
};

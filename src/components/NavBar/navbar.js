import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PetLogo from '../../images/pet-house_blk_wt.png'
import { Avatar } from '@mui/material';
import { palette } from '@mui/system';




function TopNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{bgcolor: 'success.light'}} position="static" >
         <Avatar alt='petLogo' src={PetLogo} sx={{ mx:'auto', width: 200, height: 200 }} variant="square" />
        <Toolbar>
          
          <Typography variant="h3" component="div" sx={{
          mx: 'auto', p:'auto'}}>
            The Pet Project
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}


export default TopNav;

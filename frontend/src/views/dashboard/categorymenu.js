import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [others, SetOthers] = React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [proceed, setProceed] = React.useState(false);
  const [curcat,setCurCat]=React.useState("Choose Category");


  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleClose = (val) => {
    SetOthers(false);
    setDomain(val);
    setProceed(true);
    setAnchorEl(null);
    setCurCat(val);
  };

  const handleOthers = () => {
      SetOthers(true);
      setAnchorEl(null);
      setCurCat("Others");
  }

  const handleInputChange = (value) => {
      setDomain(value);
      setProceed(true);
  }

  const handleProceed = () => {
      localStorage.setItem("category", domain);
      window.location.reload();
  }

  return (
    <Grid container>

        <Grid xs={12} >
            <Button
                id="category-button"
                aria-controls={open ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} 
                sx={{ borderRadius: 4 }}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {/* Choose Category */}
                {curcat}
            </Button>
        </Grid>

        
      
      <StyledMenu
        id="category-menu"
        MenuListProps={{
          'aria-labelledby': 'category-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        style = {{maxHeight: '225px'}}
      >
        <MenuItem 
            onClick={() => handleClose("Health Care")} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Health Care
        </MenuItem>
        
        <MenuItem 
            onClick={() => handleClose("Food Retail")} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Food Retail
        </MenuItem>
        <MenuItem 
            onClick={() => handleClose("Banking")} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Banking
        </MenuItem>
        <MenuItem 
            onClick={() => handleClose("Real Estate")} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Real Estate
        </MenuItem>
        <MenuItem 
            onClick={() => handleClose("Insurance")} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Insurance
        </MenuItem>
        <MenuItem 
            onClick={handleOthers} 
            disableRipple 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}} >

          Others
        </MenuItem>
       
      </StyledMenu>
    
      {others == true ?  
      <Grid container>
        <Grid item xs={12} >
            <TextField    
            id="outlined-basic" 
            label="Domain Name" 
            variant="outlined" 
            style={{maxWidth: '400px', maxHeight: '75px', minWidth: '400px', minHeight: '50px'}}
            sx={{mt: 5}} 
            onChange={(event) => handleInputChange(event.target.value)}/>
        </Grid>
      </Grid> : <></> }

      {proceed == true ? 
      <Grid container>
        <Grid item xs={12} >
        <Button
                id="category-button"
                aria-controls={open ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{maxWidth: '200px', maxHeight: '75px', minWidth: '200px', minHeight: '50px'}} 
                sx={{ borderRadius: 4, mt: 10 }}
                variant="contained"
                disableElevation
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </Grid>
      </Grid> : <></> }
     
        
    </Grid>
  );
}
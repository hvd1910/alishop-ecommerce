import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: ownerState.active || ownerState.completed ? theme.palette.primary.main : theme.palette.text.disabled,
}));

const icons = {
  1: <PersonIcon />,
  2: <InventoryIcon />,
  3: <LocalShippingIcon />,
  4: <ShoppingBag />,
};

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  return (
    <CustomStepIconRoot ownerState={{ active, completed }}>
      {icons[String(icon)]}
    </CustomStepIconRoot>
  );
};

const StepperLayout = ({ steps, handleStatus }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

 
  const handleStep = (step) => () => {
    const newCompleted = {};
    for (let i = 0; i <= step; i++) {
      newCompleted[i] = true;
    }
    setCompleted(newCompleted);
    setActiveStep(step);
    handleStatus(step)
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={!!completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <StepLabel StepIconComponent={CustomStepIcon} StepIconProps={{ icon: index + 1, active: index === activeStep, completed: !!completed[index] }}>
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep == 0 && (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='mt-3'>
        <div style={{display:"flex"}} className='mt-2'><p style={{fontWeight:"600"}} className='mr-1'>Note:</p> <span>Confirm customer information before </span><button className="badge badge-info btn-status ml-1">Approved</button></div>
        <div style={{display:"flex"}} className='mt-2'><p style={{fontWeight:"600"}}  className='mr-1'>Guide:</p> <span>You click </span><button className="badge badge-info btn-status mr-1 ml-1">Approved</button>
        <span>to approve orders fastest  </span></div>
      </div>)
      }
       {activeStep == 1 && (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='mt-3'>
        <div style={{display:"flex"}} className='mt-2'><p style={{fontWeight:"600"}}  className='mr-1'>Guide:</p> <span>You click </span><button className="badge badge-info btn-status mr-1 ml-1">Packed</button>
        <span>to packed orders fastest  </span></div>
      </div>)
       }
       {activeStep == 2 && (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='mt-3'>
        <div style={{display:"flex"}} className='mt-2'><p style={{fontWeight:"600"}}  className='mr-1'>Guide:</p> <span>You click </span><button className="badge badge-info btn-status mr-1 ml-1">Shipped</button>
        <span>to shipped orders fastest  </span></div>
      </div>)
       }
      
      
    </Box>
  );
};

export default StepperLayout;

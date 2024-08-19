import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSuccess from './OrderSuccess';

const steps = ['Cart', 'Delivery Infomation', 'Payment'];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  
  // Get the initial step from the URL query parameter
  const initialStep = parseInt(querySearch.get('step'), 10) || 0;
  const [activeStep, setActiveStep] = React.useState(initialStep);

  // Update the query parameter whenever activeStep changes
  React.useEffect(() => {
    
    if (location.pathname === '/checkout' ) {
      navigate(`?step=${activeStep}`, { replace: true });
    }
  }, [activeStep, navigate, location.pathname]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep > 1) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    else{
      navigate('/cart')
    }
  };

  return (
    <div className='px-10 lg:px-20 mt-12 ml-16 mr-16'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0 || activeStep === 2}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ ml: 1 }}
              disabled>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next' }
              </Button>
            </Box>
            <div className=''>
              {activeStep === 1 ? <DeliveryAddressForm /> : <OrderSuccess />}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}

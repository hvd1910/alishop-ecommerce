import { Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-[#999999] text-white text-center mt-10"
        container
        sx={{ bgcolor: "#999999", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{padding:" 0 0 0 66px"}} className="text-left">
          <Typography className="pb-1" >
          FOLLOW ®ALISHOP IN
          </Typography>
          <div className="flex mb-3">
          <FacebookIcon className="mr-3" fontSize="large" />
          <InstagramIcon className="mr-3" fontSize="large"/>
          <YouTubeIcon className="mr-3" fontSize="large"/>
          <XIcon   fontSize="large" />
            </div>

            <Typography className="pb-2 " >
            SUBSCRIBE TO RECEIVE MORE PROMOTIONS
            </Typography>   
                     <div className="flex flex-col mx-auto mt-2 space-y-3 md:space-y-0 md:flex-row mr-8">
                    <input  id="email" type="text" className="px-2 h-[34px] text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" />
            
                    <button className="w-full px-1.5 h-[34px] text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                        Subscribe
                    </button>
                </div>

                <div className=" pt-3 " >
                <div className="flex ">HOTLINE: <p style={{lineHeight:"22px", color:"#EEEEEE", marginLeft:"3px"}}>0902.638.020 - 0931.610.291</p>
                </div>
                <li className="flex ">EMAIL: <p style={{lineHeight:"22px", color:"#EEEEEE", marginLeft:"3px"}}>support@doublebadstudio.com</p></li>
                            </div>   
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="text-left">
          <Typography className="pb-1" >
          STORE LOCATION
          </Typography>
          <div>
            <strong>SAI GON</strong>
            <p style={{lineHeight:"22px", color:"#EEEEEE"}}>1. 93 Rạch Bùng Binh,Ward 9, District 3. Hotline: 0583.270.206</p>
            <p style={{lineHeight:"22px",color:"#EEEEEE"}} >2. 117 Trần Đình Xu, Ward Nguyễn Cư Trinh, District 1. Hotline: 0909.379.802</p>
            <p style={{lineHeight:"22px", color:"#EEEEEE"}}>3. 57 Nguyễn Gia Trí Ward 25, Bình Thạnh District. Hotline: 0769.829.984</p>
            <p style={{lineHeight:"22px", color:"#EEEEEE"}}>4. 26 Lý Tự Trọng, Ward Bến Nghé, District 1. Hotline: 034.7437.362 </p>
            <strong>HA NOI</strong>
            <p style={{lineHeight:"22px", color:"#EEEEEE"}}>5. 21B Phố Lò Đúc, Ward Ngô Thì Nhậm, Hai Bà Trưng District, Hà Nội. Hotline: 0325.933.661</p>
            <strong>CAN THO</strong>
            <p style={{lineHeight:"22px", color:"#EEEEEE"}}>6. 7 Trần Văn Hoài, Ward Xuân Khánh, Ninh Kiều District, Cần Thơ. Hotline: 076.3352.853
            </p>
          </div>

        </Grid>
    
        <Grid item xs={12} sm={6} md={3} className="text-left ">
  
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            PRODUCT RETURN
                        </Button>
          </div>
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            RETURN POLICY
            </Button>
          </div>
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            CONTACT INFORMATION
            </Button>
          </div>
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            PAYMENT INFORMATION PRIVACY POLICY            </Button>
          </div>
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            GENERAL TERMS AND CONDITIONS
            </Button>
          </div>
          <div>
            <Button className="pb-1" variant="h6" gutterbottom="true">
            SHIPPING, DELIVERY POLICY            </Button>
          </div>
        </Grid>

        <Grid className="pt-6" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2024 My AliShop  All rights reserved.
          </Typography>

         
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;

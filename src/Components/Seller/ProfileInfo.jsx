import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

export default function ProfileInformation(){
    return(
        <Container>
            <Box sx={{display:"flex"}}>
            <Avatar sx={{width:200,height:200}}  />
            <Box mt={10} ml={3} >
            <Typography>
            <Box
              sx={{
                display: "flex",
                width: "70vw",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0 }}>Seller Name</h3>
              <Link>Edit</Link>
            </Box>
            <Box sx={{pt:1}}>
                                  <FacebookIcon/>
                                <WhatsAppIcon/>
                                <TelegramIcon/>
                                </Box>
          </Typography>
            </Box>
            </Box>       
        </Container>
    )
}
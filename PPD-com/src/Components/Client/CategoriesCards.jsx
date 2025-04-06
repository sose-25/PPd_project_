import { Container,Box ,Grid2} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CategoriesCards(){
    const cardsData = [
        {
            id:1,
          title: 'Engine',
          image: 'src/assets/istockphoto-528918828-612x612.jpg',
        
        },
        {
            id:2,
          title: 'Chassis',
          image: 'src/assets/01.jpg',
        
        },
        {
            id:3,
          title: 'Body',
          image: 'src/assets/Car-Chassis-UR-1024x640.jpg',
        
        },
        {
            id:4,
          title: 'Electronic System',
          image: 'src/assets/car-electronics.jpg',
        },
        {
            id:5,
          title: 'Interior',
          image: 'src/assets/Types-of-Car-Seat-Material.jpg',
        },
      ];
    return(
        <Container>
          <Typography textAlign={"center"} variant="h4">Categories</Typography>
           <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping to the next row
        gap: 3, // Spacing between cards
        padding: 3, backgroundColor:"#ffffff"
      }}
    >
      {cardsData.map((card) => (
        <Box
          key={card.id}
          sx={{
            flex: '1 1 calc(30% - 24px)', 
            minWidth: '250px',
          }}
        >
          <Card sx={{ height: '100%',transition: 'transform 0.3s ease', 
            '&:hover': {
              transform: 'scale(1.05)',}}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{backgroundColor:"gray"}}>
                <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
        </Container>
    )
}
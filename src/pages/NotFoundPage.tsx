import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
          >
            Back to Home
          </Button>
          
          <Button 
            variant="outlined" 
            component={Link} 
            to="/equipment"
            startIcon={<SearchIcon />}
          >
            Browse Equipment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
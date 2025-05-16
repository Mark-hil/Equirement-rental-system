import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import addDays from 'date-fns/addDays';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

// Mock equipment data
const mockEquipment = {
  id: '101',
  name: 'Excavator XL2000',
  image: 'https://via.placeholder.com/400x300',
  dailyRate: 250,
  description: 'Heavy-duty excavator suitable for large construction projects.',
  category: 'Heavy Machinery',
  available: true
};

const steps = ['Equipment Selection', 'Booking Details', 'Review & Confirm'];

const CreateBookingPage: React.FC = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1); // Start at step 1 since equipment is pre-selected
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [equipment, setEquipment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [bookingData, setBookingData] = useState({
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 3),
    purpose: '',
    location: '',
    notes: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    startDate: '',
    endDate: '',
    purpose: '',
    location: ''
  });

  useEffect(() => {
    // Simulate API call to fetch equipment details
    setTimeout(() => {
      if (equipmentId === '999') {
        setError('Equipment not found');
      } else {
        setEquipment({
          ...mockEquipment,
          id: equipmentId
        });
      }
      setLoading(false);
    }, 1000);
  }, [equipmentId]);

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate booking details
      const errors = {
        startDate: '',
        endDate: '',
        purpose: '',
        location: ''
      };
      
      if (!bookingData.startDate) {
        errors.startDate = 'Start date is required';
      } else if (isBefore(bookingData.startDate, new Date())) {
        errors.startDate = 'Start date cannot be in the past';
      }
      
      if (!bookingData.endDate) {
        errors.endDate = 'End date is required';
      } else if (isBefore(bookingData.endDate, bookingData.startDate)) {
        errors.endDate = 'End date must be after start date';
      }
      
      if (!bookingData.purpose.trim()) {
        errors.purpose = 'Purpose is required';
      }
      
      if (!bookingData.location.trim()) {
        errors.location = 'Location is required';
      }
      
      if (errors.startDate || errors.endDate || errors.purpose || errors.location) {
        setFormErrors(errors);
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setBookingData(prev => ({
      ...prev,
      [name]: date
    }));
    
    // Clear error when user changes date
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateTotalDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end days
  };

  const calculateTotalCost = () => {
    const days = calculateTotalDays();
    return days * (equipment?.dailyRate || 0);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Simulate API call to create booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or booking details
      navigate('/bookings', { state: { success: true, message: 'Booking created successfully!' } });
    } catch (err) {
      setSubmitting(false);
      setError('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/equipment"
          sx={{ mt: 2 }}
        >
          Back to Equipment
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to={`/equipment/${equipmentId}`}
          sx={{ mb: 2 }}
        >
          Back to Equipment
        </Button>
        
        <Typography variant="h4" gutterBottom>
          Create Booking
        </Typography>
        
        <Stepper activeStep={activeStep - 1} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      {activeStep === 1 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="200"
                  image={equipment.image}
                  alt={equipment.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {equipment.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {equipment.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${equipment.dailyRate}/day
                    </Typography>
                    <Chip 
                      label={equipment.available ? 'Available' : 'Unavailable'} 
                      color={equipment.available ? 'success' : 'error'} 
                      size="small" 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Booking Details
                </Typography>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Start Date"
                        value={bookingData.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        disablePast
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!formErrors.startDate,
                            helperText: formErrors.startDate
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="End Date"
                        value={bookingData.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        disablePast
                        minDate={bookingData.startDate || undefined}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!formErrors.endDate,
                            helperText: formErrors.endDate
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                
                <Grid container spacing={3} sx={{ mt: 0 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!formErrors.purpose}>
                      <InputLabel id="purpose-label">Purpose</InputLabel>
                      <Select
                        labelId="purpose-label"
                        name="purpose"
                        value={bookingData.purpose}
                        label="Purpose"
                        onChange={handleInputChange as any}
                      >
                        <MenuItem value="Construction">Construction</MenuItem>
                        <MenuItem value="Excavation">Excavation</MenuItem>
                        <MenuItem value="Demolition">Demolition</MenuItem>
                        <MenuItem value="Transportation">Transportation</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      {formErrors.purpose && (
                        <FormHelperText>{formErrors.purpose}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="location"
                      label="Location"
                      fullWidth
                      value={bookingData.location}
                      onChange={handleInputChange}
                      error={!!formErrors.location}
                      helperText={formErrors.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="notes"
                      label="Additional Notes"
                      multiline
                      rows={3}
                      fullWidth
                      value={bookingData.notes}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          </Box>
        </>
      )}
      
      {activeStep === 2 && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Booking Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Equipment
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.category}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingData.startDate?.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingData.endDate?.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Purpose
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingData.purpose}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingData.location}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Additional Notes
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingData.notes || 'None'}
                </Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Daily Rate
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ${equipment.dailyRate.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Days
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {calculateTotalDays()} days
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Total Cost: ${calculateTotalCost().toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </Box>
        </>
      )}
      
      {activeStep === 3 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" paragraph>
            Your booking for {equipment.name} has been successfully created.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You can view and manage your bookings in the bookings section.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              component={Link}
              to="/bookings"
            >
              View My Bookings
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CreateBookingPage;
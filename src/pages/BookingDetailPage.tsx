import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock booking data
const mockBookingDetails = {
  id: '1',
  equipmentName: 'Excavator XL2000',
  equipmentId: '101',
  equipmentImage: 'https://via.placeholder.com/400x300',
  startDate: '2023-06-10',
  endDate: '2023-06-15',
  status: 'Approved',
  location: 'Main Construction Site, Building A',
  requestDate: '2023-05-30',
  approvedBy: 'Jane Smith',
  approvedDate: '2023-06-01',
  notes: 'Please ensure the equipment is returned in good condition.',
  cost: '$1,250.00',
  paymentStatus: 'Paid'
};

const BookingDetailPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch booking details
    setTimeout(() => {
      if (bookingId === '999') {
        setError('Booking not found');
      } else {
        setBooking({
          ...mockBookingDetails,
          id: bookingId
        });
      }
      setLoading(false);
    }, 1000);
  }, [bookingId]);

  const handleCancelBooking = async () => {
    setCancelling(true);
    
    // Simulate API call to cancel booking
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCancelling(false);
      setCancelDialogOpen(false);
      setCancelSuccess(true);
      
      // Update booking status
      setBooking(prev => ({
        ...prev,
        status: 'Cancelled'
      }));
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/bookings');
      }, 3000);
    } catch (err) {
      setCancelling(false);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
          to="/bookings"
          sx={{ mt: 2 }}
        >
          Back to Bookings
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {cancelSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Booking cancelled successfully! Redirecting to bookings page...
        </Alert>
      )}
      
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/bookings"
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">
          Booking Details
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              {booking.equipmentName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>
                {booking.startDate} to {booking.endDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>{booking.location}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Chip 
                label={booking.status} 
                color={getStatusColor(booking.status) as any}
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={booking.equipmentImage} 
              alt={booking.equipmentName}
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Booking Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Booking ID
                </Typography>
                <Typography variant="body1">
                  #{booking.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Request Date
                </Typography>
                <Typography variant="body1">
                  {booking.requestDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {booking.startDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1">
                  {booking.endDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Notes
                </Typography>
                <Typography variant="body1">
                  {booking.notes || 'No notes provided'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Cost
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {booking.cost}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Status
                </Typography>
                <Chip 
                  label={booking.paymentStatus} 
                  color={booking.paymentStatus === 'Paid' ? 'success' : 'warning'}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Approved By
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                  <Typography variant="body1">
                    {booking.approvedBy} ({booking.approvedDate})
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ReceiptIcon />}
                fullWidth
              >
                Download Invoice
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          component={Link}
          to={`/equipment/${booking.equipmentId}`}
        >
          View Equipment
        </Button>
        
        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
          <Button
            variant="contained"
            color="error"
            onClick={() => setCancelDialogOpen(true)}
          >
            Cancel Booking
          </Button>
        )}
      </Box>
      
      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => !cancelling && setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setCancelDialogOpen(false)} 
            disabled={cancelling}
          >
            No, Keep Booking
          </Button>
          <Button 
            onClick={handleCancelBooking} 
            color="error" 
            disabled={cancelling}
            autoFocus
          >
            {cancelling ? 'Cancelling...' : 'Yes, Cancel Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingDetailPage;
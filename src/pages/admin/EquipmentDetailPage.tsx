import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  Tab,
  Tabs
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';

// Mock equipment data
const mockEquipmentDetails = {
  id: '101',
  name: 'Excavator XL2000',
  description: 'Heavy-duty excavator suitable for large construction projects.',
  category: 'Heavy Machinery',
  status: 'Available',
  dailyRate: 250,
  location: 'Main Warehouse',
  manufacturer: 'CAT',
  model: 'XL2000',
  serialNumber: 'CAT-XL2000-12345',
  purchaseDate: '2020-03-15',
  purchasePrice: 75000,
  lastMaintenance: '2023-05-15',
  nextMaintenanceDue: '2023-08-15',
  images: [
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600'
  ],
  specifications: {
    weight: '20 tons',
    dimensions: '7.5m x 2.5m x 3.2m',
    enginePower: '150 HP',
    fuelType: 'Diesel',
    maxDiggingDepth: '6.5m',
    maxReach: '9.5m'
  },
  maintenanceHistory: [
    {
      date: '2023-05-15',
      type: 'Regular Maintenance',
      description: 'Oil change, filter replacement, and general inspection',
      cost: 450,
      technician: 'John Doe'
    },
    {
      date: '2023-02-10',
      type: 'Repair',
      description: 'Hydraulic system repair',
      cost: 1200,
      technician: 'Mike Smith'
    },
    {
      date: '2022-11-05',
      type: 'Regular Maintenance',
      description: 'Oil change and filter replacement',
      cost: 400,
      technician: 'John Doe'
    }
  ],
  bookingHistory: [
    {
      id: '1001',
      startDate: '2023-04-10',
      endDate: '2023-04-15',
      user: 'Robert Johnson',
      project: 'Downtown Building Construction',
      status: 'Completed'
    },
    {
      id: '1002',
      startDate: '2023-03-01',
      endDate: '2023-03-10',
      user: 'Sarah Williams',
      project: 'Highway Extension Project',
      status: 'Completed'
    },
    {
      id: '1003',
      startDate: '2023-02-15',
      endDate: '2023-02-20',
      user: 'Michael Brown',
      project: 'Commercial Complex Foundation',
      status: 'Completed'
    }
  ]
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`equipment-tabpanel-${index}`}
      aria-labelledby={`equipment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminEquipmentDetailPage: React.FC = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch equipment details
    setTimeout(() => {
      if (equipmentId === '999') {
        setError('Equipment not found');
      } else {
        setEquipment({
          ...mockEquipmentDetails,
          id: equipmentId
        });
      }
      setLoading(false);
    }, 1000);
  }, [equipmentId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteInProgress(true);
    
    try {
      // Simulate API call to delete equipment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDeleteDialogOpen(false);
      navigate('/admin/equipment', { state: { success: true, message: 'Equipment deleted successfully' } });
    } catch (err) {
      setDeleteInProgress(false);
      setError('Failed to delete equipment. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success';
      case 'in use':
        return 'primary';
      case 'maintenance':
        return 'warning';
      case 'out of service':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/admin/equipment"
          sx={{ mt: 2 }}
        >
          Back to Equipment List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/admin/equipment"
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4">
            Equipment Details
          </Typography>
        </Box>
        
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            to={`/admin/equipment/${equipmentId}/edit`}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="300"
              image={equipment.images[mainImageIndex]}
              alt={equipment.name}
            />
            <Box sx={{ display: 'flex', p: 1, gap: 1, overflowX: 'auto' }}>
              {equipment.images.map((image: string, index: number) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  sx={{
                    width: 80,
                    height: 60,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: index === mainImageIndex ? '2px solid #1976d2' : '2px solid transparent',
                  }}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">{equipment.name}</Typography>
              <Chip 
                label={equipment.status} 
                color={getStatusColor(equipment.status) as any}
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {equipment.description}
            </Typography>
            
            <Grid container spacing={2}>
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
                  Daily Rate
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ${equipment.dailyRate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Manufacturer
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.manufacturer}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Model
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.model}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Serial Number
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.serialNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.location}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Maintenance
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.lastMaintenance}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Next Maintenance Due
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {equipment.nextMaintenanceDue}
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<BuildIcon />}
                color="secondary"
              >
                Schedule Maintenance
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="equipment tabs">
                <Tab label="Specifications" />
                <Tab label="Maintenance History" icon={<HistoryIcon />} iconPosition="start" />
                <Tab label="Booking History" icon={<EventIcon />} iconPosition="start" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                {Object.entries(equipment.specifications).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                      <Typography variant="body1">
                        {value as string}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <List>
                {equipment.maintenanceHistory.map((maintenance: any, index: number) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">
                              {maintenance.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {maintenance.date}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.primary">
                              {maintenance.description}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" component="span">
                                Technician: {maintenance.technician}
                              </Typography>
                              <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                                Cost: ${maintenance.cost}
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    {index < equipment.maintenanceHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <List>
                {equipment.bookingHistory.map((booking: any, index: number) => (
                  <React.Fragment key={booking.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">
                              {booking.project}
                            </Typography>
                            <Chip 
                              label={booking.status} 
                              size="small"
                              color={booking.status === 'Completed' ? 'success' : 'default'}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.primary">
                              {booking.startDate} to {booking.endDate}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2">
                                User: {booking.user}
                              </Typography>
                              <Typography variant="body2">
                                Booking ID: #{booking.id}
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    {index < equipment.bookingHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleteInProgress && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Equipment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {equipment.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={deleteInProgress}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={deleteInProgress}
            autoFocus
          >
            {deleteInProgress ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminEquipmentDetailPage;
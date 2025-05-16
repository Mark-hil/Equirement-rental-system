import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock equipment data for edit mode
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
    'https://via.placeholder.com/800x600'
  ],
  specifications: {
    weight: '20 tons',
    dimensions: '7.5m x 2.5m x 3.2m',
    enginePower: '150 HP',
    fuelType: 'Diesel',
    maxDiggingDepth: '6.5m',
    maxReach: '9.5m'
  }
};

const AdminEquipmentFormPage: React.FC = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!equipmentId;
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'Available',
    dailyRate: '',
    location: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: null as Date | null,
    purchasePrice: '',
    lastMaintenance: null as Date | null,
    nextMaintenanceDue: null as Date | null,
    images: [] as string[],
    specifications: {
      weight: '',
      dimensions: '',
      enginePower: '',
      fuelType: '',
      maxDiggingDepth: '',
      maxReach: ''
    }
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    dailyRate: '',
    location: '',
    manufacturer: '',
    model: '',
    serialNumber: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulate API call to fetch equipment details
      setTimeout(() => {
        if (equipmentId === '999') {
          setError('Equipment not found');
        } else {
          // Convert string dates to Date objects
          const purchaseDate = mockEquipmentDetails.purchaseDate ? new Date(mockEquipmentDetails.purchaseDate) : null;
          const lastMaintenance = mockEquipmentDetails.lastMaintenance ? new Date(mockEquipmentDetails.lastMaintenance) : null;
          const nextMaintenanceDue = mockEquipmentDetails.nextMaintenanceDue ? new Date(mockEquipmentDetails.nextMaintenanceDue) : null;
          
          setFormData({
            ...mockEquipmentDetails,
            purchaseDate,
            lastMaintenance,
            nextMaintenanceDue,
            dailyRate: mockEquipmentDetails.dailyRate.toString(),
            purchasePrice: mockEquipmentDetails.purchasePrice.toString()
          });
        }
        setLoading(false);
      }, 1000);
    }
  }, [equipmentId, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user selects
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value
      }
    }));
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker or prompt for an image URL
    // For this example, we'll just add a placeholder image
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, 'https://via.placeholder.com/800x600']
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {
      name: '',
      category: '',
      dailyRate: '',
      location: '',
      manufacturer: '',
      model: '',
      serialNumber: ''
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
      isValid = false;
    }
    
    if (!formData.dailyRate.trim()) {
      errors.dailyRate = 'Daily rate is required';
      isValid = false;
    } else if (isNaN(Number(formData.dailyRate)) || Number(formData.dailyRate) <= 0) {
      errors.dailyRate = 'Daily rate must be a positive number';
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }
    
    if (!formData.manufacturer.trim()) {
      errors.manufacturer = 'Manufacturer is required';
      isValid = false;
    }
    
    if (!formData.model.trim()) {
      errors.model = 'Model is required';
      isValid = false;
    }
    
    if (!formData.serialNumber.trim()) {
      errors.serialNumber = 'Serial number is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call to create/update equipment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/admin/equipment', { 
          state: { 
            success: true, 
            message: isEditMode ? 'Equipment updated successfully' : 'Equipment created successfully' 
          } 
        });
      }, 1500);
    } catch (err) {
      setSubmitting(false);
      setError('Failed to save equipment. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !formErrors.name) {
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
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/admin/equipment"
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">
          {isEditMode ? 'Edit Equipment' : 'Add New Equipment'}
        </Typography>
      </Box>
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {isEditMode ? 'Equipment updated successfully!' : 'Equipment created successfully!'}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Equipment Name"
                fullWidth
                required
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!formErrors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Heavy Machinery">Heavy Machinery</MenuItem>
                  <MenuItem value="Lifting Equipment">Lifting Equipment</MenuItem>
                  <MenuItem value="Warehouse Equipment">Warehouse Equipment</MenuItem>
                  <MenuItem value="Construction Equipment">Construction Equipment</MenuItem>
                  <MenuItem value="Earthmoving Equipment">Earthmoving Equipment</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {formErrors.category && (
                  <FormHelperText>{formErrors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="In Use">In Use</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                  <MenuItem value="Out of Service">Out of Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dailyRate"
                label="Daily Rate ($)"
                fullWidth
                required
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={formData.dailyRate}
                onChange={handleInputChange}
                error={!!formErrors.dailyRate}
                helperText={formErrors.dailyRate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                fullWidth
                required
                value={formData.location}
                onChange={handleInputChange}
                error={!!formErrors.location}
                helperText={formErrors.location}
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Equipment Details
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="manufacturer"
                label="Manufacturer"
                fullWidth
                required
                value={formData.manufacturer}
                onChange={handleInputChange}
                error={!!formErrors.manufacturer}
                helperText={formErrors.manufacturer}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="model"
                label="Model"
                fullWidth
                required
                value={formData.model}
                onChange={handleInputChange}
                error={!!formErrors.model}
                helperText={formErrors.model}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="serialNumber"
                label="Serial Number"
                fullWidth
                required
                value={formData.serialNumber}
                onChange={handleInputChange}
                error={!!formErrors.serialNumber}
                helperText={formErrors.serialNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="purchasePrice"
                label="Purchase Price ($)"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={formData.purchasePrice}
                onChange={handleInputChange}
              />
            </Grid>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Purchase Date"
                  value={formData.purchaseDate}
                  onChange={(date) => handleDateChange('purchaseDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Last Maintenance"
                  value={formData.lastMaintenance}
                  onChange={(date) => handleDateChange('lastMaintenance', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Next Maintenance Due"
                  value={formData.nextMaintenanceDue}
                  onChange={(date) => handleDateChange('nextMaintenanceDue', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Specifications
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="weight"
                label="Weight"
                fullWidth
                value={formData.specifications.weight}
                onChange={handleSpecificationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dimensions"
                label="Dimensions"
                fullWidth
                value={formData.specifications.dimensions}
                onChange={handleSpecificationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="enginePower"
                label="Engine Power"
                fullWidth
                value={formData.specifications.enginePower}
                onChange={handleSpecificationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fuelType"
                label="Fuel Type"
                fullWidth
                value={formData.specifications.fuelType}
                onChange={handleSpecificationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="maxDiggingDepth"
                label="Max Digging Depth"
                fullWidth
                value={formData.specifications.maxDiggingDepth}
                onChange={handleSpecificationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="maxReach"
                label="Max Reach"
                fullWidth
                value={formData.specifications.maxReach}
                onChange={handleSpecificationChange}
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          
          <Grid container spacing={2}>
            {formData.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ position: 'relative' }}>
                  <img 
                    src={image} 
                    alt={`Equipment ${index + 1}`}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  height: '150px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleAddImage}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Add Image
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/admin/equipment')}
              sx={{ mr: 2 }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : isEditMode ? 'Update Equipment' : 'Create Equipment'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminEquipmentFormPage;
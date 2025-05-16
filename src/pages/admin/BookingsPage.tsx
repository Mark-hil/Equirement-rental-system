import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';

// Mock booking data
const mockBookings = [
  {
    id: '1001',
    equipmentName: 'Excavator XL2000',
    equipmentId: '101',
    userName: 'John Smith',
    userId: '201',
    startDate: '2023-06-10',
    endDate: '2023-06-15',
    status: 'Approved',
    totalCost: 1250,
    createdAt: '2023-06-01'
  },
  {
    id: '1002',
    equipmentName: 'Bulldozer B500',
    equipmentId: '102',
    userName: 'Sarah Johnson',
    userId: '202',
    startDate: '2023-06-20',
    endDate: '2023-06-25',
    status: 'Pending',
    totalCost: 1500,
    createdAt: '2023-06-05'
  },
  {
    id: '1003',
    equipmentName: 'Crane C3000',
    equipmentId: '103',
    userName: 'Michael Brown',
    userId: '203',
    startDate: '2023-05-15',
    endDate: '2023-05-20',
    status: 'Completed',
    totalCost: 2250,
    createdAt: '2023-05-01'
  },
  {
    id: '1004',
    equipmentName: 'Forklift F200',
    equipmentId: '104',
    userName: 'Emily Davis',
    userId: '204',
    startDate: '2023-06-05',
    endDate: '2023-06-07',
    status: 'Cancelled',
    totalCost: 300,
    createdAt: '2023-05-25'
  },
  {
    id: '1005',
    equipmentName: 'Concrete Mixer CM100',
    equipmentId: '105',
    userName: 'David Wilson',
    userId: '205',
    startDate: '2023-06-15',
    endDate: '2023-06-18',
    status: 'Pending',
    totalCost: 360,
    createdAt: '2023-06-08'
  }
];

const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusAction, setStatusAction] = useState<'approve' | 'cancel' | null>(null);
  const [statusInProgress, setStatusInProgress] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    startDate: null as Date | null,
    endDate: null as Date | null
  });

  useEffect(() => {
    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, bookingId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(bookingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusClick = (action: 'approve' | 'cancel') => {
    handleMenuClose();
    setStatusAction(action);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = async () => {
    if (!selectedBooking || !statusAction) return;
    
    setStatusInProgress(true);
    
    try {
      // Simulate API call to update booking status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update booking status in list
      setBookings(prev => prev.map(booking => {
        if (booking.id === selectedBooking) {
          return {
            ...booking,
            status: statusAction === 'approve' ? 'Approved' : 'Cancelled'
          };
        }
        return booking;
      }));
      
      setStatusDialogOpen(false);
      setStatusInProgress(false);
      setStatusAction(null);
    } catch (err) {
      console.error('Error updating booking status:', err);
      setStatusInProgress(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    setFilterDialogOpen(false);
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      startDate: null,
      endDate: null
    });
  };

  const filteredBookings = bookings.filter(booking => {
    // Search term filter
    const matchesSearch = 
      booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = !filters.status || booking.status === filters.status;
    
    // Date range filter
    let matchesDateRange = true;
    if (filters.startDate) {
      const bookingStart = new Date(booking.startDate);
      matchesDateRange = matchesDateRange && bookingStart >= filters.startDate;
    }
    if (filters.endDate) {
      const bookingEnd = new Date(booking.endDate);
      matchesDateRange = matchesDateRange && bookingEnd <= filters.endDate;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Management
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search bookings..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '300px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            onClick={() => setFilterDialogOpen(true)}
          >
            Filter
          </Button>
        </Box>
      </Paper>
      
      <Paper elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Equipment</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total Cost</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>
                          <Link to={`/admin/equipment/${booking.equipmentId}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                            {booking.equipmentName}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/users/${booking.userId}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                            {booking.userName}
                          </Link>
                        </TableCell>
                        <TableCell>{booking.startDate}</TableCell>
                        <TableCell>{booking.endDate}</TableCell>
                        <TableCell>
                          <Chip 
                            label={booking.status} 
                            color={getStatusColor(booking.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${booking.totalCost}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, booking.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  
                  {filteredBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          component={Link} 
          to={`/admin/bookings/${selectedBooking}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick('approve')}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Approve</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick('cancel')}>
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Cancel</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Contact User</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => !statusInProgress && setStatusDialogOpen(false)}
      >
        <DialogTitle>
          {statusAction === 'approve' ? 'Approve Booking' : 'Cancel Booking'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {statusAction === 'approve' 
              ? 'Are you sure you want to approve this booking? The user will be notified.'
              : 'Are you sure you want to cancel this booking? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setStatusDialogOpen(false)} 
            disabled={statusInProgress}
          >
            No
          </Button>
          <Button 
            onClick={handleStatusConfirm} 
            color={statusAction === 'approve' ? 'success' : 'error'} 
            disabled={statusInProgress}
            autoFocus
          >
            {statusInProgress ? 'Processing...' : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Filter Bookings</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={filters.status}
                  label="Status"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="From Date"
                  value={filters.startDate}
                  onChange={(date) => handleFilterChange('startDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="To Date"
                  value={filters.endDate}
                  onChange={(date) => handleFilterChange('endDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetFilters}>
            Reset
          </Button>
          <Button onClick={() => setFilterDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApplyFilters} variant="contained">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminBookingsPage;
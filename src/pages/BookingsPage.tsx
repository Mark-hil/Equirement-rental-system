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
  Chip,
  Box,
  CircularProgress,
  TablePagination,
  TextField,
  InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    equipmentName: 'Excavator XL2000',
    startDate: '2023-06-10',
    endDate: '2023-06-15',
    status: 'Approved',
    equipmentId: '101'
  },
  {
    id: '2',
    equipmentName: 'Bulldozer B500',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    status: 'Pending',
    equipmentId: '102'
  },
  {
    id: '3',
    equipmentName: 'Crane C3000',
    startDate: '2023-05-20',
    endDate: '2023-05-25',
    status: 'Completed',
    equipmentId: '103'
  },
  {
    id: '4',
    equipmentName: 'Forklift F200',
    startDate: '2023-06-25',
    endDate: '2023-06-30',
    status: 'Cancelled',
    equipmentId: '104'
  }
];

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

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

  const filteredBookings = bookings.filter(booking => 
    booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        My Bookings
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Search bookings"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
        
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            sx={{ mr: 2 }}
          >
            Filter
          </Button>
          <Button 
            variant="contained" 
            component={Link} 
            to="/equipment"
          >
            Book New Equipment
          </Button>
        </Box>
      </Box>
      
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
                    <TableCell>Equipment</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <Link to={`/equipment/${booking.equipmentId}`}>
                            {booking.equipmentName}
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
                        <TableCell align="right">
                          <Button 
                            variant="outlined" 
                            size="small"
                            component={Link}
                            to={`/bookings/${booking.id}`}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  
                  {filteredBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
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
    </Container>
  );
};

export default BookingsPage;
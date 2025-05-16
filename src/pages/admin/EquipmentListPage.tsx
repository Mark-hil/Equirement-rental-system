import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from '../../context/AuthContext';

// Mock equipment data
const mockEquipment = [
  {
    id: '101',
    name: 'Excavator XL2000',
    category: 'Heavy Machinery',
    status: 'Available',
    dailyRate: 250,
    location: 'Main Warehouse',
    lastMaintenance: '2023-05-15'
  },
  {
    id: '102',
    name: 'Bulldozer B500',
    category: 'Heavy Machinery',
    status: 'In Use',
    dailyRate: 300,
    location: 'Site A',
    lastMaintenance: '2023-04-20'
  },
  {
    id: '103',
    name: 'Crane C3000',
    category: 'Lifting Equipment',
    status: 'Maintenance',
    dailyRate: 450,
    location: 'Repair Shop',
    lastMaintenance: '2023-06-01'
  },
  {
    id: '104',
    name: 'Forklift F200',
    category: 'Warehouse Equipment',
    status: 'Available',
    dailyRate: 150,
    location: 'Main Warehouse',
    lastMaintenance: '2023-05-10'
  },
  {
    id: '105',
    name: 'Concrete Mixer CM100',
    category: 'Construction Equipment',
    status: 'Available',
    dailyRate: 120,
    location: 'Main Warehouse',
    lastMaintenance: '2023-05-22'
  }
];

const AdminEquipmentListPage: React.FC = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Determine if we're in admin or manager path
  const isAdminPath = location.pathname.startsWith('/admin');
  const basePath = isAdminPath ? '/admin' : '/manager';

  useEffect(() => {
    // Simulate API call to fetch equipment
    setTimeout(() => {
      setEquipment(mockEquipment);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, equipmentId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedEquipment(equipmentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEquipment(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEquipment) return;
    
    setDeleteInProgress(true);
    
    try {
      // Simulate API call to delete equipment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove equipment from list
      setEquipment(prev => prev.filter(item => item.id !== selectedEquipment));
      setDeleteDialogOpen(false);
      setDeleteInProgress(false);
    } catch (err) {
      console.error('Error deleting equipment:', err);
      setDeleteInProgress(false);
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

  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Equipment Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to={`${basePath}/equipment/new`}
        >
          Add Equipment
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search equipment..."
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Daily Rate</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Last Maintenance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEquipment
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                          <Link to={`${basePath}/equipment/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Chip 
                            label={item.status} 
                            color={getStatusColor(item.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${item.dailyRate}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.lastMaintenance}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, item.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  
                  {filteredEquipment.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No equipment found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredEquipment.length}
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
          to={`${basePath}/equipment/${selectedEquipment}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem 
          component={Link} 
          to={`${basePath}/equipment/${selectedEquipment}/edit`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleteInProgress && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Equipment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this equipment? This action cannot be undone.
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

export default AdminEquipmentListPage;
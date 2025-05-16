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
  Avatar,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// Mock user data
const mockUsers = [
  {
    id: '201',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    role: 'User',
    status: 'Active',
    department: 'Engineering',
    position: 'Project Manager',
    registeredDate: '2023-01-15',
    lastLogin: '2023-06-09'
  },
  {
    id: '202',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    role: 'User',
    status: 'Active',
    department: 'Construction',
    position: 'Site Supervisor',
    registeredDate: '2023-02-20',
    lastLogin: '2023-06-08'
  },
  {
    id: '203',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    role: 'Manager',
    status: 'Active',
    department: 'Operations',
    position: 'Operations Manager',
    registeredDate: '2022-11-05',
    lastLogin: '2023-06-10'
  },
  {
    id: '204',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    role: 'User',
    status: 'Inactive',
    department: 'Logistics',
    position: 'Logistics Coordinator',
    registeredDate: '2023-03-10',
    lastLogin: '2023-05-15'
  },
  {
    id: '205',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    role: 'Admin',
    status: 'Active',
    department: 'IT',
    position: 'System Administrator',
    registeredDate: '2022-09-15',
    lastLogin: '2023-06-10'
  }
];

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [statusAction, setStatusAction] = useState<'activate' | 'deactivate' | null>(null);
  const [roleAction, setRoleAction] = useState<'user' | 'manager' | 'admin' | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    // Simulate API call to fetch users
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleStatusClick = (action: 'activate' | 'deactivate') => {
    handleMenuClose();
    setStatusAction(action);
    setStatusDialogOpen(true);
  };

  const handleRoleClick = (role: 'user' | 'manager' | 'admin') => {
    handleMenuClose();
    setRoleAction(role);
    setRoleDialogOpen(true);
  };

  const handleStatusConfirm = async () => {
    if (!selectedUser || !statusAction) return;
    
    setActionInProgress(true);
    
    try {
      // Simulate API call to update user status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user status in list
      setUsers(prev => prev.map(user => {
        if (user.id === selectedUser) {
          return {
            ...user,
            status: statusAction === 'activate' ? 'Active' : 'Inactive'
          };
        }
        return user;
      }));
      
      setStatusDialogOpen(false);
      setActionInProgress(false);
      setStatusAction(null);
    } catch (err) {
      console.error('Error updating user status:', err);
      setActionInProgress(false);
    }
  };

  const handleRoleConfirm = async () => {
    if (!selectedUser || !roleAction) return;
    
    setActionInProgress(true);
    
    try {
      // Simulate API call to update user role
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user role in list
      setUsers(prev => prev.map(user => {
        if (user.id === selectedUser) {
          return {
            ...user,
            role: roleAction.charAt(0).toUpperCase() + roleAction.slice(1)
          };
        }
        return user;
      }));
      
      setRoleDialogOpen(false);
      setActionInProgress(false);
      setRoleAction(null);
    } catch (err) {
      console.error('Error updating user role:', err);
      setActionInProgress(false);
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

  const handleRoleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterRole(event.target.value as string);
    setPage(0);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterStatus(event.target.value as string);
    setPage(0);
  };

  const filteredUsers = users.filter(user => {
    // Search term filter
    const matchesSearch = 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = !filterRole || user.role === filterRole;
    
    // Status filter
    const matchesStatus = !filterStatus || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return <AdminPanelSettingsIcon fontSize="small" />;
      case 'manager':
        return <SupervisorAccountIcon fontSize="small" />;
      default:
        return <PersonIcon fontSize="small" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === 'active' ? 'success' : 'default';
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', sm: '300px' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="role-filter-label">Role</InputLabel>
            <Select
              labelId="role-filter-label"
              value={filterRole}
              label="Role"
              onChange={handleRoleFilterChange as any}
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filterStatus}
              label="Status"
              onChange={handleStatusFilterChange as any}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
          >
            More Filters
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
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              {getInitials(user.firstName, user.lastName)}
                            </Avatar>
                            <Typography variant="body2">
                              {user.firstName} {user.lastName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            icon={getRoleIcon(user.role)}
                            label={user.role} 
                            color={getRoleColor(user.role) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status} 
                            color={getStatusColor(user.status) as any}
                            size="small"
                            variant={user.status === 'Active' ? 'filled' : 'outlined'}
                          />
                        </TableCell>
                        <TableCell>{user.registeredDate}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, user.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
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
          to={`/admin/users/${selectedUser}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit User</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick('activate')}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Activate</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick('deactivate')}>
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Deactivate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleRoleClick('user')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set as User</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleRoleClick('manager')}>
          <ListItemIcon>
            <SupervisorAccountIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set as Manager</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleRoleClick('admin')}>
          <ListItemIcon>
            <AdminPanelSettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set as Admin</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Email</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => !actionInProgress && setStatusDialogOpen(false)}
      >
        <DialogTitle>
          {statusAction === 'activate' ? 'Activate User' : 'Deactivate User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {statusAction === 'activate' 
              ? 'Are you sure you want to activate this user? They will be able to log in and use the system.'
              : 'Are you sure you want to deactivate this user? They will no longer be able to log in.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setStatusDialogOpen(false)} 
            disabled={actionInProgress}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleStatusConfirm} 
            color={statusAction === 'activate' ? 'success' : 'error'} 
            disabled={actionInProgress}
            autoFocus
          >
            {actionInProgress ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Role Update Dialog */}
      <Dialog
        open={roleDialogOpen}
        onClose={() => !actionInProgress && setRoleDialogOpen(false)}
      >
        <DialogTitle>
          Change User Role
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {roleAction === 'admin' 
              ? 'Are you sure you want to give this user admin privileges? They will have full access to the system.'
              : roleAction === 'manager'
              ? 'Are you sure you want to set this user as a manager? They will have access to equipment and booking management.'
              : 'Are you sure you want to set this user as a regular user? They will only have basic access.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setRoleDialogOpen(false)} 
            disabled={actionInProgress}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRoleConfirm} 
            color="primary" 
            disabled={actionInProgress}
            autoFocus
          >
            {actionInProgress ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminUsersPage;
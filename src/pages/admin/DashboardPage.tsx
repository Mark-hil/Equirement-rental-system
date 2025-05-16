import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import EquipmentIcon from '@mui/icons-material/Construction';
import BookingIcon from '@mui/icons-material/EventNote';
import UserIcon from '@mui/icons-material/People';
import AlertIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock data
const mockStats = {
  totalEquipment: 48,
  availableEquipment: 32,
  totalBookings: 124,
  pendingBookings: 8,
  totalUsers: 75,
  activeUsers: 42,
  revenue: {
    current: 12500,
    previous: 10200,
    percentChange: 22.5
  }
};

const mockRecentBookings = [
  {
    id: '1',
    equipmentName: 'Excavator XL2000',
    userName: 'John Smith',
    date: '2023-06-10',
    status: 'Approved'
  },
  {
    id: '2',
    equipmentName: 'Bulldozer B500',
    userName: 'Sarah Johnson',
    date: '2023-06-09',
    status: 'Pending'
  },
  {
    id: '3',
    equipmentName: 'Crane C3000',
    userName: 'Michael Brown',
    date: '2023-06-08',
    status: 'Approved'
  },
  {
    id: '4',
    equipmentName: 'Forklift F200',
    userName: 'Emily Davis',
    date: '2023-06-07',
    status: 'Cancelled'
  }
];

const mockAlerts = [
  {
    id: '1',
    message: 'Excavator XL2000 maintenance due in 3 days',
    severity: 'warning',
    date: '2023-06-10'
  },
  {
    id: '2',
    message: 'Bulldozer B500 has been reported as damaged',
    severity: 'error',
    date: '2023-06-09'
  },
  {
    id: '3',
    message: '8 new user registrations this week',
    severity: 'info',
    date: '2023-06-08'
  }
];

const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API calls to fetch dashboard data
    setTimeout(() => {
      setStats(mockStats);
      setRecentBookings(mockRecentBookings);
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Total Equipment
              </Typography>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <EquipmentIcon fontSize="small" />
              </Avatar>
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {stats.totalEquipment}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ color: 'success.main', display: 'flex', alignItems: 'center', mr: 1 }}>
                <CheckCircleIcon fontSize="small" />
              </Box>
              {stats.availableEquipment} available
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Total Bookings
              </Typography>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <BookingIcon fontSize="small" />
              </Avatar>
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {stats.totalBookings}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ color: 'warning.main', display: 'flex', alignItems: 'center', mr: 1 }}>
                <PendingIcon fontSize="small" />
              </Box>
              {stats.pendingBookings} pending approval
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Total Users
              </Typography>
              <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                <UserIcon fontSize="small" />
              </Avatar>
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {stats.totalUsers}
            </Typography>
            <Typography variant="body2">
              {stats.activeUsers} active in last 30 days
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Monthly Revenue
              </Typography>
              <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                <TrendingUpIcon fontSize="small" />
              </Avatar>
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              ${stats.revenue.current.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {stats.revenue.percentChange >= 0 ? (
                <Box component="span" sx={{ color: 'success.main', display: 'flex', alignItems: 'center', mr: 1 }}>
                  <TrendingUpIcon fontSize="small" />
                  +{stats.revenue.percentChange}%
                </Box>
              ) : (
                <Box component="span" sx={{ color: 'error.main', display: 'flex', alignItems: 'center', mr: 1 }}>
                  <TrendingDownIcon fontSize="small" />
                  {stats.revenue.percentChange}%
                </Box>
              )}
              vs last month
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Bookings</Typography>
              <Button component={Link} to="/admin/bookings" size="small">
                View All
              </Button>
            </Box>
            <Divider />
            <List>
              {recentBookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <ListItem
                    component={Link}
                    to={`/admin/bookings/${booking.id}`}
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BookingIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={booking.equipmentName}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {booking.userName}
                          </Typography>
                          {` — ${booking.date}`}
                        </>
                      }
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 
                            booking.status === 'Approved' ? 'success.main' :
                            booking.status === 'Pending' ? 'warning.main' :
                            booking.status === 'Cancelled' ? 'error.main' : 'text.secondary'
                        }}
                      >
                        {booking.status}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Alerts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Alerts & Notifications</Typography>
              <Button size="small">
                Mark All Read
              </Button>
            </Box>
            <Divider />
            <List>
              {alerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: 
                            alert.severity === 'error' ? 'error.main' :
                            alert.severity === 'warning' ? 'warning.main' :
                            'info.main'
                        }}
                      >
                        <AlertIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={alert.message}
                      secondary={alert.date}
                    />
                    <MoreVertIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'pointer' }} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
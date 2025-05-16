import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import RefreshIcon from '@mui/icons-material/Refresh';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EquipmentIcon from '@mui/icons-material/Construction';
import BookingIcon from '@mui/icons-material/EventNote';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import UserIcon from '@mui/icons-material/People';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data for reports
const mockRevenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16500 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 22500 }
];

const mockBookingsByCategory = [
  { category: 'Heavy Machinery', count: 45, percentage: 36 },
  { category: 'Lifting Equipment', count: 30, percentage: 24 },
  { category: 'Warehouse Equipment', count: 25, percentage: 20 },
  { category: 'Construction Equipment', count: 15, percentage: 12 },
  { category: 'Earthmoving Equipment', count: 10, percentage: 8 }
];

const mockTopEquipment = [
  { id: '101', name: 'Excavator XL2000', bookings: 24, revenue: 6000, utilization: 85 },
  { id: '103', name: 'Crane C3000', bookings: 18, revenue: 8100, utilization: 72 },
  { id: '102', name: 'Bulldozer B500', bookings: 15, revenue: 4500, utilization: 65 },
  { id: '105', name: 'Concrete Mixer CM100', bookings: 12, revenue: 1440, utilization: 48 },
  { id: '104', name: 'Forklift F200', bookings: 10, revenue: 1500, utilization: 42 }
];

const mockTopUsers = [
  { id: '201', name: 'John Smith', bookings: 12, totalSpent: 3600 },
  { id: '203', name: 'Michael Brown', bookings: 8, totalSpent: 4800 },
  { id: '202', name: 'Sarah Johnson', bookings: 7, totalSpent: 2100 },
  { id: '205', name: 'David Wilson', bookings: 5, totalSpent: 1250 },
  { id: '204', name: 'Emily Davis', bookings: 3, totalSpent: 900 }
];

// Mock monthly booking data
const mockMonthlyBookings = [
  { month: 'Jan', bookings: 18 },
  { month: 'Feb', bookings: 22 },
  { month: 'Mar', bookings: 30 },
  { month: 'Apr', bookings: 25 },
  { month: 'May', bookings: 35 },
  { month: 'Jun', bookings: 42 }
];

// Mock equipment utilization data
const mockUtilizationData = [
  { month: 'Jan', utilization: 58 },
  { month: 'Feb', utilization: 62 },
  { month: 'Mar', utilization: 70 },
  { month: 'Apr', utilization: 65 },
  { month: 'May', utilization: 75 },
  { month: 'Jun', utilization: 80 }
];

// Mock user activity data
const mockUserActivityData = [
  { month: 'Jan', newUsers: 8, activeUsers: 25 },
  { month: 'Feb', newUsers: 12, activeUsers: 30 },
  { month: 'Mar', newUsers: 15, activeUsers: 38 },
  { month: 'Apr', newUsers: 10, activeUsers: 42 },
  { month: 'May', newUsers: 18, activeUsers: 50 },
  { month: 'Jun', newUsers: 22, activeUsers: 65 }
];

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
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

const AdminReportsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    endDate: new Date()
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [bookingsByCategory, setBookingsByCategory] = useState<any[]>([]);
  const [topEquipment, setTopEquipment] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [monthlyBookings, setMonthlyBookings] = useState<any[]>([]);
  const [utilizationData, setUtilizationData] = useState<any[]>([]);
  const [userActivityData, setUserActivityData] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    averageBookingValue: 0,
    equipmentUtilization: 0
  });

  useEffect(() => {
    // Simulate API call to fetch report data
    setLoading(true);
    setTimeout(() => {
      setRevenueData(mockRevenueData);
      setBookingsByCategory(mockBookingsByCategory);
      setTopEquipment(mockTopEquipment);
      setTopUsers(mockTopUsers);
      setMonthlyBookings(mockMonthlyBookings);
      setUtilizationData(mockUtilizationData);
      setUserActivityData(mockUserActivityData);
      setSummaryStats({
        totalRevenue: 105500,
        totalBookings: 124,
        averageBookingValue: 851,
        equipmentUtilization: 68
      });
      setLoading(false);
    }, 1500);
  }, [reportType, dateRange]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReportTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReportType(event.target.value as string);
  };

  const handleDateChange = (name: string, date: Date | null) => {
    if (date) {
      setDateRange(prev => ({
        ...prev,
        [name]: date
      }));
    }
  };

  const handleRefresh = () => {
    // Simulate refreshing the report data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleDownload = (format: string) => {
    // In a real app, this would trigger a download of the report
    console.log(`Downloading report in ${format} format`);
  };

  // Chart data for revenue
  const revenueChartData = {
    labels: revenueData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: revenueData.map(item => item.revenue),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  // Chart data for bookings by category
  const categoryChartData = {
    labels: bookingsByCategory.map(item => item.category),
    datasets: [
      {
        label: 'Bookings by Category',
        data: bookingsByCategory.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart data for monthly bookings
  const bookingsChartData = {
    labels: monthlyBookings.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Bookings',
        data: monthlyBookings.map(item => item.bookings),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  };

  // Chart data for equipment utilization
  const utilizationChartData = {
    labels: utilizationData.map(item => item.month),
    datasets: [
      {
        label: 'Equipment Utilization %',
        data: utilizationData.map(item => item.utilization),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
        fill: true
      }
    ]
  };

  // Chart data for user activity
  const userActivityChartData = {
    labels: userActivityData.map(item => item.month),
    datasets: [
      {
        label: 'New Users',
        data: userActivityData.map(item => item.newUsers),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      },
      {
        label: 'Active Users',
        data: userActivityData.map(item => item.activeUsers),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    }
  };

  // Get the appropriate chart based on report type
  const getMainChart = () => {
    switch (reportType) {
      case 'revenue':
        return <Bar data={revenueChartData} options={chartOptions} />;
      case 'bookings':
        return <Bar data={bookingsChartData} options={chartOptions} />;
      case 'equipment':
        return <Line data={utilizationChartData} options={chartOptions} />;
      case 'users':
        return <Bar data={userActivityChartData} options={chartOptions} />;
      default:
        return <Bar data={revenueChartData} options={chartOptions} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="report-type-label">Report Type</InputLabel>
              <Select
                labelId="report-type-label"
                value={reportType}
                label="Report Type"
                onChange={handleReportTypeChange as any}
              >
                <MenuItem value="revenue">Revenue Report</MenuItem>
                <MenuItem value="bookings">Bookings Report</MenuItem>
                <MenuItem value="equipment">Equipment Utilization</MenuItem>
                <MenuItem value="users">User Activity</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="Start Date"
                value={dateRange.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="End Date"
                value={dateRange.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true
                  }
                }}
              />
            </Grid>
          </LocalizationProvider>
          
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload('pdf')}
                disabled={loading}
              >
                Export
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Revenue
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    ${summaryStats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +12.5% vs. previous period
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BookingIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Bookings
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    {summaryStats.totalBookings}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +8.2% vs. previous period
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EquipmentIcon sx={{ color: 'info.main', mr: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Equipment Utilization
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    {summaryStats.equipmentUtilization}%
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +5.3% vs. previous period
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Avg. Booking Value
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    ${summaryStats.averageBookingValue}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="error.main">
                      -2.1% vs. previous period
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Report Content */}
          <Paper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="report tabs"
                sx={{ px: 2 }}
              >
                <Tab icon={<BarChartIcon />} iconPosition="start" label="Charts" />
                <Tab icon={<TableChartIcon />} iconPosition="start" label="Data Tables" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {reportType === 'revenue' && 'Revenue Trends'}
                  {reportType === 'bookings' && 'Booking Statistics'}
                  {reportType === 'equipment' && 'Equipment Utilization'}
                  {reportType === 'users' && 'User Activity'}
                </Typography>
                
                <Box sx={{ height: 300, mb: 3 }}>
                  {getMainChart()}
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardHeader 
                        title="Bookings by Category" 
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        action={
                          <IconButton size="small">
                            <PieChartIcon />
                          </IconButton>
                        }
                      />
                      <Divider />
                      <CardContent sx={{ height: 250 }}>
                        <Pie data={categoryChartData} options={{ 
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                              labels: {
                                boxWidth: 15,
                                font: {
                                  size: 10
                                }
                              }
                            }
                          }
                        }} />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardHeader 
                        title="Monthly Revenue" 
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        action={
                          <IconButton size="small">
                            <BarChartIcon />
                          </IconButton>
                        }
                      />
                      <Divider />
                      <CardContent>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {revenueData.map((row) => (
                                <TableRow key={row.month}>
                                  <TableCell>{row.month}</TableCell>
                                  <TableCell align="right">${row.revenue}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardHeader 
                        title="Top Performing Equipment" 
                        titleTypographyProps={{ variant: 'subtitle1' }}
                      />
                      <Divider />
                      <CardContent sx={{ p: 0 }}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Equipment</TableCell>
                                <TableCell align="right">Bookings</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                                <TableCell align="right">Utilization</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {topEquipment.map((row) => (
                                <TableRow key={row.id}>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell align="right">{row.bookings}</TableCell>
                                  <TableCell align="right">${row.revenue}</TableCell>
                                  <TableCell align="right">{row.utilization}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardHeader 
                        title="Top Users" 
                        titleTypographyProps={{ variant: 'subtitle1' }}
                      />
                      <Divider />
                      <CardContent sx={{ p: 0 }}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="right">Bookings</TableCell>
                                <TableCell align="right">Total Spent</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {topUsers.map((row) => (
                                <TableRow key={row.id}>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell align="right">{row.bookings}</TableCell>
                                  <TableCell align="right">${row.totalSpent}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              startIcon={<PrintIcon />}
              variant="outlined"
            >
              Print Report
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              onClick={() => handleDownload('csv')}
            >
              Export CSV
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              onClick={() => handleDownload('pdf')}
            >
              Export PDF
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default AdminReportsPage;
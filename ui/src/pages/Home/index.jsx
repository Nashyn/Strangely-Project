import React from 'react';
import { Layout, message } from 'antd';

import {
  Button, Card, Avatar, Typography, Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import withNavbar from '../../resources/shared/hoc/navbar';
import GeoFetch from '../../components/molecules/geoFetch';

// const { Meta } = Card;
const { Sider, Content } = Layout;

const activities = [
  {
    title: 'Cooking',
    description: 'Join us for a delicious cooking session!',
    imageSrc: 'https://source.unsplash.com/800x600/?cooking',
  },
  {
    title: 'Travel',
    description: 'Explore the world with our travel community.',
    imageSrc: 'https://source.unsplash.com/800x600/?travel',
  },
  {
    title: 'Sports',
    description: 'Join us for an exciting sports event!',
    imageSrc: 'https://source.unsplash.com/800x600/?sports',
  },
  {
    title: 'Outdoor Activities',
    description: 'Experience nature with our outdoor activities group.',
    imageSrc: 'https://source.unsplash.com/800x600/?outdoor',
  },
];

const users = [
  { name: 'John Doe' },
  { name: 'Jane Smith' },
  { name: 'Michael Johnson' },
  { name: 'Emily Williams' },
  { name: 'Daniel Brown' },
  { name: 'Ava Jones' },
  { name: 'William Davis' },
  { name: 'Olivia Miller' },
  { name: 'Matthew Wilson' },
  { name: 'Sophia Taylor' },
  { name: 'Liam Anderson' },
];

function Home() {
  const handleLocationUpdate = (location) => {
    message.info(`${location.latitude}, ${location.longitude}`);
    // todo: needs to send to backend
  };
  // const [selectedCategory, setSelectedCategory] = useState(null);

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  // };

  return (
    <>
      <GeoFetch
        onLocationUpdate={handleLocationUpdate}
      />
      {/* <Layout> */}
      <Sider width={200} style={{ backgroundColor: '#f0f2f5' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            Events
          </Button>
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            Friends
          </Button>
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            Explore
          </Button>
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            Connect
          </Button>
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            User Profile
          </Button>
        </div>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Grid container justifyContent="center" spacing={2}>
          {activities.map(activity => (
            <Grid key={crypto.randomUUID()} item xs={12} sm={6} md={4} lg={3}>
              <Link to={`/posts/${activity.title.toLowerCase()}`}>
                <Card sx={{ maxWidth: 345 }}>
                  <img alt={activity.title} src={activity.imageSrc} style={{ width: '100%' }} />
                  <Typography gutterBottom variant="h5" component="div" style={{ padding: '16px' }}>
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ padding: '0 16px 16px' }}>
                    {activity.description}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Content>
      <Sider width={200} style={{ backgroundColor: '#f0f2f5' }}>
        <div style={{ padding: '16px' }}>
          {users.map(user => (
            <div key={crypto.randomUUID()} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Avatar>{user.name.charAt(0)}</Avatar>
              <Typography variant="body1" style={{ marginLeft: '8px' }}>
                {user.name}
              </Typography>
            </div>
          ))}
        </div>
      </Sider>
      {/* </Layout> */}
    </>

  );
}

export default withNavbar(Home);

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Grid, Typography, Card, CardContent, CardMedia,
// } from '@mui/material';
// import { v4 as randomUUID } from 'uuid';

// const posts = {
//   cooking: [
//     {
//       title: 'Caption 1 for the cooking activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?food',
//     },
//     {
//       title: 'Caption 2 for the cooking activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?meal',
//     },
//   ],
//   sports: [
//     {
//       title: 'Caption 1 for the sports activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?sports',
//     },
//     {
//       title: 'Caption 2 for the sports activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?exercise',
//     },
//   ],
//   travel: [
//     {
//       title: 'Caption 1 for the travel activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?travel',
//     },
//     {
//       title: 'Caption 2 for the travel activity.',
//       imageSrc: 'https://source.unsplash.com/800x600/?adventure',
//     },
//   ],
// };

// function PostPage() {
//   const { category } = useParams();

//   return (
//     <Grid container spacing={2} justifyContent="center" alignItems="center">
//       {(posts[category] || []).map(post => (
//         <Grid item key={randomUUID()}>
//           <Card sx={{ maxWidth: 345 }}>
//             <CardMedia
//               component="img"
//               height="140"
//               image={post.imageSrc}
//               alt={post.title}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {post.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {post.content}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// export default PostPage;

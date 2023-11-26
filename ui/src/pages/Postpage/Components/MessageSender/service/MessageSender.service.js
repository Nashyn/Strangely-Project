import axios from 'axios';
/* service */
import {
  postService,
} from '../../../../../services/urls';

export const createPost = payload => axios.post(postService.createPost, payload);

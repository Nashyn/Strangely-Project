import axios from 'axios';
/* service */
import {
  chatService,
} from '../../../services/urls';

export const getOrCreateMeAsUser = ({
  userName = '',
  phone_number = '',
  email = '',
}) => axios.get(chatService.getMeAsUser, {
  headers: {
    'project-id': import.meta.env.VITE_CHAT_PROJECT_ID,
    'user-name': userName || '',
    'user-secret': phone_number || '',
  },
})
  .catch(() => {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('username', userName);
    formdata.append('secret', phone_number);
    axios.post(chatService.createMeAsUser, formdata, {
      headers: {
        'private-key': import.meta.env.VITE_CHAT_PVT_KEY,
      },
    });
  });

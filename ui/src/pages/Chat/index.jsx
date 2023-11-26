/* eslint-disable no-console */
/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useSelector } from 'react-redux';
/* hoc */
import withNavbar from '../../resources/shared/hoc/navbar';
/* styles */
import styles from './Chat.module.scss';
/* service */
import { getOrCreateMeAsUser } from './service/Chat.service';

function Chat() {
  const chatRef = useRef();
  const userData = useSelector(state => state.loginSignupReducer.userData);

  useEffect(() => {
    getOrCreateMeAsUser(userData);
    if (chatRef.current) {
      chatRef.current.handleChatUpdate();
    }
  }, []);

  const handleChatUpdate = () => {
    // eslint-disable-next-line no-console
    console.log('Disconnecting...');
    chatRef.current.disconnect();

    // eslint-disable-next-line no-console
    console.log('Reconnecting...');
    setTimeout(() => {
      chatRef.current.connect();
      chatRef.current.getChats();
    }, 2000);
  };

  return (
    <div className={styles.chatContainer}>
      <ChatEngine
        ref={chatRef}
        offset={-4}
        projectID={import.meta.env.VITE_CHAT_PROJECT_ID}
        userName={userData?.userName || ''}
        userSecret={userData?.phone_number || ''}
        onEditChat={handleChatUpdate}
        onAddPerson={handleChatUpdate}
      />
    </div>
  );
}

export default withNavbar(Chat);

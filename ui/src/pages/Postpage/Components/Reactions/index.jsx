import React, { useEffect, useState } from 'react';
/* external imports */
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  LikeOutlined,
  DislikeOutlined,
  HeartOutlined,
} from '@ant-design/icons';
/* styles */
import styles from './Reactions.module.scss';
/* constants */
import {
  EMPTY_FUNCTION,
  EMPTY_STRING,
} from '../../../../resources/shared/global.constant';
/* service */
import {
  addLike,
  addDislike,
  addLove,
  removeLike,
  removeDislike,
  removeLove,
} from '../Post/service/Post.service';

function Reaction({
  postId = false,
  likeCount = EMPTY_STRING,
  dislikeCount = EMPTY_STRING,
  loveCount = EMPTY_STRING,
  fetchAllPosts = EMPTY_FUNCTION,
}) {
  const [liked, setLiked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLiked(likeCount > 0);
    setDisliked(dislikeCount > 0);
    setLoved(loveCount > 0);
  }, []);
  const handleLike = () => {
    if (dislikeCount) {
      removeDislike(postId);
    }
    if (!likeCount) {
      addLike(postId);
    } else {
      removeLike(postId);
    }
    setTimeout(() => {
      fetchAllPosts();
    }, 1000);
  };

  const handleLove = () => {
    if (dislikeCount) {
      removeDislike(postId);
    }

    if (!loveCount) {
      addLove(postId);
    } else {
      removeLove(postId);
    }
    setTimeout(() => {
      fetchAllPosts();
    }, 1000);
  };

  const handleDislike = () => {
    if (likeCount) {
      removeLike(postId);
    }

    if (loveCount) {
      removeLove(postId);
    }

    if (!dislikeCount) {
      addDislike(postId);
    } else {
      removeDislike(postId);
    }
    setTimeout(() => {
      fetchAllPosts();
    }, 1000);
  };
  return (
    <div className={styles.postOptions}>
      <div
        role="button"
        tabIndex="0"
        className={styles.postOption}
        onClick={handleLike}
      >
        <LikeOutlined
          style={{
            color: liked
              ? 'green'
              : 'gray',
            paddingRight: '1rem',
          }}
        />
        <span> {likeCount} Like</span>
      </div>
      <div
        role="button"
        tabIndex="0"
        className={styles.postOption}
        onClick={handleDislike}
      >
        <DislikeOutlined
          style={{
            color: disliked
              ? 'blue'
              : 'gray',
            paddingRight: '1rem',
          }}
        />
        <span>{dislikeCount} Dislike </span>
      </div>
      <div
        role="button"
        tabIndex="0"
        className={styles.postOption}
        onClick={handleLove}
      >
        <HeartOutlined
          style={{
            color: loved
              ? 'red'
              : 'gray',
            paddingRight: '1rem',
          }}
        />
        <span>{loveCount} Love</span>
      </div>
      <div
        role="button"
        tabIndex="0"
        className={styles.postOption}
        onClick={() => navigate('/chat')}
      >
        <span>Chat 💬 </span>
      </div>
    </div>
  );
}

Reaction.propTypes = {
  postId: PropTypes.any.isRequired,
  likeCount: PropTypes.string.isRequired,
  dislikeCount: PropTypes.string.isRequired,
  loveCount: PropTypes.string.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
};

export default Reaction;

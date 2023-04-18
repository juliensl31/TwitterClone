import React from 'react';
import Comment from './Comment';

function Post(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Comment user={props.user} />
    </div>
  );
}

export default Post;

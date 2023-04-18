import React, { useState } from 'react';

function Comment(props) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      author: props.user,
      text: commentText,
      date: new Date(),
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div>
      <h2>Leave a comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="commentText">Comment:</label>
          <textarea
            id="commentText"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.date.toString()}>
            <strong>{comment.author}</strong> - {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;

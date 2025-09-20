import React, { useState } from "react";
import "./Comments.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Comments = ({ comments: initialComments, postId, updateComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [showAllComments, setShowAllComments] = useState(false); // Add state for showAllComments

  const onComment = (newComment) => {
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    updateComments(postId, updatedComments);
  };

  const updateComment = (id, updatedNestedComments) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, comments: updatedNestedComments } : comment
    );
    setComments(updatedComments);
    updateComments(postId, updatedComments);
  };

  return (
    <div className="comments-wall">
      <CommentInput postId={postId} onComment={onComment} />
      <div className="p-comment-d-block">
        {showAllComments ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              updateComment={updateComment}
            />
          ))
        ) : (
          comments.slice(0, 3).map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              updateComment={updateComment}
            />
          ))
        )}
        {comments.length > 3 && !showAllComments && (
          <button
            className="show-all-comments"
            onClick={() => setShowAllComments(true)}
          >
            Show All Comments
          </button>
        )}
      </div>
    </div>
  );
};

const CommentItem = ({ comment, updateComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [nestedComments, setNestedComments] = useState(comment.comments);

  const onComment = (newComment) => {
    const updatedComments = [newComment, ...nestedComments];
    setNestedComments(updatedComments);
    updateComment(comment.id, updatedComments);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const calTimeDiff = (dateTime) => {
    const currTime = new Date();
    const difference = currTime.getTime() - dateTime.getTime();
    const minutes = Math.round(difference / (1000 * 60));
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
        const hours = Math.round(minutes / 60);
        return `${hours} hours ago`;
    } else if (minutes < 10080) {
        const days = Math.round(minutes / 1440);
        return `${days} days ago`;
    } else if (minutes < 43829.1) {
        const weeks = Math.round(minutes / 10080);
        return `${weeks} weeks ago`;
    } else {
        const years = Math.round(minutes / 525600);
        return `${years} years ago`;
    }
};

  return (
    <div className="display-parent-comments">
      <div className="rep-box">
        <div className="comment-user-info">
          <img src={comment.profilePic} alt="Profile" className="profile-picture" />
          <div className="comment-header">
            <span className="username">{comment.userName}</span>
            <div className="extra-info">
              <span className="info">{comment.collegeName} .</span>
              <span style={{marginLeft:'2px'}} className="info"> {calTimeDiff(comment.dateTime)}</span>
            </div>
          </div>
        </div>
        <span style={{marginLeft:'15px'}}>{comment.body}</span>
        <div className="rep-btns">
          {isReplying ? (
            <button className="btn-rep" onClick={() => setIsReplying(false)}>Cancel</button>
          ) : (
            <button className="btn-rep" onClick={() => setIsReplying(true)}>Reply</button>
          )}
          {comment.comments.length > 0 && (
            <button className="btn-view-replies" onClick={toggleReplies}>
              {showReplies ? "Hide Replies" : "View Replies"}
            </button>
          )}
        </div>
      </div>
      {isReplying && <CommentInput postId={comment.id} onComment={onComment} />}
      {showReplies && (
        <div className="replies">
          {nestedComments.map((nestedComment, index) => (
            <CommentItem
              key={index}
              comment={nestedComment}
              updateComment={updateComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const CommentInput = ({ onComment, postId }) => {
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = () => {
    if (commentBody.trim() !== "") {
      onComment({ id: Date.now(), body: commentBody, comments: [] });
      setCommentBody("");
    }
  };

  return (
    <div className="parent-wall">
      <input
        value={commentBody}
        onChange={(event) => setCommentBody(event.target.value)}
        placeholder="Write a comment..."
        type="text"
        className="parent-comment"
      />
      <button onClick={handleSubmit} className="post-comment">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

CommentInput.propTypes = {
  onComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  updateComment: PropTypes.func.isRequired,
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};


export default Comments;

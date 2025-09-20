import React, { useState, useEffect } from 'react';
import './MyUni.css';
import { useParams } from 'react-router';
import HeroSection from '../../Constants/HeroSection/HeroSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Comments from '../../Constants/Comments/Comments';
import colleges from '../HomePage/Colleges';
import posts from '../HomePage/Samples';

const MyUniPage = () => {
  const [collegeData, setCollegeData] = useState({});
  const [collegePosts, setCollegePosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { collegeId } = useParams();
  
  useEffect(() => {
    console.log("collegeId from route:", collegeId);
    const college = colleges.find(col => col.id === parseInt(collegeId.trim()));
    console.log("Selected college:", college);
    if (college) {
      setCollegeData(college);
      const relatedPosts = posts.filter(post => {
        console.log("post.collegeId:", post.collegeId);
        console.log("Comparison result:", post.collegeId === collegeId.trim());
        return post.collegeId === collegeId.trim();
      });
      console.log("Related posts:", relatedPosts);
      setCollegePosts(relatedPosts);
      setLikeCounts(relatedPosts.map(post => post.Likes));
      setShowCommentBox(Array(relatedPosts.length).fill(false));
      setLikedPosts(Array(relatedPosts.length).fill(false));
    }
  }, [collegeId]);
  
  
  

  const handleLike = (index) => {
    const newLikeCounts = [...likeCounts];
    const newLikedPosts = [...likedPosts];

    if (newLikedPosts[index]) {
      newLikeCounts[index]--;
    } else {
      newLikeCounts[index]++;
    }

    newLikedPosts[index] = !newLikedPosts[index];

    setLikeCounts(newLikeCounts);
    setLikedPosts(newLikedPosts);
  };

  const toggleCommentBox = (index) => {
    const newShowCommentBox = [...showCommentBox];
    newShowCommentBox[index] = !newShowCommentBox[index];
    setShowCommentBox(newShowCommentBox);
  };

  const updateComments = (postId, newComments) => {
    setCollegePosts(
      collegePosts.map((post) =>
        post.id === postId ? { ...post, comments: newComments } : post
      )
    );
  };

  const calTimeDiff = (dateTime) => {
    const currTime = new Date();
    const difference = currTime.getTime() - new Date(dateTime).getTime();
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
    <div>
      <HeroSection />
      <div className="flex-row">
        <div className="sub-nav">
          <div className="college-info">
            <div className='college-info-header'>
                <img src={collegeData.img} alt="Logo"/>
                <h2>{collegeData.name}</h2>
                <hr style={{width:'90%'}} />
            </div>
            <div className="overview flex-col centre">
              <h5>Overview</h5>
              <p>{collegeData.description}</p>
            </div>
            <div className="academics flex-col centre">
              <h5>Academics</h5>
              <p>{collegeData.academics}</p>
            </div>
            <div className="admissions flex-col centre">
              <h5>Admissions</h5>
              <p>{collegeData.admissions}</p>
            </div>
            <div className="campus-life flex-col centre">
              <h5>Campus Life</h5>
              <p>{collegeData.campusLife}</p>
            </div>
            <div className="resources flex-col centre">
              <h5>Resources</h5>
              <p>{collegeData.resources}</p>
            </div>
          </div>
        </div>

        <div className="view">
          <div className="college-title">
            <h4>{collegeData.name} Posts</h4>
          </div>
          <hr />
          <div className="wall">
            {collegePosts.map((content, index) => {
              const {
                id,
                userName,
                title,
                dateTime,
                profilePic,
                body,
                comments,
              } = content;
              return (
                <div key={`posts-${index}`} className="wall-box">
                  <div className="wall-header">
                    <img src={profilePic} alt="Logo" className="profile-picture" />
                    <div className="wall-info">
                      <div className="wall-info-upper">
                        <h5>{title}</h5>
                        <p>. {calTimeDiff(dateTime)}</p>
                      </div>
                      <div className="wall-info-lower">
                        <p>{userName} .</p>
                        <p>{collegeData.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="wall-content">
                    <p>{body}</p>
                  </div>
                  <div className="post-buttons">
                    <div>
                      <button
                        className={`like-button ${likedPosts[index] ? 'liked' : ''}`}
                        onClick={() => handleLike(index)}
                      >
                        <FontAwesomeIcon icon={faHeart} style={{ margin: '3px' }} />
                        {likeCounts[index]}
                      </button>
                    </div>
                    <div>
                      <button
                        className="action-button"
                        onClick={() => toggleCommentBox(index)}
                      >
                        <FontAwesomeIcon icon={faComment} style={{ color: '#068FFF', margin: '3px' }} />
                        {comments.length}
                      </button>
                    </div>
                  </div>
                  {showCommentBox[index] && (
                    <Comments
                      comments={comments}
                      postId={id}
                      updateComments={updateComments}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyUniPage;

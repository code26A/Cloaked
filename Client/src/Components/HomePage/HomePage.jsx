import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HeroSection from "../../Constants/HeroSection/HeroSection";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNinja,
  faCirclePlus,
  faHeart,
  faComment,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import initialPosts from "./Samples"; // Import the initialPosts array
import Comments from "../../Constants/Comments/Comments";
import collegesData from "./Colleges";
import filters from "./Filters";

const HomePage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [likeCounts, setLikeCounts] = useState(
    initialPosts.map((post) => post.Likes)
  );
  const [showCommentBox, setShowCommentBox] = useState(
    Array(initialPosts.length).fill(false)
  );
  const [likedPosts, setLikedPosts] = useState(initialPosts.map(() => false));
  const [colleges, setColleges] = useState([]);
  const [filterTypes, setfilterTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    setColleges(collegesData);
    setfilterTypes(filters);
  }, []); 

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
    // Update only the comments of the post with the given postId
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: newComments } : post
      )
    );
  };

  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <HeroSection />
      <div className="flex-row">
        <div className="sub-nav">
          <div className="sub-nav-item">
            <h4>College Directory</h4>
              <input
                type="text"
                placeholder="Search for a college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px', padding: '7px', width: '90%', borderRadius:'20px', marginLeft: '8px' }}
              />
            <div className="college-category">
                <ul className="category-list">
                  {filteredColleges.map((college, index) => (
                    <li key={index}>
                      <div className="college-list">
                        <img className="college-img" src={college.img} alt="" style={{marginRight:'5px'}} />
                          <Link to={`/myuni/${college.id}`}>
                            <p>{college.name}</p>
                          </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
          <div className="sub-nav-item">
            <h4>Featured Categories</h4>
            <div className="college-category" >   
              <ul className="category-list">
                  {filterTypes.map((filter, index) => (
                    <li key={index}>
                      <div className="feature-list">
                        <FontAwesomeIcon icon={faHashtag} style={{marginRight:'4px'}} ></FontAwesomeIcon>
                        <p>{filter.name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="view">
          <div className="top-title">
            <FontAwesomeIcon icon={faUserNinja} style={{ fontSize: "20px" }} />
            <h4>Ninja Post: Vanish & Share</h4>
          </div>
          <div className="post">
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{ margin: "0 10px", fontSize: "25px", color: "#3ABEF9" }}
            />
            <p>Start a post...</p>
          </div>
          <hr />
          <div className="wall">
            {posts.map((content, index) => {
              const {
                id,
                userName,
                collegeName,
                title,
                dateTime,
                profilePic,
                body,
                comments,
              } = content;
              return (
                <div key={`posts-${index}`} className="wall-box">
                  <div className="wall-header">
                    <img
                      src={profilePic}
                      alt="Logo"
                      className="profile-picture"
                    />
                    <div className="wall-info">
                      <div className="wall-info-upper">
                        <h5>{title}</h5>
                        <p>. {calTimeDiff(dateTime)}</p>
                      </div>
                      <div className="wall-info-lower">
                        <p>{userName} .</p>
                        <p>{collegeName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="wall-content">
                    <p>{body}</p>
                  </div>
                  <div className="post-buttons">
                    <div>
                      <button
                        className={`like-button ${
                          likedPosts[index] ? "liked" : ""
                        }`}
                        onClick={() => handleLike(index)}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ margin: "3px" }}
                        />
                        {likeCounts[index]}
                      </button>
                    </div>
                    <div>
                      <button
                        className="action-button"
                        onClick={() => toggleCommentBox(index)}
                      >
                        <FontAwesomeIcon
                          icon={faComment}
                          style={{ color: "#068FFF", margin: "3px" }}
                        />
                        {comments.length}
                      </button>
                    </div>
                  </div>
                  {/* Pass the comments of the current post and its postId to the Comments component */}
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

export default HomePage;

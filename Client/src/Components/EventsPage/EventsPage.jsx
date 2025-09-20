import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCirclePlus,
  faCalendarPlus,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

import './EventsPage.css'
import './Events'
import './../HomePage/Colleges'
import events from './Events';
import collegesData from './../HomePage/Colleges';

const EventsPage = () => {
    const [filters, setFilters] = useState({
        event_name: '',
        college_name: '',
        category: '',
        startDate: ''
    });

    const [likeCounts, setLikeCounts] = useState(events.map(event => event.likes));
    const [likedPosts, setLikedPosts] = useState(events.map(() => false));
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filteredEvents = events.filter((event) => {
        return (
            (filters.event_name === '' || event.event_name.toLowerCase().includes(filters.event_name.toLowerCase())) &&
            (filters.college_name === '' || event.college_name.toLowerCase().includes(filters.college_name.toLowerCase())) &&
            (filters.category === '' || event.category.some(cat => cat.toLowerCase().includes(filters.category.toLowerCase()))) &&
            (filters.startDate === '' || new Date(event.startDate) >= new Date(filters.startDate))
        );
    });

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

      const handleLike = (index) => {
        const newLikeCounts = [...likeCounts];
        const newLikedPosts = [...likedPosts];

        // Toggle like state
        newLikedPosts[index] = !newLikedPosts[index];

        // Adjust like count based on like state
        if (newLikedPosts[index]) {
            newLikeCounts[index]++;
        } else {
            newLikeCounts[index]--;
        }

        setLikeCounts(newLikeCounts);
        setLikedPosts(newLikedPosts);
    };
    
    const addToCalendar = (event) => {
        
        const eventExists = displayedEvents.some(e => e.id === event.id);

        
        if(!eventExists) {
            console.log('Adding event:', event);
            const updatedEvents = [...displayedEvents, event].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            setDisplayedEvents(updatedEvents);
        }
    }

    const calculateDaysLeft = (startDate) => {
        const today = new Date();
        const evenDate = new Date(startDate);
        const timeDiff = evenDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysLeft;    
    }

    const handleExpandClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };


    return(
        <div>
            <div className="top-container">
                <h1 className="heading">Upcoming Popular Events</h1>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                >
                    <SwiperSlide>
                    <img src={'/Images/event1.png'} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={'/Images/event2.png'} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={'/Images/event3.png'} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={'/Images/event4.png'} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={'/Images/event5.png'} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={'/Images/event6.png'} alt="slide_image" />
                    </SwiperSlide>

                    <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>
            <div className="main flex-row">
                <div className="filters">
                    <div className="filters-header">
                        <h4>FILTERS</h4> 
                        <hr style={{'marginTop': '5px'}} />        
                    </div>
                    <div className="search-event">
                        <label className="event-label">Search by Events</label>
                        <input className='event-search' name='event_name' type="text" placeholder='Type To search Event' value={filters.event_name} onChange={handleInputChange}/>
                    </div>
                    <div className="search-category">
                        <label className="category-search">Filter By Categories</label>
                        <select className='event-search' name="category" value={filters.category} onChange={handleInputChange} id="">
                            <option value="">Select Category</option>
                            <option value="Workshops">Workshops</option>
                            <option value="Cultural-Fest">Cultural Events</option>
                            <option value="Sports Events">Sports Events</option>
                            <option value="Gaming Events">Gaming Events</option>
                            <option value="Fashion Events">Fashion Events</option>
                            <option value="Technical-Event">Technical Fests</option>
                            <option value="Hackathon">Hackathons</option>
                            <option value="CC-event">Competitive Coding Event</option>
                            <option value="Music-Event">Music Events</option>
                            <option value="Comedy Events">Comedy Events</option>
                        </select>
                    </div>
                    <div className="search-college">
                        <label className="college-search">Search By College</label>
                        <input className='event-search' name='college_name' type="text" placeholder='Type To search College' value={filters.college_name} onChange={handleInputChange}/>
                    </div>
                    
                    <div className="search-date">
                        <label className="date-search">Filter By Date</label>
                        <input className='event-search' type="date" name='startDate' value={filters.startDate} onChange={handleInputChange} />
                    </div>
                       
                </div>
                <div className="all-events">
                        {filteredEvents.map((event) => {
                            const college = collegesData.find(college => college.name === event.college_name);
                            const originalIndex = events.findIndex(e => e.id === event.id);
                            return (
                                <div className='event' key={event.id}>
                                    <div className="event-header">
                                        <div className='header-info'>
                                            {college && <img src={college.img} alt={`${event.college} logo`} className="college-logo" />}
                                            <div className="flex-col">
                                                <div className="flex-row" style={{'margin':'0'}}>
                                                    <h3>{event.college_name}</h3>
                                                    <p className='event-time'>. {calTimeDiff(event.postDate)}</p>
                                                </div>
                                                <p className='event-categories'>{'#' + event.category.join(' #')}</p>
                                            </div>
                                        </div>
                                        <div className="expand-event">
                                            <button onClick={() => handleExpandClick(event)} className='full-event-view'><FontAwesomeIcon icon={faCircleInfo} /></button>
                                        </div>
                                    </div>
                                    <div className="poster-container">
                                        <img className='event-poster' src={event.event_poster} alt={event.event_name} />
                                    </div> 
                                    <div className="event-footer flex-row">
                                        <button className={`like-event ${likedPosts[originalIndex] ? "liked" : ""}`} onClick={() => handleLike(originalIndex)}>
                                            <FontAwesomeIcon icon={faHeart} /> {likeCounts[originalIndex]}
                                        </button>   
                                        <button onClick={() => addToCalendar(event)} className='event-interest' id='addToCal'><FontAwesomeIcon icon={faCalendarPlus}/></button>
                                    </div>      
                                </div>

                            );
                        })}
                        {isModalOpen && selectedEvent && (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="modal-poster-container">
                                        <img className='modal-poster' src={selectedEvent.event_poster} alt={selectedEvent.event_name} />
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-header">
                                            <span className='close-button' onClick={handleCloseModal} >&times;</span>
                                            <div className="modal-heading flex-col">
                                                <h2>{selectedEvent.event_name}</h2>
                                                <p>by</p>
                                                <h6>{selectedEvent.college_name}</h6>
                                            </div>
                                        </div>
                                        <div className="modal-main-content">
                                            <p className='opening-text' >Come and join us as we launch and celebrate our annual event</p>
                                            <p className='from-to' >FROM</p>
                                            {selectedEvent.startDate && (
                                                <p className='date'>{new Date(selectedEvent.startDate).toLocaleDateString()}</p>
                                            )}
                                            <p className='from-to' >TO</p>
                                            {selectedEvent.endDate && (
                                                <p className='date'>{new Date(selectedEvent.endDate).toLocaleDateString()}</p>
                                            )}
                                            <p className='about'>{selectedEvent.event_name} is about {selectedEvent.event_about}</p>
                                            <div><hr className='modal-hr'/></div>
                                            <p className='sign-off'>SEE YOU THERE!</p>
                                            <div><hr className='modal-hr'/></div>
                                            <p className='modal-info'>For more information check out</p>
                                            <p className='event-website'>{selectedEvent.event_site}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                
                <div className="my-events">
                    <div className="create-event">
                        <FontAwesomeIcon icon={faCirclePlus} style={{ 'fontSize': "20px", 'color' : 'red'}} className='create-my-event'/> 
                        <p className='create-my-event'> Promote Your College Event.</p>
                    </div>
                    <div className="line-break"><hr /></div>
                    <div className="my-events-header">
                        <h3>Your Schedule</h3>
                    </div>                   
                    {displayedEvents.length === 0 ? (
                        <div className="no-events">
                            <p>You have no Upcoming Events!</p>
                            <p className='add-event-info'>Add Events by clicking the calendar button.</p>
                        </div>      
                    ): (
                        displayedEvents.map(event => {
                            const daysLeft = calculateDaysLeft(event.startDate);
                            if(daysLeft >= 0){
                                return (
                                    <div className='upcoming-events' key={event.id}>
                                        <p className='upcoming-event-heading'><strong>{event.event_name}</strong> . <span className='event-college'>{event.college_name}</span></p>
                                        <p className='event-categories upcoming-cat'>{'#' + event.category.join(' #')}</p>
                                        <p className='daysLeft'>{daysLeft === 0 ? 'Today' : `${daysLeft} days left`}</p>
                                    </div>
                                );
                            }
                            else {
                                return null;
                            }
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventsPage
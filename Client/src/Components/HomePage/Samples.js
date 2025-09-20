const initialPosts = [
    {
        id: 1,
        userName: 'Anonymous1',
        collegeName: 'IIT Kanpur',
        collegeId: '2',
        title: 'Crazy kia re',
        dateTime: new Date("2024-06-03T12:00:00"),
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque tortor eget libero sodales, sit amet viverra augue lacinia. Phasellus mollis non massa sed fermentum.',
        profilePic: "/Images/accenture.png",
        Likes: 512,
        comments: []
    },
    {
        id: 2,
        userName: 'Anonymous2',
        collegeName: 'MNNIT Allahabad',
        collegeId: '1',
        title: 'Sprinklr Offer Revoked',
        dateTime: new Date("2024-06-02T08:30:00"),
        body: 'Integer pharetra mauris pulvinar metus molestie, in varius ligula commodo. Proin eu dolor lacus. Nullam venenatis arcu in elit maximus, id volutpat est aliquam.',
        profilePic: "/Images/google.png",
        Likes: 324,
        comments: [
            {
                id: 1,
                userName: 'Anonymous4',
                profilePic: "/Images/1.jpg",
                dateTime: new Date("2024-06-03T12:00:00"),
                collegeName: 'MNNIT Allahabad',
                body: 'This is a terrible situation!',
                comments: [
                    {
                        id: 2,
                        userName: 'Anonymous5',
                        profilePic: "/Images/2.jpg",
                        dateTime: new Date("2024-06-03T12:00:00"),
                        collegeName: 'MNNIT Allahabad',
                        body: 'I agree, it is quite bad.',
                        comments: [
                            {
                                id: 3,
                                userName: 'Anonymous6',
                                profilePic: "/Images/1.jpg",
                                dateTime: new Date("2024-06-03T12:00:00"),
                                collegeName: 'MNNIT Allahabad',
                                body: 'What can we do about it?',
                                comments: [
                                    {
                                        id: 4,
                                        userName: 'Anonymous7',
                                        profilePic: "/Images/3.jpg",
                                        dateTime: new Date("2024-06-03T12:00:00"),
                                        collegeName: 'MNNIT Allahabad',
                                        body: 'We should raise awareness.',
                                        comments: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 5,
                        userName: 'Anonymous8',
                        profilePic: "/Images/2.jpg",
                        dateTime: new Date("2024-06-03T12:00:00"),
                        collegeName: 'MNNIT Allahabad',
                        body: 'The company should reconsider.',
                        comments: []
                    }
                ]
            },
            {
                id: 6,
                userName: 'Anonymous9',
                profilePic: "/Images/1.jpg",
                dateTime: new Date("2024-06-03T12:00:00"),
                collegeName: 'MNNIT Allahabad',
                body: 'This has happened before.',
                comments: [
                    {
                        id: 7,
                        userName: 'Anonymous10',
                        profilePic: "/Images/3.jpg",
                        dateTime: new Date("2024-06-03T12:00:00"),
                        collegeName: 'MNNIT Allahabad',
                        body: 'Yes, it seems to be a trend.',
                        comments: []
                    },
                    {
                        id: 8,
                        userName: 'Anonymous11',
                        profilePic: "/Images/2.jpg",
                        dateTime: new Date("2024-06-03T12:00:00"),
                        collegeName: 'MNNIT Allahabad',
                        body: 'We need to take action.',
                        comments: [
                            {
                                id: 9,
                                userName: 'Anonymous12',
                                profilePic: "/Images/1.jpg",
                                dateTime: new Date("2024-06-03T12:00:00"),
                                collegeName: 'MNNIT Allahabad',
                                body: 'What kind of action?',
                                comments: [
                                    {
                                        id: 10,
                                        userName: 'Anonymous13',
                                        profilePic: "/Images/3.jpg",
                                        dateTime: new Date("2024-06-03T12:00:00"),
                                        collegeName: 'MNNIT Allahabad',
                                        body: 'Organizing a protest could work.',
                                        comments: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        userName: 'Anonymous3',
        collegeName: 'MNNIT Allahabad',
        collegeId: '1',
        title: 'Atlassian Offer Revoked',
        dateTime: new Date("2024-06-03T09:00:00"),
        body: 'Praesent in fermentum justo. Aenean vulputate, enim non venenatis ullamcorper, risus tortor vulputate lorem, quis pulvinar nunc neque ac leo.',
        profilePic: "/Images/adobe.png",
        Likes: 20,
        comments: []
    }
];

export default initialPosts;

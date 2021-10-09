let videos = [
  {
    title: 'First Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 1,
    id: 1,
  },
  {
    title: 'Second Video',
    rating: 2,
    comments: 5,
    createdAt: '5 minutes ago',
    views: 29,
    id: 2,
  },
  {
    title: 'Third Video',
    rating: 4,
    comments: 10,
    createdAt: '3 minutes ago',
    views: 11,
    id: 3,
  },
];
export const handleHome = (req, res) => {
  const fakeUser = {
    name: 'jong',
    status: true,
  };

  res.render('home', { pageTitle: 'Home', fakeUser, videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render('watch', { pageTitle: 'Watching ' + video.title, video });
};
export const edit = (req, res) => {
  res.send('Edit videos');
};

export const search = (req, res) => res.send('search videos');
export const upload = (req, res) => res.send('upload videos');
export const deleteVideo = (req, res) => res.send('Delete videos');

import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    console.error(error);
    res.render('server-error');
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  res.render('edit', { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload video' });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('upload', { pageTitle: 'Upload video', errorMessage: error._message });
  }
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  res.redirect('/');
};

export const search = (req, res) => res.send('search videos');
export const upload = (req, res) => res.send('upload videos');

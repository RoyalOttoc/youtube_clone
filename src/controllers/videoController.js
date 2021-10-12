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
  return res.render('watch', { pageTitle: 'Watching', video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render('edit', { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
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
      hashtags: hashtags.split(',').map(hashtag => `#${hashtag}`),
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('upload', { pageTitle: 'Upload video', errorMessage: error._message });
  }
};

export const search = (req, res) => res.send('search videos');
export const upload = (req, res) => res.send('upload videos');
export const deleteVideo = (req, res) => res.send('Delete videos');

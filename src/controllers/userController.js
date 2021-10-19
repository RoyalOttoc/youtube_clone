import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const pageTitle = 'Join';
  const usernameExists = await User.exists({ username });
  const emailExists = await User.exists({ email });
  if (password !== password2) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'Password confirmation does not match' });
  }
  if (usernameExists) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'This username is already taken.' });
  }
  if (emailExists) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'This email is already taken.' });
  }
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  res.redirect('/login');
};

export const handleEdit = (req, res) => res.send('Edit users');
export const login = (req, res) => res.send('Login');
export const handledelete = (req, res) => res.send('Delete');
export const logout = (req, res) => res.send('Logout');
export const see = (req, res) => res.send('See user');

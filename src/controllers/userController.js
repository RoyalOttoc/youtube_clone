import User from '../models/User';
import bcrypt from 'bcrypt';

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

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .render('login', { pageTitle: 'Login', errorMessage: 'An account with this username does not exist' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render('login', { pageTitle: 'Login', errorMessage: 'Wrong password' });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect('/');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

export const handleEdit = (req, res) => res.send('Edit users');
export const handledelete = (req, res) => res.send('Delete');

export const see = (req, res) => res.send('See user');

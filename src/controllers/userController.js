import User from '../models/User';
import fetch from 'node-fetch';
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

  const user = await User.findOne({ username, socialOnly: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  const fianlUrl = `${baseUrl}?${params}`;
  return res.redirect(fianlUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const fianlUrl = `${baseUrl}?${params}`;
  const response = await fetch(fianlUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  if ('access_token' in data) {
    const { access_token } = data;
    const apiUrl = 'https://api.github.com';
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(email => email.primary === true && email.verified === true);
    if (!emailObj) {
      res.redirect('/login');
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        location: userData.location,
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    res.redirect('/login');
  }
};

export const getEdit = (req, res) => {
  return res.render('edit-profile', { pageTitle: 'Edit Profile' });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username, location },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true },
  );
  req.session.user = updatedUser;
  return res.redirect('/users/edit');
};

export const handledelete = (req, res) => res.send('Delete');

export const see = (req, res) => res.send('See user');

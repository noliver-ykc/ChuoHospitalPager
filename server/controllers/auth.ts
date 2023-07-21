import express, { Request, Response } from 'express';

const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_APP_ID;

const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, phoneNumber} = req.body;

    //generate rand ids and then hash them befre passing to frontend
    const userId = crypto.randomBytes(16).toString('hex');
    const serverClient = connect(api_key, api_secret, api_id);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber})


  } catch (error) {

    res.status(500).json({message: error})
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body;
    const serverClient = connect(api_key, api_secret, api_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    //query all the users from the database to see if match
    const { users } = await client.queryUsers({name: username});

    if(!users.length) return res.status(400).json({message: 'User not found'});
    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if(success) {
      res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
    } else {
      res.status(500).json({message: 'incorrect password'});
    }
  } catch (error) {
    res.status(500).json({message: error})
  }
};


module.exports = { signup, login }

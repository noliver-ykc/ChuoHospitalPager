import express, { Request, Response } from 'express';
const {connect} = require('getstream')

const signup = (req: Request, res: Response) => {
  try {
    const { fullName, username, password, phoneNumber} = req.body;



  } catch (error) {

    res.status(500).json({message: error})
  }
};
const login = (req: Request, res: Response) => {
  try {

  } catch (error) {
    res.status(500).json({message: error})
  }
};


module.exports = { signup, login }

const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      firstName: {
        type: String,
        required: [true, 'First name cannot be blank!'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long!'],
        maxlength: [50, 'First name must be less than 50 characters long!']
      },
      lastName: {
        type: String,
        required: [true, 'Last name cannot be blank!'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long!'],
        maxlength: [50, 'Last name must be less than 50 characters long!']
      },
      username: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true,
        unique: true,
        immutable: true,
        lowercase: true,
        maxlength: [50, 'Username must be less than 50 characters long!'],
        validate(value) {
          // we have to ensure no spaces are included WITHIN the username itself.
          if (/\s/.test(value))
            throw new Error('Username cannot contain empty spaces.');
        }
      },
      email: {
        type: String,
        required: [true, 'Email is a required field!'],
        trim: true,
        lowercase: true,
        maxlength: [50, 'Email cannot be more than 50 characters long!'],
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid!');
          }
        }
      },
      password: {
        type: String,
        required: [true, 'Password is a required field!'],
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes('password'))
            throw new Error("Password cannot contain the word 'password'!");
          // Even though our model trims the whitespace from the beginning and end of the supplied string,
          // we have to ensure no spaces are included WITHIN the password itself.
          if (/\s/.test(value))
            throw new Error('Password cannot contain empty spaces.');
        }
      },
    },
    {
      timestamps: true,
      toObject: { virtuals: true, getters: true, setters: true },
      toJSON: { virtuals: true, getters: true, setters: true },
      id: false,
      strict: true
    }
  );

  const User = mongoose.model(
    'User',
    userSchema
  );
  
  module.exports = User;
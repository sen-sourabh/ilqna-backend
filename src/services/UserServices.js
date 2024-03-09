var jwt = require('jsonwebtoken');
var Cred = require('../dev.json');
const Users = require('../models/Users/Users');
const mail = require('../config/mailer/mailer');
const { getUsername } = require('../functions/common');
const {
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} = require('@nestjs/common');
const { CreationSuccess } = require('../custom/responses/success/CreationSuccess');
const { ListSuccess } = require('../custom/responses/success/ListSuccess');
const { UpdationSuccess } = require('../custom/responses/success/UpdationSuccess');
const { NotModifiedException } = require('../custom/responses/errors/NotModifiedException');
const { GetSuccess } = require('../custom/responses/success/GetSuccess');

exports.getAllUsers = async (request) => {
  try {
    let filter = {
      deleted: false,
    };
    const response = await Users.find(filter);
    return new ListSuccess(`Got all users`, response, filter);
  } catch (error) {
    return new InternalServerErrorException(error?.message);
  }
};

exports.addUser = async (newUser) => {
  getUsername(newUser);
  return await new Users(newUser)
    .save()
    .then(async (response) => {
      if (response._id) {
        let subject = 'Welcome to Q&A';
        let body =
          `<div>
                                    Welcome to Q&A, <br>
                                    Thanks for joining us. We are sure, You will get your answers. <br><br>
                                    Please use your Username and Password to login: <br>
                                    Username: ` +
          response.email +
          ` <br>
                                    Password: ` +
          response.password +
          ` <br>
                                </div>`;
        return await mail
          .sendMail(response.email, subject, body)
          .then((sentMail) => {
            if (sentMail.messageId) {
              return new CreationSuccess(
                `User added successfully. Please check your email.`,
                response,
              );
            } else {
              return new CreationSuccess(`User added successfully.`, response);
            }
          })
          .catch((error) => {
            return new CreationSuccess(
              `User added successfully. Looks like, We are facing some issue in mail sending. You can login with your registered email & password.`,
              response,
            );
          });
      }
    })
    .catch((error) => {
      return error.message.includes('email_1 dup key')
        ? new ConflictException(`Email is already registered. Please try with different email.`)
        : new BadRequestException(error?.message);
    });
};

exports.updateUser = async (_id, editUser) => {
  delete editUser._id;
  return await Users.findByIdAndUpdate(_id, { $set: editUser })
    .then(async (response) => {
      if (response._id) {
        return await Users.find({ _id: response._id })
          .then((result) => {
            let userData = JSON.parse(JSON.stringify(result[0]));
            userData.token = jwt.sign(userData, Cred.ACCESS_TOKEN_SECRET, { expiresIn: '120m' });
            return new UpdationSuccess(`User updated successfully.`, userData);
          })
          .catch((error) => {
            return new UpdationSuccess(
              `User updated successfully. Seems, Unable to get the updated data due to network issues.`,
              response,
            );
          });
      }
    })
    .catch((error) => {
      return new NotModifiedException(error.message);
    });
};

exports.getUser = async (query) => {
  return await Users.findById(query)
    .then((response) => {
      if (!response) {
        return new NotFoundException(`User`);
      }
      return new GetSuccess(`Got user with id: ${query?._id}`, response, query);
    })
    .catch((error) => {
      return new InternalServerErrorException(error?.message);
    });
};

const mongoose = require("mongoose");
/*Details of User 
When user will register theses details would be stored
*/

const userSchema = mongoose.Schema(
  {
    name: {
      type: {
        first_name: {
          type: String,
          required: [true, "firstname is required"],
          minlength: [2, "firstname should be between 2 to 30 charecters"],
          maxlength: [30, "firstname should be between 2 to 30 charecters"],
          trim: true,
        },
        last_name: {
          type: String,
          required: [true, "lastname is required"],
          minlength: [2, "lastname should be between 2 to 30 charecters"],
          maxlength: [30, "lastname should be between 2 to 30 charecters"],
          trim: true,
        },
      },
      required: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "user is alreay registered"],
      trim: true,
      match: [
        /^w+ ([.-]?w+)*@w+ ([.-]?w+)* (.w {2,3})+$/,
        "please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },

    mobile_number: {
      type: String,
      length: [10, "phone number must contain 10 charecters"],
      required: [true, "phone number is required"],
    },

    verification_number: {
      type: Number,
      unique: [true, "user has already registered this verification_number"],
      required: [true, "verification_number is required"],
    },

    upi_id: {
      type: String,
      unique: [true, "user has already registered this upi_id"],
      required: [true, "upi_id is required"],
      trim: true,
    },

    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },

    staus: {
      type: Boolean,
    },

    date_of_birth: {
      //User will select this from dropdown list or calender application
      type: {
        year: { type: Number },
        month: { type: Number },
        date: { type: Number },
      },
      required: [true, "please select your date of birth"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;

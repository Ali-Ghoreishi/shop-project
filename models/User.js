const mongoose = require("mongoose");
const Yup = require("yup");

//* Mongoose Schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "نام و نام خانوادگی الزامی است"],
    trim: true,
    minlength: 4,
    maxlength: 255,
  },
  email: {
    type: String,
    required: [true, "ایمیل الزامی است"],
    trim: true,
    unique: true,
    email: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//* Yup Schema
const schema = Yup.object().shape({
  fullname: Yup.string()
    .required("نام کاربری الزامی است")
    .min(4, "نام کاربری نباید کمتر از 4 کاراکتر باشد")
    .max(255, "نام کاربری بزرگتر از حد مجاز است"),
  email: Yup.string()
    .email("فرمت ایمیل وارد شده صحیح نمی باشد")
    .required("ایمیل الزامی است"),
  password: Yup.string()
    .required("کلمه عبور الزامی است")
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
    .max(255, "کلمه عبور  بزرگتر از حد مجاز است"),
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور الزامی است")
    .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
});

//* Mongoose Statics
userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("User", userSchema);

module.exports = User;

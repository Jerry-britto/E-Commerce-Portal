import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true,"Kindly provide your first name"],
      trim:true
    },
    last_name: {
      type: String,
      required: [true,"Kindly provide you last name"],
      trim:true
    },
    email: {
      type: String,
      required: [true,"Kindly provide your email"],
      unique:true,
      lowercase:true,
      trim:true
    },
    password: {
      type: String,
      required: [true,"Kindly Provide your password"],
      min:[6,"Password too short"],
      trim:true
    },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema);

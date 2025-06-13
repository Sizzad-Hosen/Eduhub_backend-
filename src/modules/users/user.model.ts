// user.model.ts
import mongoose, { Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema: Schema<TUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['student', 'teacher', 'researcher'],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});



// Remove password from returned doc
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Static methods
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findOne({ _id:id }).select('+password'); // _id not id
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Export the model
export const User = mongoose.model<TUser, UserModel>('User', userSchema);

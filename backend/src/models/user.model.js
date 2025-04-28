const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // Basic email format validation (consider a more robust library if needed)
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Enforce a minimum password length
      private: true, // Indicates field should not be sent in response by default (requires plugin or manual handling)
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    toJSON: {
      // Remove password field when converting schema to JSON
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      // Remove password field when converting schema to Object
       transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    }
  }
);

// Hash password before saving the user document
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10); // 10 rounds is generally recommended
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware/handler
  }
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

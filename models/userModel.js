import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should have 6 or more characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String,
        default: null,
    },
    profile: {
        profilePicture: { type: String, default: null},
        bio: { type: String, default: null},
        skills: [
            {
                name: { type: String, required: true },
                level: { type: String, enum: ['beginner', 'intermediate', 'expert'], default: 'beginner'},
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now },
            }
        ],
        projects: [
            {
                title: { type: String, required: true, trim: true },
                description: { type: String, trim: true },
                link: { type: String, trim: true },
                skills: [{ type: String }],
                tasks: [
                    {
                        title: { type: String, required: true, trim: true},
                        description: { type: String, default: null, trim: true },
                        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
                        createdAt: { type: Date, default: Date.now },
                        updatedAt: { type: Date, default: Date.now }
                    }
                ],
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now },
            }
        ]
    }
}, { timestamps: true});

// Hash the password
userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 12);
    next;
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('user', userSchema);

export default User;
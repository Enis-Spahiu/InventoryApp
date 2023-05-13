const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "A user must have an email!"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a password!"],
        minLength: [8, "Password must be at least 8 characters!"],
        maxLength: [15, "Password cannot exceed 15 charaters!"]
    },
    name: {
        type: String,
        required: [true, "User must have a name!"],
        minLength: [3, "Name must be at least 3 characters!"],
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, "User must have a last name!"],
        minLength: [3, "Last name must be at least 3 characters!"],
        lowercase: true
    },
    image: {
        type: String
    }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: "{PATH} must be unique"});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(result => {
            this.password = result;

            this.name = this.name.replace(/\s/g, '');
            this.name = this.name[0].toUpperCase() + this.name.slice(1);
        
            this.lastname = this.lastname.replace(/\s/g, '');
            this.lastname = this.lastname[0].toUpperCase() + this.lastname.slice(1);
            
            next();
        })
        .catch(err => {
            console.log({message: "Hashing problem!", error: err});
        });
    
})

module.exports = mongoose.model("User", UserSchema);
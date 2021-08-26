const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        nama: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        alamat: {
            Nomor: {
                type: Number,
            },
            Lengkap: {
                type: String,
            },
            RT: {
                type: String,
            },
            RW: {
                type: String,
            }
        },
        password: {
            type: String,
            required: true,
            set: encryptPassword
        },
        PIN: {
            type: String
        },
        Device: {
            Type: {
                type: String,
            },
            Model: {
                type: String,
            },
            Version: {
                type: String,
            }
        },
        Card: {
            type: Schema.Types.ObjectId
        },
        RegisteredDate: {
            type: Date
        },
        History: [{
            type: Schema.Types.ObjectId
        }]
    },
    { timestamps: true }
);

function encryptPassword(password) {
    const encryptPassword = bcrypt.hashSync(password, 10);
    return encryptPassword;
}

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
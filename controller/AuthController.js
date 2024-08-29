const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ message: "Email já registrado" });
            }

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: passwordHash,
            });

            await user.save();
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });

        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Deu ruim!" });
        }
    }


    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ message: "Invalid Email" });
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Invalid Password" });
        }

        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            {
                expiresIn: '2 days'
            }
        );

        return res.status(200).send({ token: token })
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            if (id) {
                const user = await User.findById(id);

                if (user) {
                    await User.deleteOne(user);
                    return res.status(204).send();
                } else {
                    return res.status(404).json({ error: error });
                }
            } else {
                return res.status(404).json({ error: error });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}

module.exports = AuthController;
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        //const email = req.body.email;
        const { email } = req.body; //desestruturacao

        //let user = await User.findOne({email: email});
        let user = await User.findOne({ email }); //desestruturacao // procura se ja tem o email cadastrado

        if (!user) {
            user = await User.create({ email }); // se nao encontrou cria o usuario
        }

        //const user = await User.create({ email });

        return res.json(user);
    }
};

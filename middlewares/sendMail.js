const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '123456789')

async function sendMail(name, mail) {
    const msg = {
        to: mail,
        from: 'disneyAPI@example.com',
        subject: ` ${name} Tu usuario se creo correctamente`,
        text: ` ${name}Bienvenido a disney API`,
        html: '<p> por favor ingresa al siguiente link para validar tu cuenta </br> https:disneyAPI.com/auth//login </p>',
    }

    await sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = { sendMail };
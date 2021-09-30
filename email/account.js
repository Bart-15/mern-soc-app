const sgMail = require('@sendgrid/mail');

const apiKey = require('../config/keys').SENDGRID_API

sgMail.setApiKey(apiKey)


const welcomeEmail = (name, email) => {
    sgMail.send({
        to:email,
        from:'brat.tabusao@gmail.com',
        subject:`Welcome ${name} from PHCODER TEAM!`,
        text:'I’m Bart Tabusao, the developer of this application and I’d like to personally thank you for signing up to our service.',
        html: '<p>I’d love to hear what you think of application and if there is anything we can improve. If you have any questions, please reply to this <a href="mailto:brat.tabusao@gmail.com">Email</a>. I’m always happy to help!</p>'  
    })
}


const deleteAccountEmail = (email) => {
    sgMail.send({
        to:email,
        from:"brat.tabusao@gmail.com",
        subject:`We are sorry to see you go!`,
        text:`You have been removed from PHCODER family. We're sad to see you go, but it's understandable. Thank you for hanging with us.`
    })
}


module.exports = {
    welcomeEmail,
    deleteAccountEmail
}
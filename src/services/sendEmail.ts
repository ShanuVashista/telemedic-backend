import nodemailer from 'nodemailer';

const sendEmail = async (email,subject, text) => {

    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth:{
                user: "noreply@mytelemd.ca",
                pass: "Sahilsharma@123"
            }
        });
    
        await transporter.sendEmail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: email,
            subject: subject,
            text: text
        });

        console.log("Eamil sent Successful")
    }catch(error){
        console.log(error, "email not sent");
    }
    
}

export default sendEmail;

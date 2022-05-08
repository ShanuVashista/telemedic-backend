import nodemailer from 'nodemailer';

const sendEmail = async (email,subject, text) => {

    try{
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.zoho.com",
        //     port: 465,
        //     secure: true,
        //     auth:{
        //         user: "noreply@mytelemd.ca",
        //         pass: "Sahilsharma@123"
        //     }
        // });
        const transporter = nodemailer.createTransport({
            service:"hotmail",
            auth:{
                user: "telemdbackend@outlook.com",
                pass: "Developer@123"
            }
        });

        const options = {
            from: 'telemdbackend@outlook.com',
            to: email,
            subject: subject,
            text: text
        }
    
        transporter.sendMail(options, function(err,info){
            if(err){
                console.log(err);
                return;
            }
            console.log("sent" + info.response)
        })

        console.log("Eamil sent Successful")
    }catch(error){
        console.log(error, "email not sent");
    }
    
}

export default sendEmail;

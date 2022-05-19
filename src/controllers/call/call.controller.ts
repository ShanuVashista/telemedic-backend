import { StatusCodes } from "http-status-codes";
import twilio from 'twilio';
// import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const generateToken = () => {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
    );    
    return token;
}
const videoToken = (req, res) => {
    try {
        let videoGrant;
        const room = req.body.room;
        if (typeof req.body.room !== 'undefined') {
          videoGrant = new VideoGrant({ room });
        } else {
          videoGrant = new VideoGrant();
        }
        const token = generateToken();
        token.addGrant(videoGrant);
        token.identity = req.body.identity;
        res.status(StatusCodes.OK).json({
            status:true,
            type: 'success',
            message: "Token Fetch Successfully",
            token: token.toJwt()
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status:false,
            type: 'error',
            message: error.message
        });
    }
  };
export default videoToken;  
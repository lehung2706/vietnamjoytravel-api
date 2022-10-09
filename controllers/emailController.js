import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export const sendEmail = async (req, res) => {
  try {
    const myOAuth2Client = new OAuth2Client(
      process.env.GOOGLE_MAILER_CLIENT_ID,
      process.env.GOOGLE_MAILER_CLIENT_SECRET
    );
    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    var mainOptions = {};
    if(req.body.type == 'contact') {
      mainOptions = {
        to: "info@vietnamjoytravel.com",
        subject: req.body.subject,
        text: "You recieved message from " + req.body.email,
        html:
          "<p>You have got a new message</b><ul><li>Username:" +
          req.body.name +
          "</li><li>Email:" +
          req.body.email +
          "</li><li>Number:" +
          req.body.number +
          "</li><li>Message:" +
          req.body.message
      }
    }
    else {
      mainOptions = {
        to: "info@vietnamjoytravel.com",
        subject: req.body.subject,
        text: "You recieved message from " + req.body.email,
        html:
          "<p>You have got a new message</b><ul><li>Name:" +
          req.body.name +
          "</li><li>Email:" +
          req.body.email +
          "</li><li>Phone Number:" +
          req.body.phoneNumber +
          "</li><li>Package:" +
          req.body.package +
          "</li><li>Number Of Guests:" +
          req.body.nog +
          "</li><li>From Date - To Date:" +
          req.body.time
      }
    }
    await transporter.sendMail(mainOptions);
    // Không có lỗi gì thì trả về success
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

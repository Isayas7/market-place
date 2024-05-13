const nodemailer = require("nodemailer");
const emailExistence = require("email-existence");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

// // Function to check if an email exists
// export function checkEmailExistence(email) {
//   return new Promise((resolve, reject) => {
//     emailExistence.check(email, function (error, response) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// }

const sendEmail = async (receiverEmail, code) => {
  try {
    const info = await transporter.sendMail({
      from: `MyMarket Web App 📧 <ebisagirma41@gmail.com>`,
      to: `${receiverEmail}`,
      subject: "MyMarket User password reset 🔑",
      text: `This is your confirmation code ${code} on MyMarket Mobile App \n don't share your credential with other people.`,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
  return true;
};

export default sendEmail;

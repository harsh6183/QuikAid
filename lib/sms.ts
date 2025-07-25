import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, message: string) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    });
    console.log('SMS sent:', res.sid);
  } catch (error) {
    console.error('SMS failed:', error);
  }
};

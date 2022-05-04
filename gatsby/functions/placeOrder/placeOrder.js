const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p> Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order.map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}"/>
      ${item.size} ${item.name} - ${item.price}
      </li>`
      )}
    </ul>
    <p>Your total is ${total} due at pickup</p>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // check if they have filled out the honeypot
  if (body.catnip) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Zoop zop zack, you is wack 🤖' }),
    };
  }
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  // make sure they have items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! There's nothing in your order.`,
      }),
    };
  }

  // send the email
  // send the success or error message
  // test send mail
  const info = await transporter.sendMail({
    from: 'Slicks Slices <Slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};

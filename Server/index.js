const stripe = require('stripe')('sk_test_51RK9PMReK3eL4UG5HTyERIqNsLew8Sy1lfiGTGX7rdVV0I6MYuFRkVGzeUpd6W7H6hVBfQ19xaQ872r2cFRYJe2i00cTNAFUDC');
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require('fs');
const https = require('https');
app.use(cors());
app.use(express.static('public'));

const privateKey = fs.readFileSync("../Client/https/cert.key");
const certificate = fs.readFileSync("../Client/https/cert.crt");
const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(4242, () => {
  console.log('HTTPS Server running on port 4242');
});

app.get("/create-intent", async (req, res) => {
  console.log(req.query);
  const { amount, artist, email, name, song } = req.query;
  const song_requested = artist ? `${artist} - ${song}` : null;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount),
        automatic_payment_methods: { enabled: true },
        currency: 'usd',
        metadata: { name, song_requested },
        receipt_email: email === "null" ? "example@example.com" : email,
      });
  console.log(paymentIntent);
    res.send({ client_secret: paymentIntent.client_secret, transaction_id: paymentIntent.id });
});
  
// app.get("/session-status", async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });

//app.listen(4242, () => console.log('Running on port 4242'));
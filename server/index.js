const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

/* replaced #1
const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}*/

const START_ACCOUNTS = 3;
const balances = {}; //replaces #1
const Ledger = require('./ledger');
const ledger = new Ledger();

for (let i = 0; i < START_ACCOUNTS; i++) {
  // creates random accounts named between 'account000000' & 'account999999'
  // with balance between 50 & 100
  const name = `account${Math.floor(Math.random()*10**6)}`;
  const balance = Math.floor((Math.random() * 50) + 50);

  const newAccount = ledger.addAccount(name, balance)
  balances[name] = balance;
  
  console.log('added :', name, ledger.accounts[name]);
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount} = req.body;
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
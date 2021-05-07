import "./index.scss";

const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  
  /* To avoid storing private in a variable directly
  const _msghash = SHA256(JSON.stringify({ "from": sender, "amount": amount, "to": recipient }));
  console.log(_msghash.toString()); //ok
  const full_signature = ec.keyFromPrivate(document.getElementById("key").value).sign(_msghash.toString());
  const signature = { r: full_signature.r.toString(16), s: full_signature.s.toString(16) };
  console.log(signature); //ok
*/
  const signature = 'test'; /////

  const body = JSON.stringify({
    sender, amount, recipient, signature
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

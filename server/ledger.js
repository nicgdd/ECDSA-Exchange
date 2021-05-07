class Account {
    constructor(_address, _pubkey, _balance) {
        this.address = _address;
        this.pubkey = _pubkey;
        this.balance = _balance;
    }
}

class Ledger {
    constructor(_accounts = {}) {
        this.accounts = _accounts;
    }

    // would need to avoid pubkeys collisions...
    addAccount(address, pubkey, balance = 0) {
        this.accounts[address] = new Account(address, pubkey, balance);
    }
}

module.exports = Ledger;
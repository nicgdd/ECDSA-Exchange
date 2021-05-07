class Account {
    constructor(_name, _balance) {
        this.name = _name;
        this.balance = _balance;
    }
}

class Ledger {
    constructor(_accounts = {}) {
        this.accounts = _accounts;
    }

    // would need to avoid names collisions...
    addAcount(name, balance = 0) {
        this.accounts[name] = new Account(name, balance);
    }
}


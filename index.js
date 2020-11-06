let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    const transactions = this.transactions;
    let balance = 0;
    for (const t of transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.amount <= this.account.balance
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log(t1)

const t2 = new Withdrawal(119.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
// console.log(myAccount);




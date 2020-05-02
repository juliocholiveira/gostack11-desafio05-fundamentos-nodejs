import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const income = this.transactions.reduce((p, c) => {
      let sum = p;
      if (c.type === 'income') {
        sum = p + c.value;
      }
      return sum;
    }, 0);

    const outcome = this.transactions.reduce((p, c) => {
      let sum = p;
      if (c.type === 'outcome') {
        sum = p + c.value;
      }
      return sum;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

// Массив транзакций
const transactions = [
    {
        transaction_id: 1,
        transaction_date: "2025-03-01",
        transaction_amount: 15000,
        transaction_type: "credit",
        transaction_description: "Зарплата ",
        merchant_name: "Компания AutoMall",
        card_type: "credit"
    },
    {
        transaction_id: 2,
        transaction_date: "2025-03-02",
        transaction_amount: 3000,
        transaction_type: "debit",
        transaction_description: "Покупка продуктов",
        merchant_name: "Linella",
        card_type: "debit"
    },
    {
        transaction_id: 3,
        transaction_date: "2025-03-03",
        transaction_amount: 500,
        transaction_type: "debit",
        transaction_description: "Оплата такси",
        merchant_name: "Uber",
        card_type: "debit"
    }
];


function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
}


function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}


function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}


function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => t.transaction_date >= startDate && t.transaction_date <= endDate);
}


function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}


function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
}


function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}


function calculateTotalDebitAmount(transactions) {
    return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}


function findMostTransactionsMonth(transactions) {
    const months = transactions.map(t => t.transaction_date.slice(0, 7));
    const counts = months.reduce((acc, month) => {
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}


function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = getTransactionByType(transactions, "debit");
    return findMostTransactionsMonth(debitTransactions);
}


function mostTransactionTypes(transactions) {
    const credit = getTransactionByType(transactions, "credit").length;
    const debit = getTransactionByType(transactions, "debit").length;
    if (credit > debit) return "credit";
    if (debit > credit) return "debit";
    return "equal";
}


function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => t.transaction_date < date);
}

function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id) || null;
}


function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}


console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции в диапазоне дат:", getTransactionsInDateRange(transactions, "2025-03-01", "2025-03-02"));
console.log("Транзакции Uber:", getTransactionsByMerchant(transactions, "Uber"));
console.log("Среднее значение транзакций:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции в диапазоне суммы:", getTransactionsByAmountRange(transactions, 100, 600));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Наиболее распространенный тип транзакций:", mostTransactionTypes(transactions));
console.log("Транзакции до даты:", getTransactionsBeforeDate(transactions, "2025-03-03"));
console.log("Поиск транзакции по ID:", findTransactionById(transactions, 2));
console.log("Описания транзакций:", mapTransactionDescriptions(transactions));

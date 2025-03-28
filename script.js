const apiURL = "https://api.frankfurter.app/latest";

// List of currencies supported by the API
const currencies = ["USD", "EUR", "GBP", "JPY", "BRL", "CAD", "AUD", "CHF", "CNY", "INR"];

document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();
});

function populateDropdowns() {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    currencies.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);

        fromCurrency.add(option1);
        toCurrency.add(option2);
    });

    fromCurrency.value = "USD";  // Default: USD to BRL
    toCurrency.value = "BRL";
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    
    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
        return;
    }

    try {
        const response = await fetch(`${apiURL}?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
        const data = await response.json();

        const result = data.rates[toCurrency].toFixed(2);
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
}
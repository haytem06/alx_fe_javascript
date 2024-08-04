const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Action" },
    // Add more initial quotes as needed
];

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        localStorage.setItem('quotes', JSON.stringify(quotes));
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}


function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

document.addEventListener('DOMContentLoaded', () => {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${lastViewedQuote.text}</p><p><em>${lastViewedQuote.category}</em></p>`;
    }
});


function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'quotes.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}


alx_fe_javascript/
└── dom-manipulation/
    ├── index.html
    └── script.js

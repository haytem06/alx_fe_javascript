const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with actual server URL

async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        return serverQuotes.map(quote => ({ text: quote.title, category: 'Server' })); // Adjust mapping as needed
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}

async function syncQuotesWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    const mergedQuotes = mergeQuotes(quotes, serverQuotes);
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes.length = 0; // Clear and refill the quotes array
    quotes.push(...mergedQuotes);
    populateCategories();
    filterQuotes();
}

function mergeQuotes(localQuotes, serverQuotes) {
    const allQuotes = [...localQuotes, ...serverQuotes];
    const uniqueQuotes = [];
    const quoteSet = new Set();

    allQuotes.forEach(quote => {
        const quoteKey = `${quote.text}-${quote.category}`;
        if (!quoteSet.has(quoteKey)) {
            quoteSet.add(quoteKey);
            uniqueQuotes.push(quote);
        }
    });

    return uniqueQuotes;
}


document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
    setInterval(syncQuotesWithServer, 60000); // Sync with server every 60 seconds
});


function mergeQuotes(localQuotes, serverQuotes) {
    const allQuotes = [...serverQuotes, ...localQuotes]; // Server quotes take precedence
    const uniqueQuotes = [];
    const quoteSet = new Set();

    allQuotes.forEach(quote => {
        const quoteKey = `${quote.text}-${quote.category}`;
        if (!quoteSet.has(quoteKey)) {
            quoteSet.add(quoteKey);
            uniqueQuotes.push(quote);
        }
    });

    return uniqueQuotes;
}

function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

async function syncQuotesWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    const mergedQuotes = mergeQuotes(quotes, serverQuotes);
    if (mergedQuotes.length !== quotes.length) {
        notifyUser('Quotes have been updated from the server.');
    }
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes.length = 0;
    quotes.push(...mergedQuotes);
    populateCategories();
    filterQuotes();
}

["method", "POST", "headers", "application/json", "Content-Type"]

 ["alert", "Quotes synced with server!"]

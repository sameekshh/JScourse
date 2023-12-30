// Creating constants 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

let apiQuotes = []; // global variable array

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {
    loading();
    //To pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //console.log(quote);
    //check if author field is empty. And replace with 'unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //check quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl= 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    } catch (error){
        //Catch Error here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //back-ticks is used ==> template string. This helps to pass variable
    window.open(twitterUrl, '_blank');//_blank ensures new page
}

//Event Listner
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();




/*
//Show New Quotes from Local array
function newQuote(){
    //pick a random quote from localQuote array
    const quote= localQuotes[Math.floor(Math.random()*localQuotes.length)];
    console.log(quote);
}

newQuote();
*/
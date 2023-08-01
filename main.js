document.querySelector("#srch").addEventListener('click', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                const quote = data.quote;
                const author = data.character;
                const anime = data.anime;
                
                const quoteFormatted = `"${quote}"`;
                const authorFormatted = `<span> ~ ${author}</span>`;
                const animeFormatted = `<span>(${anime})</span>`;
                
                document.querySelector('#quote').innerHTML = quoteFormatted;
                document.querySelector('#author').innerHTML = authorFormatted;
                document.querySelector('#anime').innerHTML = animeFormatted;
            } catch (error) {
                console.error('Error parsing JSON response:', error);
            }
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.open('GET', "https://animechan.xyz/api/random");
    xhr.send();
});

document.querySelector("#tweet").addEventListener('click', (e) => {
    e.preventDefault();
    const quote = document.querySelector('#quote').textContent;
    const author = document.querySelector('#author').textContent;
    const anime = document.querySelector('#anime').textContent;
    const tweetMessage = `${quote} ${author} ${anime}`;

    const encodedMessage = encodeURIComponent(tweetMessage);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;

    window.open(twitterUrl, "Tweet Window", "width=600,height=300");
});

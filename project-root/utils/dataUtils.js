export function preprocessArticles(data) {
    const indexedData = {
        byCategory: {},
        byRegion: {},
        byDate: {}
    };
    data.forEach(article => {
        const category = article.category.toLowerCase();
        const region = article.region?.toLowerCase() || 'unknown';
        const date = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        if (!indexedData.byCategory[category]) indexedData.byCategory[category] = [];
        indexedData.byCategory[category].push(article);
        if (!indexedData.byRegion[region]) indexedData.byRegion[region] = [];
        indexedData.byRegion[region].push(article);
        if (!indexedData.byDate[date]) indexedData.byDate[date] = [];
        indexedData.byDate[date].push(article);
    });
    return indexedData;
}

export function fetchArticles(attempts = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        const cachedData = localStorage.getItem('articlesData');
        const cacheTimestamp = localStorage.getItem('articlesCacheTimestamp');
        const cacheDuration = 24 * 60 * 60 * 1000;

        if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
            resolve(JSON.parse(cachedData));
            return;
        }

        function tryFetch() {
            fetch('DB.json')
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load JSON: ${response.statusText}`);
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('articlesData', JSON.stringify(data));
                    localStorage.setItem('articlesCacheTimestamp', Date.now());
                    resolve(data);
                })
                .catch(error => {
                    if (attempts > 1) {
                        setTimeout(() => tryFetch(attempts - 1, delay * 2), delay);
                    } else {
                        reject(error);
                    }
                });
        }

        tryFetch();
    });
}
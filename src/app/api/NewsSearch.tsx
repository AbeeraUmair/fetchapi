// components/NewsSearch.tsx
'use client'
import React, { useState } from 'react';


// Define the Article type
type Article = {
    source: { name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
};

// Use the API key
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// Configure dotenv

const NewsSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState<Article[]>([]); // Set type to Article[]
    const [error, setError] = useState<string | null>(null);

    const getNews = async (event: React.FormEvent) => {
        event.preventDefault();
        setArticles([]);
        setError(null);

        if (!query.trim()) {
            setError('Please enter a search term.');
            return;
        }

        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-10-18&sortBy=publishedAt&apiKey=${apiKey}`);
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                setArticles(data.articles);
            } else {
                setError('No articles found for the search term.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching the news.');
        }
    };

    return (
        <div className="container mx-auto mt-6">
            <form onSubmit={getNews} className="flex items-center mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Search for news..."
                    aria-label="Search"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {error && <p className="text-center text-red-500">{error}</p>}

            <div id="getDiv" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {articles.map((article, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                        <img
                            src={article.urlToImage || ''}
                            alt="Article image"
                            className="object-cover w-full h-32 rounded-md"
                        />
                        <div className="mt-2">
                            <h5 className="text-lg font-semibold truncate">{article.title || 'No Title'}</h5>
                            <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                                {article.description || 'No description available.'}
                            </p>
                            <a
                                href={article.url}
                                className="inline-block mt-3 text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSearch;

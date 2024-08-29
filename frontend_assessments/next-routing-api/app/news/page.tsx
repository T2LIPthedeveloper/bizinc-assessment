"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Define the NewsItem type and create a component to wrap it in a nice tile using Tailwind CSS.
type NewsItem = {
    id: number;
    title: string;
    points: number;
    user: string;
    time: number;
    url: string;
};

// NewsTile component displaying the title, URL, points and string in a nice tile.
const NewsTile: React.FC<{ item: NewsItem }> = ({ item }) => {
    return (
        <div className="border p-4 my-4 bg-neutral-200 text-neutral-700 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-black">{item.title}</h2>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-l text-black hover:text-blue-600">{item.url}</a>
            <p>Points: {item.points}</p> {/* Display the number of points the news item has */}
            <p>By: {item.user}</p> // {/* Display the user who submitted the news item */}
            <p>Time: {new Date(item.time * 1000).toLocaleString()}</p> {/* Display the time the news item was submitted in a readable format */}
        </div>
    );
};

const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    // Fetch the latest news from the Hacker News API.
    useEffect(() => {
        fetch('https://api.hnpwa.com/v0/news/1.json')
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);

    return (
        <div className='bg-neutral-100 p-4 text-black'>
            <h1 className='text-2xl font-title font-bold'>News Feed</h1>
            <Link href="news/latest" className='hover:text-blue-600'>Go to Latest News</Link> {/* Links to the latest news page, which is not yet implemented */}
            <Link href="/" className='hover:text-blue-600'>Go to Home</Link> {/* Links to the home page */}
            {news.map(item => (
                <NewsTile key={item.id} item={item} /> // Display each news item in a NewsTile component
            ))}
        </div>
    );
};

// Ensure that NewsPage is exported as the default export
export default NewsPage;

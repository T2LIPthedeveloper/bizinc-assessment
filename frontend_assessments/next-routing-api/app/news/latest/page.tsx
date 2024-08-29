"use client";
import Link from 'next/link';

// You're in the latest news page, located in /news/latest. You can go back to the news page by clicking the link.

const LatestNewsPage: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-title font-bold'>Latest News</h1>
            <Link href="/news" className='my-2 hover:text-blue-600'> {/* Just a bit of styling to make the link look nice */}
                Welp, looks like the latest news page is not implemented yet. Click here to go back to the news page.
            </Link>
        </div>
    );
};

export default LatestNewsPage;
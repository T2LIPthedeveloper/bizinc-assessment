/* To be honest, this is my first time developing using Next.js, but the general 
concept feels the same as React. I'll be developing this as a basic news website 
to show how Next routing works with APIs, which I'm familiar with. 

I'm also familiar with Tailwind CSS and the other CSS libraries that come preinstalled
with Next, so I'll be using those to style the website a bit, though it's not 
a major concern for this assessment.

The API I'll be using is the Hacker News API, mainly because I don't want to
expose any API keys, which Hacker News doesn't require.
*/
"use client";
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
      <div className='flex flex-col items-center justify-center h-screen p-4'>
            <h1 className='text-2xl font-title font-bold m-4'>Welcome!</h1>
            <Link href="/news" className='my-2 hover:text-blue-600'>
                Check out our news page!
            </Link>
            <Link href="/news/latest" className='my-2 hover:text-blue-600'>
                Or check out the latest news!
            </Link>
        </div>
  );
}


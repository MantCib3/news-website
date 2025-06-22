import React from 'react';

const Newsletter = () => {
    return (
        <div className="max-w-4xl mx-auto my-12 bg-white rounded-lg shadow hover:-translate-y-1 transition-transform cursor-pointer flex">
            <div className="w-2/5 bg-white bg-opacity-15 backdrop-blur-lg rounded-l-lg p-4 flex flex-col justify-center items-center">
                <input type="email" placeholder="Your Email" className="w-4/5 p-2 mb-2 border border-gray-300 rounded text-sm font-sans" />
                <button className="w-4/5 p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors text-sm font-sans">Subscribe</button>
            </div>
            <div className="w-3/5 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold mb-8 ml-20">Newsletter</h3>
                <p className="text-sm font-sans text-gray-600">
                    Join our vibrant community and unlock a world of knowledge with our daily newsletter! Get exclusive access to the latest news, insightful articles, and expert tips delivered straight to your inbox.
                </p>
            </div>
        </div>
    );
};

export default Newsletter;
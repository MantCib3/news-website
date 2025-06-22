import React, { useState } from 'react';

const Header = ({ navigate }) => {
    const [searchActive, setSearchActive] = useState(false);

    const toggleSearch = () => setSearchActive(!searchActive);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
                <div className="logo cursor-pointer" onClick={() => navigate('home')}>
                    <img src="https://via.placeholder.com/25" alt="Logo" className="h-6 w-6 hover:opacity-80 transition-opacity" />
                </div>
                <nav className="flex-grow flex justify-center">
                    <ul className="flex space-x-4 items-center">
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('section', { sectionId: 'latest' }); }}>Latest</a></li>
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('section', { sectionId: 'world' }); }}>World</a></li>
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('section', { sectionId: 'events' }); }}>Events</a></li>
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('section', { sectionId: 'financial' }); }}>Finance</a></li>
                        <li><a href="#" className="text-text font-serif text-sm hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('search'); }}>Search</a></li>
                    </ul>
                </nav>
                <div className="search-nav">
                    <i className="fa fa-search text-text text-base cursor-pointer hover:text-accent transition-colors" onClick={toggleSearch}></i>
                    {searchActive && (
                        <div className="absolute right-4 top-12 flex">
                            <input type="text" placeholder="Search..." className="p-2 border border-gray-300 rounded-l text-sm font-sans focus:outline-none" />
                            <button className="p-2 bg-accent text-white border border-gray-300 border-l-0 rounded-r hover:bg-black transition-colors">Search</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
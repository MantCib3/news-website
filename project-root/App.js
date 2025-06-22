import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import Footer from './components/Footer.js';
import { preprocessArticles, fetchArticles } from './utils/dataUtils.js';

const App = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [indexedArticles, setIndexedArticles] = useState({ byCategory: {}, byRegion: {}, byDate: {} });
    const [currentView, setCurrentView] = useState({ view: 'home' });
    const [searchParams, setSearchParams] = useState({ keyword: '', region: '', topic: '', date: '' });

    useEffect(() => {
        fetchArticles()
            .then(data => {
                setArticlesData(data.articles || []);
                setIndexedArticles(preprocessArticles(data.articles || []));
                handleInitialLoad();
            })
            .catch(error => console.error('Failed to load articles:', error));
    }, []);

    const handleInitialLoad = () => {
        const path = window.location.pathname;
        if (path === '/' || path === '') {
            setCurrentView({ view: 'home' });
        } else if (path === '/about') {
            setCurrentView({ view: 'about' });
        } else if (path === '/contact') {
            setCurrentView({ view: 'contact' });
        } else if (path === '/privacy') {
            setCurrentView({ view: 'privacy' });
        } else if (path.startsWith('/section/')) {
            const sectionId = path.split('/section/')[1];
            if (['latest', 'world', 'events', 'financial', 'search'].includes(sectionId)) {
                setCurrentView({ view: sectionId === 'search' ? 'search' : 'section', sectionId });
            } else {
                setCurrentView({ view: 'home' });
            }
        } else if (path.startsWith('/article/')) {
            const articleId = path.split('/article/')[1];
            setCurrentView({ view: 'article', articleId });
        } else {
            setCurrentView({ view: 'home' });
        }
    };

    const navigate = (view, params = {}) => {
        setCurrentView({ view, ...params });
        let url = '/';
        if (view === 'about') url = '/about';
        else if (view === 'contact') url = '/contact';
        else if (view === 'privacy') url = '/privacy';
        else if (view === 'section') url = `/section/${params.sectionId}`;
        else if (view === 'search') url = '/section/search';
        else if (view === 'article') url = `/article/${params.articleId}`;
        history.pushState({ view, ...params }, '', url);
    };

    useEffect(() => {
        const handlePopstate = (event) => {
            if (event.state) {
                setCurrentView(event.state);
            } else {
                setCurrentView({ view: 'home' });
            }
        };
        window.addEventListener('popstate', handlePopstate);
        return () => window.removeEventListener('popstate', handlePopstate);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header navigate={navigate} />
            <MainContent
                currentView={currentView}
                articlesData={articlesData}
                indexedArticles={indexedArticles}
                navigate={navigate}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <Footer navigate={navigate} />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
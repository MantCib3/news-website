import React, { useEffect } from 'react';
import { debounce } from '../utils/helpers.js';

const SectionView = ({ sectionId, articlesData, indexedArticles, navigate, searchParams, setSearchParams }) => {
    let title = '';
    let articlesToShow = [];
    let showTopicFilter = true;

    if (sectionId === 'latest') {
        title = 'Latest';
        articlesToShow = articlesData.slice(1, Math.min(4, articlesData.length));
        showTopicFilter = true;
    } else if (sectionId === 'world') {
        title = 'World';
        articlesToShow = indexedArticles.byCategory['world'] || [];
        showTopicFilter = false;
    } else if (sectionId === 'events') {
        title = 'Events';
        articlesToShow = articlesData.filter(a => a.category.toLowerCase() !== 'world');
        showTopicFilter = false;
    } else if (sectionId === 'financial') {
        title = 'Finance';
        articlesToShow = indexedArticles.byCategory['financial'] || [];
        showTopicFilter = false;
    }

    const filterArticles = debounce(() => {
        const keyword = document.getElementById('keywordFilter')?.value.toLowerCase() || '';
        const region = document.getElementById('regionFilter')?.value || '';
        const topic = document.getElementById('topicFilter')?.value || '';
        const date = document.getElementById('dateFilter')?.value || '';

        setSearchParams({ keyword, region, topic, date });

        let filtered = articlesToShow;
        if (keyword) {
            filtered = filtered.filter(a =>
                a.title.toLowerCase().includes(keyword) ||
                a.content.toLowerCase().includes(keyword) ||
                a.lead.toLowerCase().includes(keyword)
            );
        }
        if (region) {
            filtered = filtered.filter(a => a.region?.toLowerCase() === region.toLowerCase());
        }
        if (topic && sectionId === 'latest') {
            filtered = filtered.filter(a => a.category.toLowerCase() === topic.toLowerCase());
        }
        if (date) {
            const selectedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            filtered = filtered.filter(a =>
                new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) === selectedDate
            );
        }
        return filtered;
    }, 300);

    useEffect(() => {
        filterArticles();
    }, [searchParams]);

    const filteredArticles = filterArticles();

    return (
        <div className="w-full max-w-4xl">
            <button
                className="inline-flex items-center px-3 py-2 bg-accent text-white rounded hover:bg-black transition-colors text-sm font-sans mb-4"
                onClick={() => navigate('home')}
            >
                <i className="fa fa-arrow-left mr-2"></i> Back
            </button>
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">{title}</h1>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                <input
                    id="keywordFilter"
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:border-accent"
                    value={searchParams.keyword}
                    onChange={e => setSearchParams({ ...searchParams, keyword: e.target.value })}
                />
                <select
                    id="regionFilter"
                    className="p-2 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:border-accent"
                    value={searchParams.region}
                    onChange={e => setSearchParams({ ...searchParams, region: e.target.value })}
                >
                    <option value="">All Regions</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="south-america">South America</option>
                    <option value="australia">Australia</option>
                </select>
                {showTopicFilter && (
                    <select
                        id="topicFilter"
                        className="p-2 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:border-accent"
                        value={searchParams.topic}
                        onChange={e => setSearchParams({ ...searchParams, topic: e.target.value })}
                    >
                        <option value="">All Topics</option>
                        <option value="world">World</option>
                        <option value="events">Events</option>
                        <option value="financial">Finance</option>
                    </select>
                )}
                <input
                    id="dateFilter"
                    type="date"
                    className="p-2 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:border-accent"
                    value={searchParams.date}
                    onChange={e => setSearchParams({ ...searchParams, date: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-4">
                {filteredArticles.length > 0 ? filteredArticles.map(a => (
                    <div
                        key={a.id}
                        className="bg-white rounded-lg shadow flex hover:-translate-y-1 transition-transform cursor-pointer max-w-4xl"
                        onClick={() => navigate('article', { articleId: a.id })}
                    >
                        <div
                            className="w-80 h-64 bg-gray-200 rounded-l-lg bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${a.image})` }}
                        ></div>
                        <div className="p-5 flex-grow">
                            <h3 className="text-xl font-serif font-bold mb-2">{a.title}</h3>
                            <div className="text-sm font-sans text-gray-700 mb-2">
                                {new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <p className="text-sm font-sans text-gray-600 line-clamp-6">{a.content}</p>
                        </div>
                    </div>
                )) : <div className="text-sm font-sans text-gray-700 text-center py-4">No articles found.</div>}
            </div>
        </div>
    );
};

export default SectionView;
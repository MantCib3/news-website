import React from 'react';

const EventsSection = ({ articles, navigate }) => {
    return (
        <section id="events" className="flex-1 max-w-md">
            <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                Events
                <i className="fa fa-arrow-right ml-2 text-sm cursor-pointer" onClick={() => navigate('section', { sectionId: 'events' })}></i>
            </h2>
            {articles.length > 0 ? articles.map(article => (
                <div
                    key={article.id}
                    className="bg-white rounded-lg shadow mb-4 flex hover:-translate-y-1 transition-transform cursor-pointer"
                    onClick={() => navigate('article', { articleId: article.id })}
                >
                    <div
                        className="w-60 h-48 bg-gray-200 rounded-l-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${article.image})` }}
                    ></div>
                    <div className="p-3 flex-grow">
                        <h3 className="text-base font-serif font-bold mb-1">{article.title}</h3>
                        <div className="text-xs font-sans text-gray-700 mb-1">
                            {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <p className="text-sm font-sans text-gray-600 line-clamp-4">{article.lead}</p>
                    </div>
                </div>
            )) : <div className="text-sm font-sans text-gray-700 text-center py-4">No articles available.</div>}
        </section>
    );
};

export default EventsSection;
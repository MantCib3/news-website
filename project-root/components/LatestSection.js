import React from 'react';

const LatestSection = ({ articles, navigate }) => {
    return (
        <aside className="col-span-1">
            <h3 className="text-lg font-serif font-bold mb-2 flex items-center">
                Latest
                <i className="fa fa-arrow-right ml-2 text-sm cursor-pointer" onClick={() => navigate('section', { sectionId: 'latest' })}></i>
            </h3>
            {articles.map(article => (
                <div
                    key={article.id}
                    className="bg-white rounded-lg shadow mb-4 flex items-center hover:-translate-y-1 transition-transform cursor-pointer"
                    onClick={() => navigate('article', { articleId: article.id })}
                >
                    <div
                        className="w-32 h-32 bg-gray-200 rounded-l-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${article.image})` }}
                    ></div>
                    <div className="p-4 flex-grow">
                        <h4 className="text-base font-serif font-bold mb-1 truncate">{article.title}</h4>
                        <div className="text-xs font-sans text-gray-700 mb-1">
                            {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <p className="text-sm font-sans text-gray-600 line-clamp-2">{article.lead}</p>
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default LatestSection;
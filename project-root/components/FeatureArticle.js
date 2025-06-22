import React from 'react';

const FeatureArticle = ({ article, navigate }) => {
    if (!article) return <div className="col-span-2 bg-white rounded-lg shadow p-4">Loading...</div>;

    return (
        <div
            className="col-span-2 bg-white rounded-lg shadow hover:-translate-y-1 transition-transform cursor-pointer"
            onClick={() => navigate('article', { articleId: article.id })}
        >
            <div
                className="h-64 bg-gray-200 rounded-t-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
            ></div>
            <div className="p-4">
                <h1 className="text-xl font-serif font-bold mb-2">{article.title}</h1>
                <div className="text-xs font-sans text-gray-700 mb-2">
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-sm font-sans text-gray-600">{article.lead}</p>
            </div>
        </div>
    );
};

export default FeatureArticle;
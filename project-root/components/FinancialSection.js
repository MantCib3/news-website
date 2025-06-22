import React from 'react';

const FinancialSection = ({ articles, navigate }) => {
    const featureArticle = articles[0];
    const latestArticles = articles.slice(1, 3);

    return (
        <section id="financial" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                Finance
                <i className="fa fa-arrow-right ml-2 text-sm cursor-pointer" onClick={() => navigate('section', { sectionId: 'financial' })}></i>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {featureArticle ? (
                    <div
                        className="col-span-2 bg-white rounded-lg shadow hover:-translate-y-1 transition-transform cursor-pointer"
                        onClick={() => navigate('article', { articleId: featureArticle.id })}
                    >
                        <div
                            className="h-64 bg-gray-200 rounded-t-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${featureArticle.image})` }}
                        ></div>
                        <div className="p-4">
                            <h1 className="text-xl font-serif font-bold mb-2">{featureArticle.title}</h1>
                            <div className="text-xs font-sans text-gray-700 mb-2">
                                {new Date(featureArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <p className="text-sm font-sans text-gray-600 line-clamp-6">{featureArticle.lead}</p>
                        </div>
                    </div>
                ) : (
                    <div className="col-span-2 bg-white rounded-lg shadow p-4">No financial articles available.</div>
                )}
                <aside id="finance-latest-section" className="col-span-1 flex flex-col">
                    <h3 className="text-lg font-serif font-bold mb-2">Latest</h3>
                    {latestArticles.length > 0 ? latestArticles.map(article => (
                        <div
                            key={article.id}
                            className="bg-white rounded-lg shadow mb-4 flex hover:-translate-y-1 transition-transform cursor-pointer flex-grow"
                            onClick={() => navigate('article', { articleId: article.id })}
                        >
                            <div
                                className="w-48 h-full bg-gray-200 rounded-l-lg bg-cover bg-center flex-shrink-0"
                                style={{ backgroundImage: `url(${article.image})` }}
                            ></div>
                            <div className="p-4 flex-grow">
                                <h4 className="text-base font-serif font-bold mb-1 truncate">{article.title}</h4>
                                <div className="text-xs font-sans text-gray-700 mb-1">
                                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <p className="text-sm font-sans text-gray-600 line-clamp-4">{article.lead}</p>
                            </div>
                        </div>
                    )) : <div className="text-sm font-sans text-gray-700 text-center py-4">No financial articles available.</div>}
                </aside>
            </div>
        </section>
    );
};

export default FinancialSection;
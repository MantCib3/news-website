import React from 'react';

const ArticleDetail = ({ articleId, articlesData, navigate }) => {
    const article = articlesData.find(a => a.id === articleId);
    if (!article) return <div className="text-sm font-sans text-gray-700 text-center py-4">Article not found.</div>;

    const relatedArticles = articlesData
        .filter(a => a.id !== articleId && a.category.toLowerCase() === article.category.toLowerCase() && a.region?.toLowerCase() === article.region?.toLowerCase())
        .slice(0, 3);
    const topicOnlyArticle = articlesData
        .filter(a => a.id !== articleId && a.category.toLowerCase() === article.category.toLowerCase() && !relatedArticles.includes(a))
        .slice(0, 1);
    const allRelatedArticles = [...relatedArticles, ...topicOnlyArticle];

    return (
        <>
            <div className="max-w-3xl bg-white rounded-lg p-6 mb-6">
                <button
                    className="inline-flex items-center px-3 py-2 bg-accent text-white rounded hover:bg-black transition-colors text-sm font-sans mb-4"
                    onClick={() => navigate('home')}
                >
                    <i className="fa fa-arrow-left mr-2"></i> Back
                </button>
                <h1 className="text-2xl font-serif font-bold mb-3">{article.title}</h1>
                <div className="text-sm font-sans text-gray-700 mb-4">
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div
                    className="w-full h-96 bg-gray-200 rounded-lg bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(${article.image})` }}
                ></div>
                <div className="text-base font-sans text-gray-900 mb-4">
                    <ul className="list-disc pl-5">
                        {article.dot_points.length > 0 ? article.dot_points.map((point, i) => <li key={i}>{point}</li>) : <li>No key points available.</li>}
                    </ul>
                </div>
                <div className="text-base font-sans text-gray-900 mb-4">{article.content}</div>
                {article.quotes && article.quotes.map((q, i) => (
                    <div key={i}>
                        <div className="italic text-base font-serif text-gray-800 border-l-4 border-accent pl-4 my-4">{q.text}</div>
                        <div className="text-sm font-sans text-gray-700 mb-4">{q.speaker || 'Unknown'}</div>
                    </div>
                ))}
                <div className="mb-4">
                    <h3 className="text-lg font-serif font-bold mb-2">Sources</h3>
                    <ul className="list-none text-sm font-sans">
                        {article.sources.length > 0 ? article.sources.map((s, i) => (
                            <li key={i}><a href={s.url} target="_blank" className="text-accent hover:underline">{s.title}</a></li>
                        )) : <li>No sources available.</li>}
                    </ul>
                </div>
                <div className="text-center mb-4">
                    <button
                        className="bg-gray-800 text-white font-sans text-base px-5 py-2 rounded hover:bg-gray-600 transition-colors"
                        onClick={() => navigator.share ? navigator.share({ title: article.title, url: window.location.href }) : alert('Sharing not supported. Copy URL: ' + window.location.href)}
                    >
                        Share Article
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-xl font-serif font-bold mb-5">Related Articles</h2>
                <div className="flex justify-center gap-5 flex-wrap">
                    {allRelatedArticles.length > 0 ? allRelatedArticles.map(a => (
                        <div
                            key={a.id}
                            className="w-64 bg-white rounded-lg shadow hover:-translate-y-1 transition-transform cursor-pointer"
                            onClick={() => navigate('article', { articleId: a.id })}
                        >
                            <div
                                className="w-64 h-48 bg-gray-200 rounded-t-lg bg-cover bg-center"
                                style={{ backgroundImage: `url(${a.image})` }}
                            ></div>
                            <div className="p-3 h-36 flex flex-col">
                                <h1 className="text-base font-serif font-bold mb-1 truncate">{a.title}</h1>
                                <div className="text-xs font-sans text-gray-700 mb-1">
                                    {new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <p className="text-sm font-sans text-gray-600 line-clamp-2 flex-grow">{a.lead}</p>
                            </div>
                        </div>
                    )) : <div className="text-sm font-sans text-gray-700 py-4">No related articles found.</div>}
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
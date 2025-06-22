import React from 'react';
import FeatureArticle from './FeatureArticle.js';
import LatestSection from './LatestSection.js';
import WorldSection from './WorldSection.js';
import EventsSection from './EventsSection.js';
import FinancialSection from './FinancialSection.js';
import Newsletter from './Newsletter.js';
import ArticleDetail from './ArticleDetail.js';
import SectionView from './SectionView.js';
import SearchView from './SearchView.js';
import AboutUsView from './AboutUsView.js';
import ContactUsView from './ContactUsView.js';
import PrivacyPolicyView from './PrivacyPolicyView.js';

const MainContent = ({ currentView, articlesData, indexedArticles, navigate, searchParams, setSearchParams }) => {
    const renderView = () => {
        switch (currentView.view) {
            case 'home':
                return (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5 py-8">
                            <FeatureArticle article={articlesData[0]} navigate={navigate} />
                            <LatestSection articles={articlesData.slice(1, 4)} navigate={navigate} />
                        </div>
                        <div className="lower-sections max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 mt-5">
                            <WorldSection articles={indexedArticles.byCategory['world']?.slice(0, 2) || []} navigate={navigate} />
                            <EventsSection articles={articlesData.filter(a => a.category.toLowerCase() !== 'world').slice(0, 2)} navigate={navigate} />
                        </div>
                        <FinancialSection articles={indexedArticles.byCategory['financial'] || []} navigate={navigate} />
                        <Newsletter />
                    </>
                );
            case 'article':
                return <ArticleDetail articleId={currentView.articleId} articlesData={articlesData} navigate={navigate} />;
            case 'section':
                return <SectionView sectionId={currentView.sectionId} articlesData={articlesData} indexedArticles={indexedArticles} navigate={navigate} searchParams={searchParams} setSearchParams={setSearchParams} />;
            case 'search':
                return <SearchView articlesData={articlesData} navigate={navigate} searchParams={searchParams} setSearchParams={setSearchParams} />;
            case 'about':
                return <AboutUsView />;
            case 'contact':
                return <ContactUsView />;
            case 'privacy':
                return <PrivacyPolicyView />;
            default:
                return <div className="text-center py-8">View not found.</div>;
        }
    };

    return (
        <main id="main-content" className={`flex-grow ${currentView.view === 'article' || currentView.view === 'section' || currentView.view === 'search' || currentView.view === 'about' || currentView.view === 'contact' || currentView.view === 'privacy' ? 'min-h-screen flex flex-col items-center justify-center bg-white p-4' : ''}`}>
            {renderView()}
        </main>
    );
};

export default MainContent;
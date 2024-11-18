// pages/index.tsx


import NewsSearch from './api/NewsSearch';

const Home: React.FC = () => {
    return (
        <div>
          <main className="container mx-auto p-4">
                <h1 className="text-center text-2xl font-bold my-6">News Search</h1>
                <NewsSearch />
            </main>
        </div>
    );
};

export default Home;

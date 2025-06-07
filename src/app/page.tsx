"use client";

import { useState } from 'react';

interface Recipe {
    id: number;
    title: string;
    image: string;
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
}

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchAttempted, setSearchAttempted] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setIsLoading(true);
        setRecipes([]);
        setSearchAttempted(true);

        const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && Array.isArray(data.results)) {
                setRecipes(data.results);
            } else {
                console.log("API-ul nu a returnat rezultate valide:", data);
            }
        } catch (error) {
            console.error("A apărut o eroare la căutare:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Containerul principal, acum relativ pentru a poziționa elementele
        <main className="relative min-h-screen w-full">

            {/* 1. FUNDALUL VIDEO */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                {/* Sursa videoclipului din folderul /public */}
                <source src="/background-video.mp4" type="video/mp4" />
                Browser-ul tău nu suportă tag-ul video.
            </video>

            {/* 2. STRAT SEMI-TRANSPARENT (Overlay) */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

            {/* 3. CONȚINUTUL PAGINII */}
            <div className="relative z-20 text-foreground flex flex-col items-center pt-20 px-4">

                <h1 className="text-4xl md:text-6xl font-bold text-center font-heading">
                    TEST DEPLOYMENT 123 - DACA VEZI ASTA, MERGE!
                </h1>

                <p className="opacity-80 mt-2 text-center">
                    Caută printre mii de rețete folosind ingredientele tale preferate.
                </p>

                <div className="mt-8 flex w-full max-w-2xl">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex: pui, roșii, paste..."
                        className="flex-grow p-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-l-lg focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-r-lg hover:opacity-90 transition-opacity font-semibold disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? '...' : 'Caută'}
                    </button>
                </div>

                <div className="mt-12 w-full max-w-7xl text-center">
                    {isLoading ? (
                        <LoadingSpinner/>
                    ) : recipes.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-20 text-left">
                            {recipes.map((recipe: Recipe) => (
                                <a
                                    key={recipe.id}
                                    href={`/recipe/${recipe.id}`}
                                    className="group block overflow-hidden rounded-lg border border-primary/20 bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-heading font-bold truncate">{recipe.title}</h3>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : searchAttempted ? (
                        <p className="opacity-70 text-xl mt-8">Oops! Nu am găsit nicio rețetă. Încearcă alți
                            termeni!</p>
                    ) : null}
                </div>
            </div>
        </main>
    );
}
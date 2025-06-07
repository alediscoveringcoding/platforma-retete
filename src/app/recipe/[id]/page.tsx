// FIX 1: Forțăm Next.js să trateze pagina ca fiind complet dinamică
export const dynamic = 'force-dynamic';

import Image from 'next/image';

// Definim o interfață detaliată pentru obiectul rețetă
interface RecipeDetails {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    instructions: string;
    extendedIngredients: {
        id: number;
        original: string;
    }[];
}

// Funcția care preia datele de la API pentru un singur ID
async function getRecipeDetails(id: string): Promise<RecipeDetails> {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
    }
    return await response.json();
}

// FIX 2: Definim formal tipul de date pentru props, conform convenției Next.js
type Props = {
    params: { id: string };
};

// Componenta de pagină, cu toate stilurile și corecțiile
export default async function RecipeDetailPage({ params }: Props) {

    try {
        const recipe = await getRecipeDetails(params.id);
        return (
            <main className="bg-background text-foreground min-h-screen py-12">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">{recipe.title}</h1>

                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={800}
                        height={500}
                        className="w-full h-auto rounded-lg shadow-lg mb-6"
                    />

                    <div className="flex justify-around bg-card p-4 rounded-lg mb-8 text-center">
                        <div><p className="text-sm opacity-70">Porții</p><p className="text-2xl font-bold">{recipe.servings}</p></div>
                        <div><p className="text-sm opacity-70">Timp Total</p><p className="text-2xl font-bold">{recipe.readyInMinutes} min</p></div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-heading font-semibold mb-4">Ingrediente</h2>
                        <ul className="list-disc list-inside bg-card p-6 rounded-lg border border-primary/20">
                            {recipe.extendedIngredients.map((ingredient) => (<li key={ingredient.id} className="mb-2">{ingredient.original}</li>))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-heading font-semibold mb-4">Instrucțiuni</h2>
                        <div
                            className="prose prose-invert max-w-none bg-card p-6 rounded-lg border border-primary/20"
                            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                        />
                    </div>
                </div>
            </main>
        );
    } catch (_error) { // FIX 3: Folosim variabila _error pentru a satisface regula ESLint
        console.error("Eroare la preluarea detaliilor rețetei pe server:", _error);
        return (
            <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-3xl font-bold font-heading text-red-500">Rețeta nu a fost găsită!</h1>
                    <p className="opacity-80">ID-ul de rețetă din URL nu este valid sau a apărut o problemă.</p>
                </div>
            </main>
        );
    }
}
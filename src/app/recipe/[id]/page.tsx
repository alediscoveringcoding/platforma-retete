// Versiune de test, simplificată, dar cu tip de date corect pentru a trece de linter
export const dynamic = 'force-dynamic';

// Definim 'forma' props-urilor, simplu.
// Aceasta îi va plăcea lui TypeScript și lui ESLint.
type Props = {
    params: { id: string };
};

// Folosim tipul nostru 'Props' în loc de 'any'
export default function RecipeDetailPage({ params }: Props) {
    return (
        <div style={{ padding: '4rem', color: 'white', backgroundColor: 'black', fontFamily: 'monospace' }}>
            <h1 style={{ fontSize: '2rem', color: 'lime' }}>PAGINĂ DE TEST</h1>
            <p style={{ marginTop: '1rem' }}>Dacă vezi acest mesaj, înseamnă că procesul de build a funcționat.</p>
            <p style={{ marginTop: '1.5rem', color: '#00ff00' }}>ID-ul din URL este: <strong>{params.id}</strong></p>
        </div>
    );
}
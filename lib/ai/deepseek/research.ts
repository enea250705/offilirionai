// This is a simplified research module for Ilirion AI
// In a production environment, this would interface with real search APIs

type ResearchResult = {
  title: string;
  content: string;
  source: string;
  relevance: number;
};

/**
 * Format research results into a string that can be used in the AI's context
 */
export function formatResearchResults(results: ResearchResult[]): string {
  if (!results || results.length === 0) {
    return "Nuk u gjetën informacione të rëndësishme.";
  }

  // Sort results by relevance (descending)
  const sortedResults = [...results].sort((a, b) => b.relevance - a.relevance);
  
  // Take the top 3 most relevant results
  const topResults = sortedResults.slice(0, 3);
  
  // Format them for inclusion in the system prompt
  return topResults.map((result, index) => {
    return `INFORMACION ${index + 1}:\nTitulli: ${result.title}\nPërmbajtja: ${result.content}\nBurimi: ${result.source}`;
  }).join('\n\n');
}

/**
 * Mock implementation of a research function 
 * This would be replaced with actual search API calls in production
 */
export async function performResearch(query: string): Promise<ResearchResult[]> {
  // In a real implementation, this would call external search APIs
  // For this demo, we'll return mock data about Albania
  
  // Detect if the query is about Albanian history
  if (query.toLowerCase().includes('history') || 
      query.toLowerCase().includes('histori') || 
      query.toLowerCase().includes('history')) {
    return [
      {
        title: "Historia e Shqipërisë",
        content: "Shqipëria ka një histori të pasur që daton që nga koha e Ilirisë. Ilirët ishin banorët e lashtë të Ballkanit perëndimor, të cilët u vendosën në këto toka rreth vitit 1000 p.e.s. Gjatë historisë, Shqipëria ka qenë nën sundimin e Perandorisë Romake, Perandorisë Bizantine, dhe Perandorisë Osmane.",
        source: "Enciklopedia Shqiptare",
        relevance: 0.95
      },
      {
        title: "Skënderbeu - Heroi Kombëtar",
        content: "Gjergj Kastrioti, i njohur si Skënderbeu, është heroi kombëtar i Shqipërisë. Ai udhëhoqi rezistencën kundër Perandorisë Osmane në shekullin XV dhe mbrojti me sukses vendin për më shumë se dy dekada.",
        source: "Historia e Ballkanit",
        relevance: 0.85
      }
    ];
  }
  
  // Detect if the query is about Albanian language
  if (query.toLowerCase().includes('language') || 
      query.toLowerCase().includes('gjuh') || 
      query.toLowerCase().includes('speak')) {
    return [
      {
        title: "Gjuha Shqipe",
        content: "Gjuha shqipe është një gjuhë indo-evropiane që formon një degë të veçantë në këtë familje gjuhësore. Ajo flitet nga rreth 7.5 milionë njerëz, kryesisht në Shqipëri, Kosovë, Maqedoni të Veriut, Serbi, Mal të Zi dhe nga diaspora shqiptare në mbarë botën.",
        source: "Studime Gjuhësore Shqiptare",
        relevance: 0.98
      },
      {
        title: "Alfabeti Shqip",
        content: "Alfabeti shqip përbëhet nga 36 shkronja. Ai u standardizua në vitin 1908 në Kongresin e Manastirit dhe bazohet kryesisht në alfabetin latin, me disa shkronja shtesë për të përfaqësuar tinguj specifikë të gjuhës shqipe.",
        source: "Akademia e Shkencave e Shqipërisë",
        relevance: 0.82
      }
    ];
  }
  
  // Default results for other queries
  return [
    {
      title: "Republika e Shqipërisë",
      content: "Shqipëria është një vend në Evropën Juglindore me një popullsi prej rreth 2.8 milionë banorësh. Kryeqyteti i saj është Tirana. Vendi kufizohet me Malin e Zi në veri, Kosovën në verilindje, Maqedoninë e Veriut në lindje dhe Greqinë në jug.",
      source: "Enciklopedia Botërore",
      relevance: 0.75
    }
  ];
} 
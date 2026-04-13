/**
 * Realiza a chamada fetch para a API TheCocktailDB.
 * @param {string} termo - Nome da bebida para busca.
 * @returns {Promise<Array|null>} - Lista de bebidas ou null se vazio.
 */
export const buscarBebidas = async (termo) => {
    try {
        // 1. Faz a requisição assíncrona para a URL da API usando o termo de busca
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${termo}`);
        
        // 2. Converte a resposta bruta em um objeto JSON utilizável
        const data = await response.json();
        
        // 3. Retorna apenas o array de drinks (ou null se não encontrar nada)
        return data.drinks;
    } catch (error) {
        // 4. Caso ocorra erro de rede ou na API, exibe no console e retorna null
        console.error("Erro na API:", error);
        return null;
    }
};
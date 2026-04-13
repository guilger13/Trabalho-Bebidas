/**
 * Salva um objeto de bebida no localStorage.
 * @param {Object} bebida - Objeto da bebida vindo da API.
 */
export const salvarNoStorage = (bebida) => {
    // 1. Tenta recuperar a lista atual de favoritos ou cria um array vazio
    const favoritos = JSON.parse(localStorage.getItem('bebidas')) || [];
    
    // 2. Verifica se o drink já existe na lista para evitar duplicatas
    if (!favoritos.find(b => b.idDrink === bebida.idDrink)) {
        // 3. Adiciona o novo drink ao array
        favoritos.push(bebida);
        // 4. Salva o array atualizado de volta no LocalStorage convertido em string
        localStorage.setItem('bebidas', JSON.stringify(favoritos));
    }
};

/**
 * Remove um item do localStorage pelo ID.
 * @param {string} id - O idDrink da bebida.
 * @returns {Array} - Lista atualizada.
 */
export const excluirDoStorage = (id) => {
    // 1. Recupera a lista atual
    let favoritos = JSON.parse(localStorage.getItem('bebidas')) || [];
    
    // 2. Cria uma nova lista filtrando (removendo) o drink com o ID informado
    favoritos = favoritos.filter(b => b.idDrink !== id);
    
    // 3. Salva a lista reduzida no LocalStorage
    localStorage.setItem('bebidas', JSON.stringify(favoritos));
    
    return favoritos;
};
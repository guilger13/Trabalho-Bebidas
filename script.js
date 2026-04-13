import { buscarBebidas } from './api.js';
import { salvarNoStorage, excluirDoStorage } from './storage.js';

let buscaAtual = []; // Armazena os resultados da última pesquisa
let idParaRemover = null; // Armazena temporariamente o ID do drink que o usuário quer excluir

/**
 * Sistema de Notificações (Toast)
 */
const mostrarMensagem = (texto, tipo = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // 1. Cria o elemento da notificação
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    const icone = tipo === 'success' ? '✨' : '⚠️';
    
    // 2. Define o conteúdo visual da mensagem
    toast.innerHTML = `
        <span style="font-size: 1.5rem;">${icone}</span>
        <div>
            <span style="font-weight: 600; display: block;">${tipo === 'success' ? 'Sucesso' : 'Ops'}</span>
            <span style="font-size: 0.9rem;">${texto}</span>
        </div>
    `;
    
    // 3. Adiciona à tela e remove automaticamente após 3 segundos
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};

/**
 * Expõe funções para o escopo global (necessário para usar em 'onclick' dentro de módulos)
 */
window.favoritar = (id) => {
    // Busca o objeto completo do drink dentro dos resultados atuais
    const bebida = buscaAtual.find(b => b.idDrink === id);
    if (bebida) {
        salvarNoStorage(bebida);
        mostrarMensagem(`${bebida.strDrink} salvo!`, 'success');
    }
};

window.remove = (id) => {
    // Guarda o ID e abre o modal de confirmação
    idParaRemover = id;
    const modal = document.getElementById('modalConfirmacao');
    if (modal) {
        modal.classList.add('active');
    }
};

/**
 * Inicialização e Eventos ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
    // Configura o botão 'Cancelar' do modal
    document.getElementById('btnCancelarRemocao')?.addEventListener('click', () => {
        document.getElementById('modalConfirmacao').classList.remove('active');
        idParaRemover = null;
    });

    // Configura o botão 'Confirmar' do modal
    document.getElementById('btnConfirmarRemocao')?.addEventListener('click', () => {
        if (idParaRemover) {
            excluirDoStorage(idParaRemover);
            atualizarInterface(); // Recarrega a tela sem o item excluído
            mostrarMensagem("Removido dos favoritos", "success");
        }
        document.getElementById('modalConfirmacao').classList.remove('active');
        idParaRemover = null;
    });

    carregarSugestoes(); // Inicia a carga inicial de drinks
});

/**
 * Renderização dinâmica da Interface
 */
const atualizarInterface = () => {
    const container = document.getElementById('gridBebidas');
    if (!container) return;

    // Identifica se estamos na página de favoritos ou na principal
    const isFavoritosPage = window.location.href.includes('favoritos.html');
    
    // Define quais bebidas exibir: do LocalStorage ou da Busca Atual
    const bebidas = isFavoritosPage 
        ? (JSON.parse(localStorage.getItem('bebidas')) || []) 
        : buscaAtual;

    container.innerHTML = '';

    // Caso a lista de favoritos esteja vazia
    if (isFavoritosPage && bebidas.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px; opacity: 0.6;">
                <p style="font-size: 1.5rem;">🚫 Ainda não tem nenhuma bebida favoritada.</p>
                <a href="index.html" style="color: var(--primary-gold); text-decoration: none;">Clique aqui para buscar drinks</a>
            </div>
        `;
        return;
    }

    // Gera o HTML de cada card de drink
    bebidas.forEach(b => {
        // Define se o botão será de 'Excluir' (lixeira) ou 'Favoritar' (estrela)
        const acao = isFavoritosPage 
            ? `<button onclick='window.remove("${b.idDrink}")' class="btn-excluir-card" title="Excluir">🗑️</button>` 
            : `<span class="star-icon" style="cursor:pointer" onclick='window.favoritar("${b.idDrink}")'>⭐</span>`;

        container.innerHTML += `
            <div class="drink-card">
                <img src="${b.strDrinkThumb}" class="drink-card-image" alt="${b.strDrink}">
                <div class="drink-card-body">
                    <h3 class="drink-card-title">
                        ${b.strDrink} 
                        ${!isFavoritosPage ? acao : ''}
                    </h3>
                    <p style="color: var(--accent-orange); font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">
                        ${b.strCategory}
                    </p>
                    <p class="drink-card-instructions">${b.strInstructions || 'Sem instruções.'}</p>
                    ${isFavoritosPage ? `<div style="display: flex; justify-content: flex-end; margin-top: auto;">${acao}</div>` : ''}
                </div>
            </div>`;
    });
};

/**
 * Busca e Sugestões iniciais
 */
const carregarSugestoes = async () => {
    const isFavoritosPage = window.location.href.includes('favoritos.html');
    // Se estiver na index e não houver busca, traz sugestões com a letra 'm'
    if (!isFavoritosPage && buscaAtual.length === 0) {
        const sugestoes = await buscarBebidas('m');
        if (sugestoes) {
            buscaAtual = sugestoes.slice(0, 8);
            atualizarInterface();
        }
    } else {
        // Se estiver nos favoritos, apenas atualiza a interface com o que está no Storage
        atualizarInterface();
    }
};

// Evento de submissão do formulário de busca
document.getElementById('formBusca')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    const termo = document.getElementById('inputNome').value.trim();
    const resultados = await buscarBebidas(termo);
    
    if (resultados) {
        const titulo = document.getElementById('tituloSecao');
        if (titulo) titulo.innerText = "Resultados da Busca";
        buscaAtual = resultados;
        atualizarInterface();
    } else {
        mostrarMensagem("Bebida não encontrada!", "error-center");
    }
});
document.getElementById('btnBuscar').addEventListener('click', async (event) => {
  event.preventDefault();

  let pesquisar = document.getElementById('search').value || 'tecnologia';

  const container = document.getElementById('news-container');
  container.innerHTML = `<p class="loading">Carregando notícias...</p>`;

  const apiKey = 'fc13b4d6496b4281a3808698aac5339c';
  const url = `https://newsapi.org/v2/everything?q=${pesquisar}&language=pt&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json(); // ✅ corrigido aqui

    container.innerHTML = '';

    if (!dados.articles || dados.articles.length === 0) {
      container.innerHTML = `<p>Nenhuma notícia encontrada sobre "${pesquisar}".</p>`;
      return;
    }

    // criar cards dinamicamente
    dados.articles.forEach((noticia) => {
      const card = document.createElement('div');
      card.classList.add('news-card');
      card.innerHTML = `
        <img src="${noticia.urlToImage || 'https://via.placeholder.com/400x200'}" alt="Imagem da notícia">
        <div class="content">
          <h3>${noticia.title}</h3>
          <p>${noticia.description || 'Sem descrição disponível.'}</p>
          <a href="${noticia.url}" target="_blank">Ler mais</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro no servidor:', erro);
    container.innerHTML = `<p>Erro ao carregar notícias. Tente novamente.</p>`;
  }
});

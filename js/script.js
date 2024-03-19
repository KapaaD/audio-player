let currentIndex = localStorage.getItem('currentIndex') || 0;

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {

    const addItemToDOM = (element) => {

      const playerContainer = document.querySelector('.player');

      // Limpa o conteúdo anterior

      playerContainer.innerHTML = '';

      playerContainer.insertAdjacentHTML('beforeend', `
        <p id="nome-album">nome do album</p>

        <img id="capa" src="${element.image}" alt="${element.image}">

        <audio id="audio" src="${element.audio}"></audio>

        <div class="depois-capa">

          <div class="nomes">

            <p id="nome-musica" title="${element['nome-musica']}">${element['nome-musica']}</p>

            <p id="nome-banda" class="cor-leve">${element['nome-banda']}</p>

          </div>

          <button id="like" class="button cor-leve"><i class="bi bi-heart"></i></button>

        </div>

        <div id="bar">
          <div id="progresso"></div>
        </div>

        <div class="bottoes">  

          <button id="shuffle" class="button"><i class="bi bi-shuffle"></i></button>

          <button id="previous" class="button button-navigate"><i class="bi bi-skip-start-fill"></i></button>

          <button id="play" class="button button-big"><i class="bi bi-play-circle-fill"></i></button>

          <button id="next" class="button button-navigate"><i class="bi bi-skip-end-fill"></i></button>

          <button id="repeat" class="button"><i class="bi bi-repeat"></i></button>

        </div>`);

      //   Atualiza as variáveis após a inserção do HTML no DOM isso não é feito antes pq daria null ou seja erro já que vc estaria tentando ler o HTML antes dele existir

      const song = document.getElementById("audio");
      const nomeBanda = document.getElementById("nome-banda");
      const nomeMusica = document.getElementById("nome-musica");
      const capa = document.getElementById("capa");
      const previous = document.getElementById("previous");
      const play = document.getElementById("play");
      const next = document.getElementById("next");
      const like = document.getElementById("like");

      let infoSong = document.querySelector(".nomes");

      let isPlaying = false;

      // let liked = false;

      function playSong() {
        play.querySelector('.bi').classList.remove('bi-play-circle-fill')
        play.querySelector('.bi').classList.add('bi-pause-circle-fill')
        song.play();
        isPlaying = true;
      }

      function pauseSong() {
        play.querySelector('.bi').classList.add('bi-play-circle-fill')
        play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
        song.pause();
        isPlaying = false;
      }

      function playPauseDecider() {
        if (isPlaying === true) {
          pauseSong();
        } else {
          playSong();
        }
      }

      play.addEventListener('click', playPauseDecider);
      previous.addEventListener('click', handlePreviousClick);
      next.addEventListener('click', handleNextClick);
    };

    // Mostra o item armazenado no índice atual
    addItemToDOM(data[currentIndex]);

    // Função para lidar com o clique no botão "Anterior"

    function handlePreviousClick() {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      addItemToDOM(data[currentIndex]);
      playSong();
      localStorage.setItem('currentIndex', currentIndex);
    }

    // Função para lidar com o clique no botão "Próximo"

    function handleNextClick() {
      currentIndex = (currentIndex + 1) % data.length;
      addItemToDOM(data[currentIndex]);
      playSong();
      localStorage.setItem('currentIndex', currentIndex);
    }

    // function favorito() {
    //   like.querySelector('.bi').classList.remove('bi-heart-fill');
    //   like.querySelector('.bi').classList.add('bi-heart');
    //   liked = true;
    // }
    
    // function favoritoOff() {
    //   like.querySelector('.bi').classList.remove('bi-heart');
    //   like.querySelector('.bi').classList.add('bi-heart-fill');
    //   liked = false;
    // }

    // like.addEventListener('click', function() {
    //   if (liked) {
    //     favoritoOff();
    //   } else {
    //     favorito();
    //   }
    // });
    document.addEventListener('click', event => {

      if (event.target.classList.contains('like')) {

        let icon = event.target.querySelector('i');
        
        let iconeAntes = "bi-heart";
        let iconeDepois = "bi-heart-fill";
        
        if (icon.classList.contains(iconeAntes)) {
            icon.classList.replace(iconeAntes, iconeDepois);
        }
      }

    })
    
    })
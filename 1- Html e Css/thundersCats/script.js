const personagens = {
    'lion-o': {
        nome: "Lion-O",
        descricao: "Líder dos Thundercats. Apesar de jovem, possui a Espada de Omens (Sword of Omens) e a sabedoria dos Antepassados. Ele é o guardião do Third Earth.",
        arma: "Espada de Omens",
        cor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        img: "img/lion-o.png"
    },
    'cheetara': {
        nome: "Cheetara",
        descricao: "A guerreira mais rápida de Third Earth. Ela possui sentidos aguçados e um bastão Bojté. Ela é a conselheira de Lion-O e uma lutadora formidável.",
        arma: "Bastão Bojté",
        cor: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
        img: "img/cheetara.png"
    },
    'panthro': {
        nome: "Panthro",
        descricao: "O mais habilidoso mecânico e inventor do grupo. Ele construiu a Tanque Thunder e é conhecido por sua força bruta e pelos nunchucks.",
        arma: "Nunchucks",
        cor: "linear-gradient(135deg, #000000 0%, #434343 100%)",
        img: "img/PAN.JPG"
    },
    'mumm-ra': {
        nome: "Mumm-Ra",
        descricao: "O eterno malévolo. Um mumificado antigo que ganha poder quando se aproxima da Pyramide. Seu objetivo é destruir os Thundercats.",
        arma: "Magia Sombria",
        cor: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        img: "img/mumm-ra.png"
    },
    'Simiano': {
        nome: "Simiano",
        descricao: "Membro da raça dos Homens-Chacais, Simiano é o mais covarde e astuto entre os generais Mutantes. Embora prefira evitar o confronto direto, ele é extremamente traiçoeiro.",
        arma: "Ele utiliza principalmente uma Clava (ou taco de madeira com pregos/espinhos) e um Escudo redondo metálico que dispara raios lasers ou pode ser usado para defesa.",
        cor: "linear-gradient(135deg, #632303 0%, #000000 100%)",
        img: "img/Simiano.JPG"
    }
};

function mostrarPersonagem(id) {
    const dados = personagens[id];

    if (dados) {
        document.getElementById('nome-personagem').innerText = dados.nome;
        document.getElementById('desc-personagem').innerText = dados.descricao;
        document.getElementById('arma-personagem').innerText += dados.arma;
        document.getElementById('img-personagem').src = dados.img;

        const fundo = document.getElementById('tela-fundo');
        fundo.style.background = dados.cor;
        fundo.style.background += ", url('https://www.transparenttextures.com/patterns/stardust.png')";

        //  telas
        document.getElementById('tela-selecao').classList.remove('tela-ativa');
        document.getElementById('tela-selecao').classList.add('tela-oculta');

        document.getElementById('tela-personagem').classList.remove('tela-oculta');
        document.getElementById('tela-personagem').classList.add('tela-ativa');
    }
}

function voltar() {

    document.getElementById('arma-personagem').innerText = "Arma: ";

    document.getElementById('tela-fundo').style.background = "linear-gradient(45deg, #000000, #1e3c72)";

    document.getElementById('tela-personagem').classList.remove('tela-ativa');
    document.getElementById('tela-personagem').classList.add('tela-oculta');

    document.getElementById('tela-selecao').classList.remove('tela-oculta');
    document.getElementById('tela-selecao').classList.add('tela-ativa');
}
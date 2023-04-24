var pontos = 0;
var corCobra = "green"; // cor padrão da cobra

// Criar o canvas e definir suas propriedades
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var tamanhoQuadrado = 10;
var largura = canvas.width;
var altura = canvas.height;

// Criar a cobrinha
var cobrinha = [];
cobrinha[0] = {
    x: Math.floor(largura/tamanhoQuadrado) / 2 * tamanhoQuadrado,
    y: Math.floor(altura/tamanhoQuadrado) / 2 * tamanhoQuadrado
};

// Criar a comida
var comida = {
    x: Math.floor(Math.random() * (largura/tamanhoQuadrado)) * tamanhoQuadrado,
    y: Math.floor(Math.random() * (altura/tamanhoQuadrado)) * tamanhoQuadrado
};

// Definir a direção inicial
var direcao;

// Capturar as teclas pressionadas
document.addEventListener("keydown", function(event) {
    if(event.key == "a" && direcao != "direita") {
        direcao = "esquerda";
    } else if(event.key == "w" && direcao != "baixo") {
        direcao = "cima";
    } else if(event.key == "d" && direcao != "esquerda") {
        direcao = "direita";
    } else if(event.key == "s" && direcao != "cima") {
        direcao = "baixo";
    }
});


// Desenhar a cobrinha e a comida
function desenhar() {
    ctx.clearRect(0, 0, largura, altura);
    for(var i = 0; i < cobrinha.length; i++) {
        ctx.fillStyle = corCobra;
        ctx.fillRect(cobrinha[i].x, cobrinha[i].y, tamanhoQuadrado, tamanhoQuadrado);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, tamanhoQuadrado, tamanhoQuadrado);
}

//Atualiza a cor da cobra
function atualizarCor() {
    var selecionado = document.getElementById("selecao-cor");
    corCobra = selecionado.value;
  }
  

// Atualizar a posição da cobrinha e detectar colisões
function atualizar() {
    var cabecaX = cobrinha[0].x;
    var cabecaY = cobrinha[0].y;

    if(direcao == "direita") cabecaX += tamanhoQuadrado;
    else if(direcao == "esquerda") cabecaX -= tamanhoQuadrado;
    else if(direcao == "cima") cabecaY -= tamanhoQuadrado;
    else if(direcao == "baixo") cabecaY += tamanhoQuadrado;

if(cabecaX == comida.x && cabecaY == comida.y) {
    comida = {
        x: Math.floor(Math.random() * (largura/tamanhoQuadrado)) * tamanhoQuadrado,
        y: Math.floor(Math.random() * (altura/tamanhoQuadrado)) * tamanhoQuadrado
    };
    pontos++; // incrementa a variável "pontos"
    document.getElementById("pontos").innerHTML = pontos; // atualiza a pontuação exibida na tela
} else {
    cobrinha.pop();
}
    

var novaCabeca = {
    x: cabecaX,
    y: cabecaY
};

if(cabecaX < 0 || cabecaX >= largura || cabecaY < 0 || cabecaY >= altura || colisao(novaCabeca, cobrinha)) {
    clearInterval(intervaloJogo);
}

cobrinha.unshift(novaCabeca);
}

// Detectar colisão entre a cabeça da cobrinha e seu corpo
function colisao(cabeca, corpo) {
for(var i = 0; i < corpo.length; i++) {
if(cabeca.x == corpo[i].x && cabeca.y == corpo[i].y) {
return true;
}
}
return false;
}

// Iniciar o jogo
var intervaloJogo = setInterval(function() {
desenhar();
atualizar();
}, 100);

//reiniciar
function reiniciar() {
clearInterval(intervaloJogo); // Limpa o intervalo de atualização do jogo
cobrinha = []; // Limpa a cobra
cobrinha[0] = {
    x: Math.floor(largura/tamanhoQuadrado) / 2 * tamanhoQuadrado,
    y: Math.floor(altura/tamanhoQuadrado) / 2 * tamanhoQuadrado
};
comida = { // Gera nova comida
    x: Math.floor(Math.random() * (largura/tamanhoQuadrado)) * tamanhoQuadrado,
    y: Math.floor(Math.random() * (altura/tamanhoQuadrado)) * tamanhoQuadrado
};
direcao = null; // Reseta a direção
pontos = 0; // Zera os pontos
document.getElementById("pontos").innerHTML = pontos; // Atualiza a pontuação exibida na tela
intervaloJogo = setInterval(function() { // Inicia novo intervalo de atualização do jogo
    desenhar();
    atualizar();
}, 100);
}


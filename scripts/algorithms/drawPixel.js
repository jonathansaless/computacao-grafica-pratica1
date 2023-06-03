// Função para desenhar um pixel em um ponto específico da janela de pixels
export function drawPixel(pointX, pointY, color) {
    // Cria um ID para identificar o ponto com base nas coordenadas pointX e pointY
    const pointID = `${pointX}_${pointY}`;

    // Obtém o elemento HTML do ponto com o ID correspondente
    const pointElement = document.getElementById(pointID);

    // Define a cor de fundo do ponto como a cor fornecida
    pointElement.style.backgroundColor = color;

    // Se a cor for Branca, então o pixel está sendo apagado. Logo, a classe painted é removida
    if(color == '#ffffff'){
        // Remove a classe 'painted' ao ponto para indicar que não está mais pintado
        pointElement.classList.remove('painted');
    }
    else{
        // Adiciona a classe 'painted' ao ponto para indicar que foi pintado
        pointElement.classList.add('painted');
    }
    
}

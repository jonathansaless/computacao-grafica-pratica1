var buttons = document.querySelectorAll('.menu-button');
var previousButton = null;
var inputContainer = document.getElementById('input-container');

function changeBackgroundColor(event) {
    var button = event.target;

    if (previousButton !== null) {
        previousButton.classList.remove('selected');
    }

    button.classList.add('selected');
    previousButton = button;

    // criar função para alterar o que vai ser solicitado ao 
    // usuario a depender o botão que está selecionado
    // Chame a função correspondente com base no botão selecionado
    handleButtonClick(button);
}

function handleButtonClick(button) {
    var buttonText = button.innerText;
    // Exemplo: Executar ação com base no texto do botão selecionado
    
    // Remova os inputs anteriores
    inputContainer.innerHTML = '';
    
    switch (buttonText) {
      case 'Bresenham':
        createInput('text', 'Digite um texto');
        break;
      case 'Circulo':
        createInput('number', 'Digite um número');
        break;
      case 'Curva':
        createInput('date', 'Selecione uma data');
        break;
      default:
        console.log('Botão inválido');
        break;
    }
  }

function createInput(type, placeholder) {
    var input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    inputContainer.appendChild(input);
}

buttons.forEach(function(button) {
    button.addEventListener('click', changeBackgroundColor);
});
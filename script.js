let currentDisplay = '';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Set initial display
display.value = currentDisplay;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');

    if (action === 'clear') {
      currentDisplay = '';
    } else if (action === 'delete') {
      currentDisplay = currentDisplay.slice(0, -1);
    } else if (action === 'calculate') {
      calculateResult();
    } else {
      currentDisplay += value;
    }

    display.value = currentDisplay;
  });
});

// For keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    // Handle number keys
    currentDisplay += key;
  } else if (['+', '-', '*', '/'].includes(key)) {
    currentDisplay += key;
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    currentDisplay = currentDisplay.slice(0, -1);
  } else if (key === 'Escape') {
    currentDisplay = '';
  } else if (key === '.') {
    currentDisplay += '.';
  }

  display.value = currentDisplay;
});

// Function to evaluate the current display value
function calculateResult() {
  try {
    // Handle percentage conversion
    if (currentDisplay.includes('%')) {
      const [pre, post] = currentDisplay.split('%');
      currentDisplay = `${parseFloat(pre) * (parseFloat(post) / 100)}`;
    }

    // Evaluate the expression
    currentDisplay = eval(currentDisplay) || '';
  } catch {
    currentDisplay = 'Error';
  }

  display.value = currentDisplay;
}

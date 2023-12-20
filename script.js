document.addEventListener('DOMContentLoaded', () => {
    // Add initial color pickers
    addColorPicker();
    addColorPicker();
    addColorPicker(); // Start with three color pickers

    // Event delegation for color pickers and remove buttons
    const colorPickerContainer = document.getElementById('colorPickerContainer');
    colorPickerContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('color-input')) {
            updateGradient();
        }
    });
    colorPickerContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-color')) {
            removeColorPicker(event);
        }
    });

    // Event listeners for gradient type and copy CSS button
    document.getElementById('addColor').addEventListener('click', addColorPicker);
    document.getElementById('copyCss').addEventListener('click', copyCssToClipboard);
    document.getElementById('gradientType').addEventListener('change', handleGradientTypeChange);

    // Event listeners for linear gradient options
    document.getElementById('linearDirection').addEventListener('change', updateGradient);

    // Event listeners for radial gradient options
    document.getElementById('radialShape').addEventListener('change', updateGradient);
    document.getElementById('radialSize').addEventListener('change', updateGradient);
    document.getElementById('radialPosition').addEventListener('change', updateGradient);

    // Initial gradient update
    updateGradient();
});

function addColorPicker() {
    const colorPickerContainer = document.getElementById('colorPickerContainer');
    colorPickerContainer.insertAdjacentHTML('beforeend', `
        <div class="color-picker">
            <input type="color" class="color-input">
            <button class="remove-color">x</button>
        </div>
    `);
    updateGradient();
}

function removeColorPicker(event) {
    event.target.closest('.color-picker').remove();
    updateGradient();
}

function handleGradientTypeChange() {
    const gradientType = document.getElementById('gradientType').value;
    document.getElementById('linearOptions').style.display = gradientType === 'linear' ? 'block' : 'none';
    document.getElementById('radialOptions').style.display = gradientType === 'radial' ? 'block' : 'none';
    updateGradient();
}

function updateGradient() {
    const colors = Array.from(document.querySelectorAll('.color-input'))
                        .map(input => input.value)
                        .join(', ');
    const gradientType = document.getElementById('gradientType').value;
    const gradientBox = document.getElementById('gradientBox');
    let cssValue;

    if (gradientType === 'linear') {
        const direction = document.getElementById('linearDirection').value;
        cssValue = `linear-gradient(${direction}, ${colors})`;
    } else {
        const shape = document.getElementById('radialShape').value;
        const size = document.getElementById('radialSize').value;
        const position = document.getElementById('radialPosition').value;
        cssValue = `radial-gradient(${shape} ${size} at ${position}, ${colors})`;
    }

    gradientBox.style.background = cssValue;
    document.getElementById('cssCode').value = cssValue;
}


function copyCssToClipboard() {
    const cssCode = document.getElementById('cssCode');
    navigator.clipboard.writeText(cssCode.value).then(() => {
        alert('CSS copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

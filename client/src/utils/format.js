/**
 * Reads all inputs
 * @param {Node} form 
 */
export function readForm(form) {
    // super dirty -- Choices uses additional inputs we dont wanna track
    const inputs = Array.from(form.querySelectorAll("input, select, input[type='hidden']"));
    let formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
  
    return formData;
  }
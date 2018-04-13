
/**
 * Reads all inputs
 * @param {Node} form 
 * @param {Object} schema 
 */
export function readForm(form, schema) {
    // super dirty -- Choices uses additional inputs we dont wanna track
    const inputs = Array.from(form.querySelectorAll("input.uk-input,select.uk-select, input[type='hidden']"));
    let formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
  
    return formData;
  }
  
  
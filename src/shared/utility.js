export const checkValidity = (value, rules) => {
    // Validation
    let isValid = true;

    // Contrôle si vide
    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    // Contrôle la longueur minimale
    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    // Contrôle la longueur maximale
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    // Contrôle si email valide (regex)
    if(rules.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}
document.getElementById("convertir").addEventListener("click", () => {
    const expresion = document.getElementById("expresion").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!expresion) {
        resultadoDiv.innerText = "Por favor, ingresa una expresión válida.";
        return;
    }

    const [resultado, original] = evaluarExpresionPolaca(expresion);
    resultadoDiv.innerHTML = `<p>Resultado: ${resultado}</p><p>Expresión Original: ${original}</p>`;
});

const evaluarExpresionPolaca = (exp) => {
    const stack = [];
    const originalStack = []; // Para almacenar la expresión original
    const operadores = "+-*/";

    const tokens = exp.split(" ").reverse(); // Invertimos el array para procesar correctamente

    for (const token of tokens) {
        if (!operadores.includes(token)) {
            const num = parseFloat(token);
            stack.push(num); // Apilar el operando
            originalStack.push(token); // Almacenar el operando original
        } else {
            const operando1 = stack.pop(); // Saca el primer operando
            const operando2 = stack.pop(); // Saca el segundo operando

            // Calcula el resultado
            const resultado = calcular(operando1, operando2, token);
            stack.push(resultado); // Apilar el resultado

            // Crear la expresión original
            const expOriginal = `(${originalStack.pop()} ${token} ${originalStack.pop()})`;
            originalStack.push(expOriginal); // Almacenar la expresión original
        }
    }

    return [stack.pop(), originalStack.pop()]; // Retorna el resultado y la expresión original
};

const operaciones = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

const calcular = (operando1, operando2, operador) => {
    return operaciones[operador](operando1, operando2);
};

const calculadora = require("../models/calculadora.js");

test("A soma de 2 mais 2 retorna 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

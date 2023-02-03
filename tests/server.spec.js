const request = require("supertest");
const server = require("../index");


describe('GET /cafes Test', () => {
    it('Devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto', async() => {
        const response = await request(server)
            .get('/cafes');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

//tengo duda de este...

describe('Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe', () => {
    it('returns a 404 status code when the cafe ID is not found', async() => {
        const response = await request(server)
            .delete('/cafes/999');

        expect(response.status).not.toBe(404);
    });
});

/// este está ok

describe("Test POST /cafes route", () => {
    test("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.", async() => {
        const response = await request(server)
            .post("/cafes")
            .send({
                id: "5",
                nombre: "Café Nuevo"
            });

        expect(response.statusCode).toBe(201);
        const cafe = response.body.find(c => c.id === "5");
        expect(cafe.nombre).toBe("Café Nuevo");
    });
});

///tengo duda de este

describe("Test PUT /cafes route", () => {
    test("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async() => {
        const response = await request(server)
            .put("/cafes/5")
            .send({
                id: "6",
                nombre: "Café Actualizado",
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).not.toEqual({
            message: "El id en los parámetros debe ser igual al id en el payload",
        });
    });
});
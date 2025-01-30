import request from "supertest";
import { Server } from "http";
import { app, getTestServer } from "../app";
import { connectTestDb, clearTestDb, closeTestDb } from "../configurations/test-db";

let server: Server;

beforeAll(async () => {
    await connectTestDb();
    server = await getTestServer();
});

afterAll(async () => {
    await clearTestDb();
    await closeTestDb();
    await app.close();
});

describe("User Api Test", () => {
    let userId: string;
    it("should create a new user", async () => {
        const response = await request(server)
            .post("/api/usuarios")
            .send({
                nombre: "John",
                apellido: "Doe",
                edad: 18,
                telefono: "1234567890",
                correo: "jhon@gmail.com"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nombre).toBe("John");
        expect(response.body.apellido).toBe("Doe");
        expect(response.body.edad).toBe(18);
        expect(response.body.telefono).toBe("1234567890");
        expect(response.body.correo).toBe("jhon@gmail.com");
        userId = response.body.id;
    });

    it("should get a user by id", async () => {
        const response = await request(server)
            .get(`/api/usuarios/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nombre).toBe("John");
        expect(response.body.apellido).toBe("Doe");
        expect(response.body.edad).toBe(18);
        expect(response.body.telefono).toBe("1234567890");
        expect(response.body.correo).toBe("jhon@gmail.com");
    });

    it("should update a user by id", async () => {
        const response = await request(server)
            .put(`/api/usuarios/${userId}`)
            .send({
                nombre: "Jane",
                apellido: "Doe",
                edad: 20,
                telefono: "1234567890",
                correo: "jane@gmail.com",
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Usuario actualizado");
        expect(response.body.Usuario.nombre).toBe("Jane");
        expect(response.body.Usuario.apellido).toBe("Doe");
        expect(response.body.Usuario.edad).toBe(20);
        expect(response.body.Usuario.telefono).toBe("1234567890");
        expect(response.body.Usuario.correo).toBe("jane@gmail.com");
    })

    it("should get all users", async () => {
        const response = await request(server)
            .get("/api/usuarios");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should search for the users", async () => {
        const response = await request(server)
            .get("/api/usuarios/search")
            .query({ search: "Jane" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should request the search parameter", async () => {
        const response = await request(server)
            .get("/api/usuarios/search");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("El parámetro 'search' es requerido.");
    })
});
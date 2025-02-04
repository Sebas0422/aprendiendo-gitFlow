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

describe("Cuenta Api Test", () => {
    let cuentaId: string;
    let usuarioId: string;
    it("should create a new account", async () => {
        const responseUsuario = await request(server)
            .post("/api/usuarios")
            .send({
                nombre: "John",
                apellido: "Doe",
                edad: 18,
                telefono: "1234567890",
                correo: "jhon@gmail.com"
            });
        usuarioId = responseUsuario.body.id;
        const response = await request(server)
            .post("/api/cuentas")
            .send({
                cuenta: "1234567890",
                nombre: "John",
                monto: 1000,
                usuarioId
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.cuenta).toBe("1234567890");
        expect(response.body.nombre).toBe("John");
        expect(response.body.monto).toBe(1000);
        expect(response.body.usuarioId).toBe(usuarioId);
        cuentaId = response.body.id;
    });

    it("should get a account by id", async () => {
        const response = await request(server)
            .get(`/api/cuentas/${cuentaId}`)

        expect(response.status).toBe(200);
        expect(response.body.cuenta).toBe("1234567890");
        expect(response.body.nombre).toBe("John");
        expect(response.body.monto).toBe(1000);
        expect(response.body.usuarioId).toBe(usuarioId);
    });

    it("should update a account by id", async () => {
        const response = await request(server)
            .put(`/api/cuentas/${cuentaId}`)
            .send({
                cuenta: "1234567890",
                nombre: "Sebastian",
                monto: 1000,
                usuarioId
            });
        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe("Sebastian");
    })

    it("should get all accounts", async () => {
        const response = await request(server)
            .get("/api/cuentas")

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should search for the accounts", async () => {
        const response = await request(server)
            .get("/api/cuentas/search")
            .query({ search: "1000" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should request the search account parameter ", async () => {
        const response = await request(server)
            .get("/api/cuentas/search")

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("El parámetro 'search' es requerido.");
    })
});
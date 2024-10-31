import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Blog API",  
        version: "1.0.0",
        description: "This is a blog API",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts", "./src/app.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
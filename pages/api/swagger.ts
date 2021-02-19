import type { NextApiRequest, NextApiResponse } from "next";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

/**
 * @swagger
 *
 * definitions:
 *   Document:
 *     markdown: string
 *     modifiedAt: string
 *     createAt: string
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - title
 *         - markdown
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the document.
 *        userId
 *           type: integer
 *           description: The owner of the document
 *         title:
 *           type: string
 *           description: The title of the document
 *         markdown:
 *           type: string
 *           description: The markdown of the document
 *         folderId:
 *           type: number
 *         modifiedAt:
 *            type: string
 *            format: datetime
 *         createAt:
 *           type: string
 *           format: datetime
 */

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const projectTopPath = path.resolve(process.cwd());

  const options = {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "clover.md",
        version: "1.0.0",
      },
      host: `localhost:3000`, // Host (optional)
      basePath: "/", // Base path (optional)
    },
    apis: [projectTopPath + "/pages/api/**/*.ts"],
  };

  const swaggerSpecification = swaggerJsdoc(options);

  res.status(200).send(swaggerSpecification);
};

import { BadRequestError } from "../../Errors";

export default (app, opts, next) => {
    app.get(
        "/:imageId",
        {
            schema: {
                tags: [],
                summary: "get the a bunq image by its public uuid",
                response: {
                    200: {
                        description: "Successful response",
                        type: "object",
                        properties: {
                            user: {
                                type: "string"
                            }
                        }
                    }
                },
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const imageId = request.params.imageId;
            if (!imageId) throw new BadRequestError();

            const imageContents = await app.bunqAutomation.getImage(imageId);

            reply.header("Content-Type", "image/png").send(imageContents);
        }
    );

    next();
};

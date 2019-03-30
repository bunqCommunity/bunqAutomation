module.exports = {
    staticFileGlobs: ["build/*.ico"],
    swFilePath: "./build/service-worker.js",
    stripPrefix: "build/",
    minify: true,
    runtimeCaching: [
        {
            urlPattern: /\/api.*/,
            handler: "networkFirst"
        },
        {
            urlPattern: /\/api\/bunq\/image\/.*/,
            handler: "cacheFirst",
            options: {
                cache: {
                    queryOptions: {
                        ignoreSearch: true
                    }
                }
            }
        }
    ]
};

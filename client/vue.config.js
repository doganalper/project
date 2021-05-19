module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/assets/scss/main.scss";
            `
            }
        }
    }
    /* configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
          STATIC_URL: process.env.NODE_ENV === "development" ? 
        } else {
          // mutate for development...
        }
    } */
};

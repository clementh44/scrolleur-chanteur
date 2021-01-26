require = require('esm')(module)
const { routes } = require('./src/Routes.js')

module.exports = {
	pluginOptions: {
		sitemap: {
            baseURL: 'https://chantons.netlify.app',
            pretty: true,
            outputDir: 'public',
			routes
		}
	}
}

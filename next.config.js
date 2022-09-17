module.exports = {
	basePath: '/crowdfunding-front',
	reactStrictMode: true,
	images: {
		domains: ['localhost', 'stage.wprollers.com'],
		formats: ['image/webp'],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};

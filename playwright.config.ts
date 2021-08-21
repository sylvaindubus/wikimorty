import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	use: {
		baseURL: 'http://localhost:3000',
		viewport: { width: 1024, height: 768 },
	},
	testMatch: /.test.ts$/,
}

export default config
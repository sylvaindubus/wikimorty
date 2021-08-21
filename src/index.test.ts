import { test, expect } from '@playwright/test'

test('main', async ({ page }) => {
	await page.goto('/')

	// Check the main app title
	const title = page.locator('data-test-id=title')
	await expect(title).toHaveText('WikiMorty React App')
})

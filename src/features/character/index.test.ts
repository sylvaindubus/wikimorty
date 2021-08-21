import { test, expect } from '@playwright/test'

test('character', async ({ page }) => {
	await page.goto('/character/1')

	// Check the character page content
	const character = await (await page.waitForSelector('[data-test-id=character]')).innerText()
	expect(character).toContain('Rick Sanchez')
	expect(character).toContain('Human')
	expect(character).toContain('Male')

	// Check the quantity of displayed episodes
	const episodes = await page.$$('[data-test-id=episodeLine]')
	expect(episodes.length).toBeGreaterThan(40)
})

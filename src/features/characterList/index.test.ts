import { test, expect } from '@playwright/test'

test('characterList', async ({ page }) => {
	await page.goto('/')

	// Check the first list item
	const firstLineContent = await (await page.waitForSelector('[data-test-id=dataListLine]:first-child')).innerText()
	expect(firstLineContent).toContain('Rick Sanchez')
	expect(firstLineContent).toContain('Human')
	expect(firstLineContent).toContain('Male')

	// Click on a pagination element
	const pageItem = (await page.waitForSelector('[data-test-id=pagination] a:text("2")'))
	await pageItem.click()
	await page.waitForURL('/2')

	// Check if data has changed
	const nameLink = await page.waitForSelector('[data-test-id=dataListLine] *:text("Aqua Morty")');

	// Check if links are working
	await nameLink.click()
	await page.waitForURL('/character/21')
})

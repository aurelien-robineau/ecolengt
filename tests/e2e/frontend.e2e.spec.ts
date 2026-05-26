import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/École de Batterie/)

    const heading = page.locator('h1').first()

    await expect(heading).toContainText('École de Batterie')
  })

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/')

    const skipLink = page.getByRole('link', { name: 'Aller au contenu principal' })
    await skipLink.focus()
    await skipLink.click()

    await expect(page.locator('#contenu-principal')).toBeFocused()
  })

  test('contact page has a single primary heading', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByRole('heading', { level: 1, name: 'Nous contacter' })).toBeVisible()
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('mobile menu opens with keyboard and traps focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'Ouvrir le menu' })
    await menuButton.click()

    await expect(page.getByRole('navigation', { name: 'Navigation mobile' })).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Tab')
    const focusedInNav = await page
      .locator('#mobile-nav a, #mobile-nav button')
      .evaluateAll((elements) => elements.some((element) => element === document.activeElement))
    expect(focusedInNav).toBe(true)
  })
})

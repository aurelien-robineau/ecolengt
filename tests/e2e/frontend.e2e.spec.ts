import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/École de Batterie/)

    await expect(page.getByRole('navigation', { name: 'Navigation principale' })).toBeVisible()
    await expect(page.locator('#contenu-principal')).toBeVisible()
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

    const menuButton = page.locator('button[aria-controls="mobile-nav"]')
    // Keyboard open moves focus into the trap (see Header openMenu + :focus-visible)
    await menuButton.focus()
    await page.keyboard.press('Enter')

    const mobileNav = page.locator('#mobile-nav')
    await expect(mobileNav).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    const focusedInNav = await mobileNav.evaluate((nav) => nav.contains(document.activeElement))
    expect(focusedInNav).toBe(true)
  })
})

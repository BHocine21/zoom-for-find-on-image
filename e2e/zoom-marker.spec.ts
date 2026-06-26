import { expect, test } from '@playwright/test'

test.describe('Zoom for find on image', () => {
  test('places a marker where the image is clicked', async ({ page }) => {
    await page.goto('/')
    const image = page.getByRole('img', { name: 'Carte du monde' })

    await image.click()

    await expect(page.getByTestId('marker-pin')).toBeVisible()
  })

  test('zooms in and back out using the toolbar controls', async ({ page }) => {
    await page.goto('/')
    const slider = page.getByRole('slider', { name: 'Niveau de zoom' })
    const initialValue = await slider.getAttribute('aria-valuenow')

    await page.getByRole('button', { name: 'Augmenter le zoom' }).click()
    await expect(slider).not.toHaveAttribute('aria-valuenow', initialValue ?? '')

    await page.getByRole('button', { name: 'Réinitialiser le zoom' }).click()
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue ?? '')
  })

  test('toggles fullscreen mode and hides the zoom slider', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Activer le plein écran' }).click()
    await expect(page.getByRole('slider')).toHaveCount(0)

    const exitButton = page.getByRole('button', { name: 'Quitter le plein écran' })
    await expect(exitButton).toBeVisible()

    await exitButton.click()
    await expect(page.getByRole('slider', { name: 'Niveau de zoom' })).toBeVisible()
  })
})

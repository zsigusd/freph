import { expect, type Page, test } from '@playwright/test'

const TITLE = {
  chooseRider: 'Choose a rider',
  selectRouler: 'Select a card for the Rouleur',
  selectSprinter: 'Select a card for the Sprinteur',
  finishRound: 'Movement and End phase',
}

const drawRouler = (page: Page) => page.getByRole('button', { name: 'R', exact: true }).click()
const drawSprinter = (page: Page) => page.getByRole('button', { name: 'S', exact: true }).click()
const backButton = (page: Page) => page.getByRole('button', { name: 'Back' })
const nextButton = (page: Page) => page.getByRole('button', { name: 'Next' })

// A drawn card is a button whose visible label is just its numeric value.
const pickFirstCard = (page: Page) => page.getByRole('button').filter({ hasText: /^\d+$/ }).first().click()

async function expectTitle(page: Page, text: string) {
  await expect(page.getByText(text, { exact: true })).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('energy phase helper', () => {
  test('shows the initial choose-rider phase on round 1', async ({ page }) => {
    await expectTitle(page, TITLE.chooseRider)
    await expect(page.getByText('Current round: 1')).toBeVisible()
    await expect(backButton(page)).toBeDisabled()
    await expect(nextButton(page)).toBeDisabled()
  })

  test('plays a full round for both riders and advances to round 2', async ({ page }) => {
    // Rouleur
    await drawRouler(page)
    await expectTitle(page, TITLE.selectRouler)
    await pickFirstCard(page)
    await expectTitle(page, TITLE.chooseRider)

    // Sprinteur
    await drawSprinter(page)
    await expectTitle(page, TITLE.selectSprinter)
    await pickFirstCard(page)

    // Both finished -> movement / end phase
    await expectTitle(page, TITLE.finishRound)
    await expect(nextButton(page)).toBeEnabled()

    // Fatigue cards are available here
    const roulerFatigue = page.getByTitle('Add Rouleur fatigue')
    const sprinterFatigue = page.getByTitle('Add Sprinteur fatigue')
    await expect(roulerFatigue).toBeEnabled()
    await roulerFatigue.click()
    await expect(roulerFatigue).toBeDisabled()
    await sprinterFatigue.click()
    await expect(sprinterFatigue).toBeDisabled()

    // Finish the round
    await nextButton(page).click()
    await expect(page.getByText('Current round: 2')).toBeVisible()
    await expectTitle(page, TITLE.chooseRider)
  })

  test('can undo a draw with the back button', async ({ page }) => {
    await drawRouler(page)
    await expectTitle(page, TITLE.selectRouler)
    await expect(backButton(page)).toBeEnabled()

    await backButton(page).click()
    await expectTitle(page, TITLE.chooseRider)
    await expect(page.getByText('Current round: 1')).toBeVisible()
  })

  test('opens the dismissed cards history after a card is used', async ({ page }) => {
    await drawRouler(page)
    await pickFirstCard(page)

    const history = page.getByRole('button', { name: 'Dismissed cards' })
    // The rouleur history button (second one) should now be enabled.
    await expect(history.last()).toBeEnabled()
    await history.last().click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})

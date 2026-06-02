import { Phase, RiderStatus, useDeckStore } from '@stores/deck'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

const ROULER_DECK_SIZE = 15
const SPRINTER_DECK_SIZE = 15
const CARDS_PER_DRAW = 4

describe('deck store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('starts on round 1 with both riders ready', () => {
      const store = useDeckStore()

      expect(store.state.currentRound).toBe(1)
      expect(store.state.roulerStatus).toBe(RiderStatus.READY)
      expect(store.state.sprinterStatus).toBe(RiderStatus.READY)
      expect(store.state.selectedRouler).toBeNull()
      expect(store.state.selectedSprinter).toBeNull()
      expect(store.state.roulerFatigueAdded).toBe(false)
      expect(store.state.sprinterFatigueAdded).toBe(false)
    })

    it('generates full decks with the expected sizes', () => {
      const store = useDeckStore()

      expect(store.state.roulerDeck).toHaveLength(ROULER_DECK_SIZE)
      expect(store.state.sprinterDeck).toHaveLength(SPRINTER_DECK_SIZE)
    })

    it('has no drawn or used cards yet', () => {
      const store = useDeckStore()

      expect(store.drawnRoulers).toHaveLength(0)
      expect(store.usedRoulers).toHaveLength(0)
      expect(store.drawnSprinters).toHaveLength(0)
      expect(store.usedSprinters).toHaveLength(0)
    })

    it('reports the first step and the choose-rider phase', () => {
      const store = useDeckStore()

      expect(store.isFirstStep).toBe(true)
      expect(store.currentPhase).toBe(Phase.CHOOSE_RIDER)
    })
  })

  describe('drawing', () => {
    it('draws four rouler cards and sets the status to drawn', () => {
      const store = useDeckStore()

      store.drawRouler()

      expect(store.drawnRoulers).toHaveLength(CARDS_PER_DRAW)
      expect(store.state.roulerStatus).toBe(RiderStatus.DRAWN)
      expect(store.currentPhase).toBe(Phase.ROULEUR_SELECTOR)
      expect(store.isFirstStep).toBe(false)
    })

    it('draws four sprinter cards and sets the status to drawn', () => {
      const store = useDeckStore()

      store.drawSprinter()

      expect(store.drawnSprinters).toHaveLength(CARDS_PER_DRAW)
      expect(store.state.sprinterStatus).toBe(RiderStatus.DRAWN)
      expect(store.currentPhase).toBe(Phase.SPRINTEUR_SELECTOR)
    })
  })

  describe('selecting', () => {
    it('plays the chosen rouler card and uses the rest', () => {
      const store = useDeckStore()
      store.drawRouler()
      const chosen = store.drawnRoulers[0]

      store.selectRouler(chosen)

      expect(store.state.roulerStatus).toBe(RiderStatus.FINISHED)
      expect(store.state.selectedRouler).toBe(chosen.value)
      expect(store.drawnRoulers).toHaveLength(0)
      expect(store.usedRoulers).toHaveLength(CARDS_PER_DRAW - 1)
    })

    it('plays the chosen sprinter card and uses the rest', () => {
      const store = useDeckStore()
      store.drawSprinter()
      const chosen = store.drawnSprinters[0]

      store.selectSprinter(chosen)

      expect(store.state.sprinterStatus).toBe(RiderStatus.FINISHED)
      expect(store.state.selectedSprinter).toBe(chosen.value)
      expect(store.drawnSprinters).toHaveLength(0)
      expect(store.usedSprinters).toHaveLength(CARDS_PER_DRAW - 1)
    })

    it('keeps sortedUsed cards ordered by value', () => {
      const store = useDeckStore()
      store.drawRouler()
      store.selectRouler(store.drawnRoulers[0])

      const values = store.sortedUsedRoulers.map((c) => c.value)
      const sorted = [...values].sort((a, b) => a - b)
      expect(values).toEqual(sorted)
    })
  })

  describe('fatigue cards', () => {
    it('adds a fatigue card to the rouler deck', () => {
      const store = useDeckStore()

      store.addRoulerFatigueCard()

      expect(store.state.roulerDeck).toHaveLength(ROULER_DECK_SIZE + 1)
      expect(store.state.roulerFatigueAdded).toBe(true)
      const fatigue = store.usedRoulers.find((c) => c.isFatigue)
      expect(fatigue?.value).toBe(2)
    })

    it('adds a fatigue card to the sprinter deck', () => {
      const store = useDeckStore()

      store.addSprinterFatigueCard()

      expect(store.state.sprinterDeck).toHaveLength(SPRINTER_DECK_SIZE + 1)
      expect(store.state.sprinterFatigueAdded).toBe(true)
    })
  })

  describe('finishing a round', () => {
    it('resets statuses and advances the round', () => {
      const store = useDeckStore()
      store.drawRouler()
      store.selectRouler(store.drawnRoulers[0])
      store.drawSprinter()
      store.selectSprinter(store.drawnSprinters[0])

      store.finishRound()

      expect(store.state.currentRound).toBe(2)
      expect(store.state.roulerStatus).toBe(RiderStatus.READY)
      expect(store.state.sprinterStatus).toBe(RiderStatus.READY)
      expect(store.state.selectedRouler).toBeNull()
      expect(store.state.selectedSprinter).toBeNull()
      expect(store.state.roulerFatigueAdded).toBe(false)
      expect(store.state.sprinterFatigueAdded).toBe(false)
    })

    it('reports the finish-round phase once both riders finished', () => {
      const store = useDeckStore()
      store.drawRouler()
      store.selectRouler(store.drawnRoulers[0])
      store.drawSprinter()
      store.selectSprinter(store.drawnSprinters[0])

      expect(store.currentPhase).toBe(Phase.FINISH_ROUND)
    })
  })

  describe('reshuffle flag', () => {
    it('starts false for both decks', () => {
      const store = useDeckStore()

      expect(store.roulerReshuffledOnLastDraw).toBe(false)
      expect(store.sprinterReshuffledOnLastDraw).toBe(false)
    })

    it('stays false on a normal draw that has enough available cards', () => {
      const store = useDeckStore()

      store.drawRouler()

      expect(store.roulerReshuffledOnLastDraw).toBe(false)
    })

    it('sets only the rouler flag when the rouler deck is reshuffled', () => {
      const store = useDeckStore()

      // Three full rounds consume the 15 available cards without a reshuffle.
      for (let round = 0; round < 3; round++) {
        store.drawRouler()
        store.selectRouler(store.drawnRoulers[0])
        store.finishRound()
      }
      expect(store.roulerReshuffledOnLastDraw).toBe(false)

      // The fourth draw runs out of available cards and forces a reshuffle.
      store.drawRouler()

      expect(store.roulerReshuffledOnLastDraw).toBe(true)
      expect(store.sprinterReshuffledOnLastDraw).toBe(false)
      expect(store.drawnRoulers).toHaveLength(CARDS_PER_DRAW)
    })

    it('sets only the sprinter flag when the sprinter deck is reshuffled', () => {
      const store = useDeckStore()

      for (let round = 0; round < 3; round++) {
        store.drawSprinter()
        store.selectSprinter(store.drawnSprinters[0])
        store.finishRound()
      }
      expect(store.sprinterReshuffledOnLastDraw).toBe(false)

      store.drawSprinter()

      expect(store.sprinterReshuffledOnLastDraw).toBe(true)
      expect(store.roulerReshuffledOnLastDraw).toBe(false)
      expect(store.drawnSprinters).toHaveLength(CARDS_PER_DRAW)
    })

    it('resets the flag to false on the next non-reshuffling draw', () => {
      const store = useDeckStore()

      for (let round = 0; round < 3; round++) {
        store.drawRouler()
        store.selectRouler(store.drawnRoulers[0])
        store.finishRound()
      }
      store.drawRouler()
      expect(store.roulerReshuffledOnLastDraw).toBe(true)

      store.selectRouler(store.drawnRoulers[0])
      store.finishRound()
      store.drawRouler()

      expect(store.roulerReshuffledOnLastDraw).toBe(false)
    })
  })

  describe('undo (toPreviousState)', () => {
    it('restores the state captured before the last action', () => {
      const store = useDeckStore()

      store.drawRouler()
      expect(store.state.roulerStatus).toBe(RiderStatus.DRAWN)

      store.toPreviousState()

      expect(store.state.roulerStatus).toBe(RiderStatus.READY)
      expect(store.drawnRoulers).toHaveLength(0)
    })

    it('does nothing when there is no previous state', () => {
      const store = useDeckStore()

      store.toPreviousState()

      expect(store.state.currentRound).toBe(1)
      expect(store.state.roulerStatus).toBe(RiderStatus.READY)
    })

    it('steps back through multiple saved states', () => {
      const store = useDeckStore()

      store.drawRouler()
      store.selectRouler(store.drawnRoulers[0])
      expect(store.state.roulerStatus).toBe(RiderStatus.FINISHED)

      store.toPreviousState()
      expect(store.state.roulerStatus).toBe(RiderStatus.DRAWN)

      store.toPreviousState()
      expect(store.state.roulerStatus).toBe(RiderStatus.READY)
    })
  })
})

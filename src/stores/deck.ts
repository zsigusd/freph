import { defineStore } from 'pinia'
import { computed, reactive, toRaw } from 'vue'

export enum RiderStatus {
  READY,
  DRAWN,
  FINISHED,
}

export enum Phase {
  CHOOSE_RIDER,
  ROULEUR_SELECTOR,
  SPRINTEUR_SELECTOR,
  FINISH_ROUND,
}

enum CardStatus {
  AVAILABLE,
  USED,
  DRAWN,
  PLAYED,
}

export interface Card {
  status: CardStatus
  value: number
  isFatigue: boolean
}

interface AppState {
  roulerDeck: Card[]
  sprinterDeck: Card[]
  roulerStatus: RiderStatus
  sprinterStatus: RiderStatus
  roulerFatigueAdded: boolean
  sprinterFatigueAdded: boolean
  selectedRouler: null | number
  selectedSprinter: null | number
  currentRound: number
}

function generateRoulerDeck() {
  const deck: Card[] = [
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 6, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 6, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 6, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 7, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 7, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 7, isFatigue: false },
  ]
  shuffleDeck(deck)
  return deck
}

function generateSprinterDeck() {
  const deck: Card[] = [
    { status: CardStatus.AVAILABLE, value: 2, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 2, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 2, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 3, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 4, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 5, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 9, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 9, isFatigue: false },
    { status: CardStatus.AVAILABLE, value: 9, isFatigue: false },
  ]
  shuffleDeck(deck)
  return deck
}

// Fisher-Yates
function shuffleDeck(deck: any[]) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

function sortCardsByValue(c1: Card, c2: Card) {
  return c1.value - c2.value
}

export const useDeckStore = defineStore('deck', () => {
  const state: AppState = reactive({
    roulerDeck: generateRoulerDeck(),
    sprinterDeck: generateSprinterDeck(),
    roulerStatus: RiderStatus.READY,
    sprinterStatus: RiderStatus.READY,
    roulerFatigueAdded: false,
    sprinterFatigueAdded: false,
    selectedRouler: null,
    selectedSprinter: null,
    currentRound: 1,
  })

  const availableRoulers = computed(() => state.roulerDeck.filter((r) => r.status === CardStatus.AVAILABLE))
  const usedRoulers = computed(() => state.roulerDeck.filter((r) => r.status === CardStatus.USED))
  const drawnRoulers = computed(() => state.roulerDeck.filter((r) => r.status === CardStatus.DRAWN))
  const sortedUsedRoulers = computed(() => [...usedRoulers.value].sort(sortCardsByValue))

  const availableSprinters = computed(() => state.sprinterDeck.filter((r) => r.status === CardStatus.AVAILABLE))
  const usedSprinters = computed(() => state.sprinterDeck.filter((r) => r.status === CardStatus.USED))
  const drawnSprinters = computed(() => state.sprinterDeck.filter((r) => r.status === CardStatus.DRAWN))
  const sortedUsedSprinters = computed(() => [...usedSprinters.value].sort(sortCardsByValue))

  const showFinishedRound = computed(
    () => state.roulerStatus === RiderStatus.FINISHED && state.sprinterStatus === RiderStatus.FINISHED
  )
  const showRiderSelector = computed(
    () =>
      state.roulerStatus !== RiderStatus.DRAWN &&
      state.sprinterStatus !== RiderStatus.DRAWN &&
      !(state.roulerStatus === RiderStatus.FINISHED && state.sprinterStatus === RiderStatus.FINISHED)
  )

  const isFirstStep = computed(
    () =>
      state.currentRound === 1 && state.roulerStatus === RiderStatus.READY && state.sprinterStatus === RiderStatus.READY
  )

  const currentPhase = computed(() => {
    if (showRiderSelector.value) {
      return Phase.CHOOSE_RIDER
    }
    if (state.roulerStatus === RiderStatus.DRAWN) {
      return Phase.ROULEUR_SELECTOR
    }
    if (state.sprinterStatus === RiderStatus.DRAWN) {
      return Phase.SPRINTEUR_SELECTOR
    }
    if (showFinishedRound.value) {
      return Phase.FINISH_ROUND
    }

    return Phase.CHOOSE_RIDER
  })

  const prevStates: AppState[] = []

  function saveState() {
    prevStates.push(structuredClone(toRaw(state)))
  }

  function toPreviousState() {
    const prevState = prevStates.splice(prevStates.length - 1, 1)[0]
    if (prevState) {
      state.roulerDeck = prevState.roulerDeck
      state.sprinterDeck = prevState.sprinterDeck
      state.roulerStatus = prevState.roulerStatus
      state.sprinterStatus = prevState.sprinterStatus
      state.roulerFatigueAdded = prevState.roulerFatigueAdded
      state.sprinterFatigueAdded = prevState.sprinterFatigueAdded
      state.selectedRouler = prevState.selectedRouler
      state.selectedSprinter = prevState.selectedSprinter
      state.currentRound = prevState.currentRound
    }
  }

  function drawRouler() {
    saveState()

    availableRoulers.value
      .filter((i, index) => index < 4)
      .forEach((c) => {
        c.status = CardStatus.DRAWN
      })

    if (drawnRoulers.value.length < 4) {
      usedRoulers.value.forEach((c) => {
        c.status = CardStatus.AVAILABLE
      })

      shuffleDeck(state.roulerDeck)

      const noCardsNeeded = 4 - drawnRoulers.value.length
      availableRoulers.value
        .filter((i, index) => index < noCardsNeeded)
        .forEach((c) => {
          c.status = CardStatus.DRAWN
        })
    }

    state.roulerStatus = RiderStatus.DRAWN
  }

  function drawSprinter() {
    saveState()

    availableSprinters.value
      .filter((i, index) => index < 4)
      .forEach((c) => {
        c.status = CardStatus.DRAWN
      })

    if (drawnSprinters.value.length < 4) {
      usedSprinters.value.forEach((c) => {
        c.status = CardStatus.AVAILABLE
      })

      shuffleDeck(state.sprinterDeck)

      const noCardsNeeded = 4 - drawnSprinters.value.length
      availableSprinters.value
        .filter((i, index) => index < noCardsNeeded)
        .forEach((c) => {
          c.status = CardStatus.DRAWN
        })
    }

    state.sprinterStatus = RiderStatus.DRAWN
  }

  function selectRouler(card: Card) {
    saveState()

    card.status = CardStatus.PLAYED
    drawnRoulers.value.forEach((c) => {
      c.status = CardStatus.USED
    })
    state.roulerStatus = RiderStatus.FINISHED
    state.selectedRouler = card.value
  }

  function selectSprinter(card: Card) {
    saveState()

    card.status = CardStatus.PLAYED
    drawnSprinters.value.forEach((c) => {
      c.status = CardStatus.USED
    })
    state.sprinterStatus = RiderStatus.FINISHED
    state.selectedSprinter = card.value
  }

  function addRoulerFatigueCard() {
    saveState()
    state.roulerDeck.push({ value: 2, status: CardStatus.USED, isFatigue: true })
    state.roulerFatigueAdded = true
  }

  function addSprinterFatigueCard() {
    saveState()
    state.sprinterDeck.push({ value: 2, status: CardStatus.USED, isFatigue: true })
    state.sprinterFatigueAdded = true
  }

  function finishRound() {
    saveState()
    state.roulerStatus = RiderStatus.READY
    state.sprinterStatus = RiderStatus.READY
    state.currentRound++
    state.roulerFatigueAdded = false
    state.sprinterFatigueAdded = false
    state.selectedRouler = null
    state.selectedSprinter = null
  }

  return {
    usedRoulers,
    drawnRoulers,
    usedSprinters,
    drawnSprinters,
    sortedUsedRoulers,
    sortedUsedSprinters,
    state,
    isFirstStep,
    currentPhase,
    drawRouler,
    drawSprinter,
    selectRouler,
    selectSprinter,
    addRoulerFatigueCard,
    addSprinterFatigueCard,
    finishRound,
    toPreviousState,
  }
})

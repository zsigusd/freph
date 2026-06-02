import { defineStore } from 'pinia'
import { computed, reactive, ref, toRaw } from 'vue'

export enum RiderStatus {
  READY = 0,
  DRAWN = 1,
  FINISHED = 2,
}

export enum Phase {
  CHOOSE_RIDER = 0,
  ROULEUR_SELECTOR = 1,
  SPRINTEUR_SELECTOR = 2,
  FINISH_ROUND = 3,
}

enum CardStatus {
  AVAILABLE = 0,
  USED = 1,
  DRAWN = 2,
  PLAYED = 3,
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

const ROULER_VALUES = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7]
const SPRINTER_VALUES = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9]

const CARDS_PER_DRAW = 4

function generateDeck(values: number[]) {
  const deck: Card[] = values.map((value) => ({ status: CardStatus.AVAILABLE, value, isFatigue: false }))
  shuffleDeck(deck)
  return deck
}

// Fisher-Yates
function shuffleDeck(deck: Card[]) {
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
    roulerDeck: generateDeck(ROULER_VALUES),
    sprinterDeck: generateDeck(SPRINTER_VALUES),
    roulerStatus: RiderStatus.READY,
    sprinterStatus: RiderStatus.READY,
    roulerFatigueAdded: false,
    sprinterFatigueAdded: false,
    selectedRouler: null,
    selectedSprinter: null,
    currentRound: 1,
  })

  function createRider(getDeck: () => Card[]) {
    const reshuffledOnLastDraw = ref(false)
    const available = computed(() => getDeck().filter((c) => c.status === CardStatus.AVAILABLE))
    const used = computed(() => getDeck().filter((c) => c.status === CardStatus.USED))
    const drawn = computed(() => getDeck().filter((c) => c.status === CardStatus.DRAWN))
    const sortedUsed = computed(() => [...used.value].sort(sortCardsByValue))

    function takeAvailable(count: number) {
      available.value
        .filter((_c, index) => index < count)
        .forEach((c) => {
          c.status = CardStatus.DRAWN
        })
    }

    function draw() {
      reshuffledOnLastDraw.value = false
      takeAvailable(CARDS_PER_DRAW)

      if (drawn.value.length < CARDS_PER_DRAW) {
        used.value.forEach((c) => {
          c.status = CardStatus.AVAILABLE
        })

        shuffleDeck(getDeck())
        reshuffledOnLastDraw.value = true
        takeAvailable(CARDS_PER_DRAW - drawn.value.length)
      }
    }

    function select(card: Card) {
      card.status = CardStatus.PLAYED
      for (const c of drawn.value) {
        c.status = CardStatus.USED
      }
    }

    function addFatigueCard() {
      getDeck().push({ value: 2, status: CardStatus.USED, isFatigue: true })
    }

    return { available, used, drawn, sortedUsed, reshuffledOnLastDraw, draw, select, addFatigueCard }
  }

  const rouler = createRider(() => state.roulerDeck)
  const sprinter = createRider(() => state.sprinterDeck)

  const usedRoulers = rouler.used
  const drawnRoulers = rouler.drawn
  const sortedUsedRoulers = rouler.sortedUsed
  const roulerReshuffledOnLastDraw = rouler.reshuffledOnLastDraw

  const usedSprinters = sprinter.used
  const drawnSprinters = sprinter.drawn
  const sortedUsedSprinters = sprinter.sortedUsed
  const sprinterReshuffledOnLastDraw = sprinter.reshuffledOnLastDraw

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

  // fallow-ignore-next-line complexity
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
    rouler.draw()
    state.roulerStatus = RiderStatus.DRAWN
  }

  function drawSprinter() {
    saveState()
    sprinter.draw()
    state.sprinterStatus = RiderStatus.DRAWN
  }

  function selectRouler(card: Card) {
    saveState()
    rouler.select(card)
    state.roulerStatus = RiderStatus.FINISHED
    state.selectedRouler = card.value
  }

  function selectSprinter(card: Card) {
    saveState()
    sprinter.select(card)
    state.sprinterStatus = RiderStatus.FINISHED
    state.selectedSprinter = card.value
  }

  function addRoulerFatigueCard() {
    saveState()
    rouler.addFatigueCard()
    state.roulerFatigueAdded = true
  }

  function addSprinterFatigueCard() {
    saveState()
    sprinter.addFatigueCard()
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
    roulerReshuffledOnLastDraw,
    sprinterReshuffledOnLastDraw,
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

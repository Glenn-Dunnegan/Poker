import React from 'react';
import './App.css';
import Card from './Card'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      deck: [
        `AC`,`AD`,`AH`,`AS`,
        `2C`,`2D`,`2H`,`2S`,
        `3C`,`3D`,`3H`,`3S`,
        `4C`,`4D`,`4H`,`4S`,
        `5C`,`5D`,`5H`,`5S`,
        `6C`,`6D`,`6H`,`6S`,
        `7C`,`7D`,`7H`,`7S`,
        `8C`,`8D`,`8H`,`8S`,
        `9C`,`9D`,`9H`,`9S`,
        `TC`,`TD`,`TH`,`TS`,
        `JC`,`JD`,`JH`,`JS`,
        `QC`,`QD`,`QH`,`QS`,
        `KC`,`KD`,`KH`,`KS`
      ],
      cardRank: [
        `2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,
        `T`,`J`,`Q`,`K`,`A`],
      hand: [],
      board: [],
      handRanks: [
        `High Card`,`Pair`,`Two Pair`,`Three of a Kind`,
        `Straight`,`Flush`,`Full House`,
        `Four of a Kind`,`Straight Flush`,`Royal Flush`
      ],
      playerHand: [],
      playerHandRank:'',
      evaluableHand: [],
      finalPlayerHand: [],
      handMessage: ``
    }
    this.shuffle = this.shuffle.bind(this)
    this.deal = this.deal.bind(this)
  }
  shuffle(){
    this.setState(() => { 
      const shuffledDeck = []
      while(shuffledDeck.length < this.state.deck.length){
        const card = this.state.deck[Math.floor(Math.random() * this.state.deck.length)]
        if(shuffledDeck.includes(card) === false){
          shuffledDeck.push(card)
        }
      }
      console.log(shuffledDeck)
      return{
        deck: shuffledDeck
      }
    })
  }
  collectCards(){
    this.setState(() => {
      return{
        deck: [
          `AC`,`AD`,`AH`,`AS`,
          `2C`,`2D`,`2H`,`2S`,
          `3C`,`3D`,`3H`,`3S`,
          `4C`,`4D`,`4H`,`4S`,
          `5C`,`5D`,`5H`,`5S`,
          `6C`,`6D`,`6H`,`6S`,
          `7C`,`7D`,`7H`,`7S`,
          `8C`,`8D`,`8H`,`8S`,
          `9C`,`9D`,`9H`,`9S`,
          `TC`,`TD`,`TH`,`TS`,
          `JC`,`JD`,`JH`,`JS`,
          `QC`,`QD`,`QH`,`QS`,
          `KC`,`KD`,`KH`,`KS`
        ],
        hand: [],
        board: []
      }
    })
    console.log(this.state.deck)
  }
  deal(){
    this.setState(() => {
      const newHand = []
      const dealtFromDeck = this.state.deck     
      let i = 0
      let shiftTimes = 0
      while(newHand.length < 2){
        newHand.push(this.state.deck[i])
        i++
      }
      while(shiftTimes < i ){
      dealtFromDeck.shift()
      shiftTimes++
      }
      console.log(dealtFromDeck)
      return {
        hand: newHand,
        deck: dealtFromDeck
      }
    })
  }
  flop(){
    this.setState(() => {
      const newBoard = []
      const dealtFromDeck = this.state.deck
      let i = 0
      let shiftTimes = 0
      while(newBoard.length < 3){
        newBoard.push(this.state.deck[i])
        i++
      }
      while(shiftTimes < i){
        dealtFromDeck.shift()
        shiftTimes++
      }
      console.log(dealtFromDeck)
      return {
        board: newBoard,
        deck: dealtFromDeck
      }
    })
  }
  turn(){
    this.setState(() => {
      const newBoard = this.state.board
      const dealtFromDeck = this.state.deck
      if(newBoard.length < 4){
        newBoard.push(this.state.deck[0])
        dealtFromDeck.shift()
      }
      console.log(dealtFromDeck)
      return {
        board: newBoard,
        deck: dealtFromDeck
      }
    })
  }
  river(){
    this.setState(() => {
      const newBoard = this.state.board
      const dealtFromDeck = this.state.deck
      if(newBoard.length < 5){
        newBoard.push(this.state.deck[0])
        dealtFromDeck.shift()
      }
      console.log(dealtFromDeck)
      return {
        board: newBoard,
        deck: dealtFromDeck
      }
    })
  }
  makeHandEvaluable(){
    this.setState(() => {
      const tempEvaluableHand = []
      const tempPlayerHand = []
      tempPlayerHand.push(...this.state.board,...this.state.hand)
      for(let i = 0; i < tempPlayerHand.length; i++){
        tempEvaluableHand.push(tempPlayerHand[i].split(""))
      }
      return {
        playerHand: tempPlayerHand,
        evaluableHand: tempEvaluableHand
      }
    })
  }
  // Returns an array of straighted cards if there are five or more in a single succession else returns false
  checkForStraight(tempAlterableHand){
      let bottomOfStraight = ``
      let downStraightedCount = 1
      let upStraightedCount = 1
      let straightedCards = []
      let wheeledStraight = []
      let isStraighted = false
      let isStraightedWithWheel = false
      for(let i = 0; i < tempAlterableHand.length - 1; i++){
        if((this.state.cardRank.indexOf(tempAlterableHand[i][0]) === this.state.cardRank.indexOf(tempAlterableHand[i+1][0]))
          ||this.state.cardRank.indexOf(tempAlterableHand[i][0]) === this.state.cardRank.indexOf(tempAlterableHand[i+1][0])-1){
            if(straightedCards.includes(tempAlterableHand[i]) === false){
              straightedCards.push(tempAlterableHand[i])
            }
            if(straightedCards.includes(tempAlterableHand[i+1]) === false){
              straightedCards.push(tempAlterableHand[i+1])
            }
        }
      }
      for(let i = straightedCards.length - 1 ; i > 0; i--){
        if(this.state.cardRank.indexOf(straightedCards[i][0]) === this.state.cardRank.indexOf(straightedCards[i - 1][0]) + 1){
          downStraightedCount++
          if(downStraightedCount === 4 && straightedCards[i-1][0] === `2` && tempAlterableHand[tempAlterableHand.length - 1][0] === `A`){
            wheeledStraight.push(...straightedCards)
            isStraightedWithWheel = true
          }
          if(downStraightedCount === 5){
            bottomOfStraight = straightedCards.indexOf(straightedCards[i-1])
            for(let i = bottomOfStraight; i < straightedCards.length - 1; i++){
              if(this.state.cardRank.indexOf(straightedCards[i][0]) === this.state.cardRank.indexOf(straightedCards[i + 1][0]) - 1){
                upStraightedCount++
                if(upStraightedCount === 5){
                  isStraighted = true
                }
              }
            }
          }
        }else if((this.state.cardRank.indexOf(straightedCards[i][0]) !== this.state.cardRank.indexOf(straightedCards[i - 1][0]) + 1) 
              && (this.state.cardRank.indexOf(straightedCards[i][0]) !== this.state.cardRank.indexOf(straightedCards[i - 1][0]))){
              downStraightedCount = 1
        }
      }
      if(isStraightedWithWheel){
        return wheeledStraight
      }else if(isStraighted){
        return straightedCards
      }else{
        return false
      }
  }
  // Returns an array of suited cards if there are five or more else returns false
  checkForFlush(tempAlterableHand){
      let flushedCards = []
      let spades = []
      let hearts = []
      let diamonds = []
      let clubs = []
      let isFlushed = false
      for(let i = 0; i < tempAlterableHand.length; i++){
        if(tempAlterableHand[i][1] === `S` && spades.includes(tempAlterableHand[i]) === false){
          spades.push(tempAlterableHand[i])
        }else if(tempAlterableHand[i][1] === `H` && hearts.includes(tempAlterableHand[i]) === false){
          hearts.push(tempAlterableHand[i])
        }else if(tempAlterableHand[i][1] === `D` && diamonds.includes(tempAlterableHand[i]) === false){
          diamonds.push(tempAlterableHand[i])
        }else if(tempAlterableHand[i][1] === `C` && clubs.includes(tempAlterableHand[i]) === false){
          clubs.push(tempAlterableHand[i])
        }
      }
      if(spades.length >= 5){
        flushedCards = spades
        isFlushed = true
      }else if(hearts.length >= 5){
        flushedCards = hearts
        isFlushed = true
      }else if(diamonds.length >= 5){
        flushedCards = diamonds
        isFlushed = true
      }else if(clubs.length >= 5){
        flushedCards = clubs
        isFlushed = true
      }
      if(isFlushed){
        return flushedCards
      }else{
        return false
      }
  }
  // Returns an array of the highest ranking paired Set
  highestPairedSetOf(tempAlterableHand){
    let allSets = []
    let currentSet = []
    let currentHighestSet = []
    for(let i = 0; i < tempAlterableHand.length - 1; i++){
      if(tempAlterableHand[i][0] === tempAlterableHand[i+1][0]){
        if(allSets.includes(tempAlterableHand[i]) === false){
          allSets.push(tempAlterableHand[i])
        }
        if(allSets.includes(tempAlterableHand[i+1][0]) === false){
          allSets.push(tempAlterableHand[i+1])
        }
      }
    }
    for(let i = 0; i < allSets.length - 1; i++){
      if(allSets[i][0] === allSets[i+1][0]){
        if(currentSet.includes(allSets[i]) === false){
          currentSet.push(allSets[i])
        }
        if(currentSet.includes(allSets[i+1]) === false){
          currentSet.push(allSets[i+1])
        }
      }
      if(allSets[i][0] !== allSets[i+1][0]){
        if(currentSet.length > currentHighestSet.length){
          currentHighestSet = currentSet
          currentSet = []
          
        }else if(this.state.cardRank.indexOf(currentSet[0][0]) > this.state.cardRank.indexOf(currentHighestSet[0][0]) && currentSet.length === currentHighestSet.length){
          currentHighestSet = currentSet
          currentSet = []
        }else{
          currentSet = []
        }
      }
      if(i === allSets.length - 2){
        if(currentSet.length > currentHighestSet.length){
          currentHighestSet = currentSet
          currentSet = []
        }else if(this.state.cardRank.indexOf(currentSet[0][0]) > this.state.cardRank.indexOf(currentHighestSet[0][0]) && currentSet.length === currentHighestSet.length){
          currentHighestSet = currentSet
          currentSet = []
        }else{
          currentSet = []
        }
      }
    }
    return currentHighestSet
  }
  // Returns an array of the second highest ranking paired Set
  secondHighestSetOf(tempAlterableHand){
    let highestSet = []
    let secondHighestSet = []
    highestSet.push(...this.highestPairedSetOf(tempAlterableHand))
    let restOfHand = []
    for(let i = 0; i < tempAlterableHand.length; i++){
      if(!  highestSet.includes(tempAlterableHand[i])){
        restOfHand.push(tempAlterableHand[i])
      }
    }
    secondHighestSet.push(...this.highestPairedSetOf(restOfHand))
    return secondHighestSet
  }
  // Evaluates hand rankings and returns the best five card hand
  evaluateHand(){
    this.setState(() => {
      let tempRank = ``
      let tempAlterableHand = this.state.evaluableHand
      let straightFlushedHand = []
      // Sorts the collection of player's hand and the board from least to greatest in accordance to the rank defined in state
      tempAlterableHand.sort((a, b) => this.state.cardRank.indexOf(a[0]) - this.state.cardRank.indexOf(b[0]))
      // Checks for straight flush
      if(this.checkForFlush(tempAlterableHand) !== false){
        let flushedHand = this.checkForFlush(tempAlterableHand)
        if(this.checkForStraight(flushedHand) !== false){
          straightFlushedHand = this.checkForStraight(flushedHand)
          if(straightFlushedHand[straightFlushedHand.length - 1][0] === `A`){
            tempRank = `Royal Flush`
            return{
              finalPlayerHand: straightFlushedHand,
              playerHandRank: this.state.handRanks[9],
              handMessage: tempRank
            }
          }
          tempRank = `${straightFlushedHand[straightFlushedHand.length - 1][0]} high Straight ${flushedHand[0][1]} Flush`
          return{
            finalPlayerHand: straightFlushedHand,
            playerHandRank: this.state.handRanks[8],
            handMessage: tempRank
          }
        }
      }
      // Checks for four of a kind
      if(this.highestPairedSetOf(tempAlterableHand).length === 4){
        let fourOfAKindHand = []
        fourOfAKindHand.push(...this.highestPairedSetOf(tempAlterableHand))
        for(let i = tempAlterableHand.length - 1; i >= 0; i--){
          if(fourOfAKindHand.includes(tempAlterableHand[i]) === false){
            fourOfAKindHand.push(tempAlterableHand[i])
            tempRank = `Four of a Kind of ${fourOfAKindHand[0][0]}s with ${fourOfAKindHand[fourOfAKindHand.length - 1][0]} high`
            return{
              finalPlayerHand: fourOfAKindHand,
              playerHandRank: this.state.handRanks[7],
              handMessage: tempRank
            }
          }
        }
      }
      // Checks for a full house
      if(this.highestPairedSetOf(tempAlterableHand).length === 3){
        let fullHouseHand = []
        fullHouseHand.push(...this.highestPairedSetOf(tempAlterableHand))
        let insidePair = []
        insidePair.push(...this.secondHighestSetOf(tempAlterableHand))
        while(insidePair.length > 2){
          insidePair.shift()
        }
        if(insidePair.length === 2){
          fullHouseHand.push(...insidePair)
          tempRank = `Full House ${fullHouseHand[0][0]}s full of ${fullHouseHand[fullHouseHand.length - 1][0]}s`
          return{
            finalPlayerHand: fullHouseHand,
            playerHandRank: this.state.handRanks[6],
            handMessage: tempRank
          }
        }
      }
      // Checks for Flush
      if(this.checkForFlush(tempAlterableHand) !== false){
        let flushHand =  this.checkForFlush(tempAlterableHand)
        tempRank = `${flushHand[flushHand.length - 1][0]} high ${flushHand[0][1]} Flush`
        return{
          finalPlayerHand: flushHand,
          playerHandRank: this.state.handRanks[5],
          handMessage: tempRank
        }
      }
      // Checks for Straight
      if(this.checkForStraight(tempAlterableHand) !== false){
        let straightHand = this.checkForStraight(tempAlterableHand)
        tempRank = `${straightHand[straightHand.length - 1][0]} high Straight`
        return{
          finalPlayerHand: straightHand,
          playerHandRank: this.state.handRanks[4],
          handMessage: tempRank
        }
      }
      // Checks for three of a kind
      if(this.highestPairedSetOf(tempAlterableHand).length === 3){
        let tripsHand = []
        tripsHand.push(...this.highestPairedSetOf(tempAlterableHand))
        for(let i = tempAlterableHand.length - 1; tripsHand.length < 5; i--){
          if(tripsHand.includes(tempAlterableHand[i]) === false){
            tripsHand.push(tempAlterableHand[i])
          }
        }
          tempRank = `Three of a kind of ${tripsHand[0][0]} with ${tripsHand[tripsHand.length - 2][0]} ${tripsHand[tripsHand.length - 1][0]} high`
          return{
            finalPlayerHand: tripsHand,
            playerHandRank: this.state.handRanks[3],
            handMessage: tempRank
          }
      }
      // Checks for two pair as well as one
      if(this.highestPairedSetOf(tempAlterableHand).length === 2 ){
        let highestPair = this.highestPairedSetOf(tempAlterableHand)
        if(this.secondHighestSetOf(tempAlterableHand).length === 2){
          let secondPair = this.secondHighestSetOf(tempAlterableHand)
          let twoPairHand = []
          twoPairHand.push(...highestPair,...secondPair)
          for(let i = tempAlterableHand.length - 1; twoPairHand.length < 5; i--){
            if(twoPairHand.includes(tempAlterableHand[i]) === false){
              twoPairHand.push(tempAlterableHand[i])
            }
          }
          tempRank = `Two Pair ${twoPairHand[0][0]}s and ${twoPairHand[twoPairHand.length - 2][0]}s ${twoPairHand[twoPairHand.length - 1][0]} high`
          return{
            finalPlayerHand: twoPairHand,
            playerHandRank: this.state.handRanks[2],
            handMessage: tempRank
          }
        }else{
          let onePairHand = []
          onePairHand.push(...highestPair)
          tempRank = `Pair of ${onePairHand[0][0]}s`
          if(tempAlterableHand.length > 4){
            for(let i = tempAlterableHand.length - 1; onePairHand.length < 5; i--){
              if(onePairHand.includes(tempAlterableHand[i]) === false){
                onePairHand.push(tempAlterableHand[i])
              }
            }
            tempRank = `Pair of ${onePairHand[0][0]}s ${onePairHand[onePairHand.length - 3][0]} ${onePairHand[onePairHand.length - 2][0]} ${onePairHand[onePairHand.length - 1][0]} high`
          }
          // If none of the above return, returns current hand with High Card rank
          return{
            finalPlayerHand: onePairHand,
            playerHandRank: this.state.handRanks[1],
            handMessage: tempRank
          }
        }
      }
      if(this.highestPairedSetOf(tempAlterableHand).length === 0){
        let highCardHand = []
        if(tempAlterableHand.length > 4){
          for(let i = tempAlterableHand.length - 1; highCardHand.length < 5; i--){
            if(highCardHand.includes(tempAlterableHand[i]) === false){
              highCardHand.push(tempAlterableHand[i])
            }
          }
        }else{
          highCardHand.push(...tempAlterableHand)
        }
        tempRank = `High card of ${highCardHand[0][0]}, ${highCardHand[1][0]}`
        return{
          finalPlayerHand: highCardHand,
          playerHandRank: this.state.handRanks[0],
          handMessage: tempRank
        }
      }
    })
  }
  render(){
    const newBoard = this.state.board.map((card, i) => {
      return(
        <Card card = {card} key = {i}/>
      )
    })
    const newHand = this.state.hand.map((card, i) => {
      return(
        <Card card = {card} key = {i}/>
      )
    })
    return(
      <div>
        <div>
          {newHand}
        </div>
          <button onClick = {() => this.collectCards()}>Collect Cards</button>
          <button onClick = {() => this.shuffle()}>Shuffle</button>
          <button onClick = {() => this.deal()}>Deal</button>
          <button onClick = {() => this.flop()}>Flop</button>
          <button onClick = {() => this.turn()}>Turn</button>
          <button onClick = {() => this.river()}>River</button>
          <button onClick = {() => this.makeHandEvaluable()}>Make Hand Evaluable</button>
          <button onClick = {() => this.evaluateHand()}>Evaluate Hand</button>
        <div>
          {newBoard}
        </div>
        <div>
          {this.state.handMessage}
        </div>
      </div>
    )
  }
}

export default App;

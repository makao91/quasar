<template>
  <button :disabled="disable()" @click="changeColor()" :class="{'is_black': state === 'player_one', 'is_yellow': this.state === 'player_two'}">
  </button>
</template>
<script>

export default {
  methods: {
    changeColor(){
      if (this.player === 1){
        this.state = 'player_one'
      }
      if (this.player === 2){
        this.state = 'player_two'
      }
      setTimeout(()=>{
        this.storeState()
        this.checkForWin()
      }, 1);
    },
    storeState() {
      this.$store.commit('gameStore/setBoardFieldToPlayer', {
        horizontal: this.horizontally_index,
        perpendicularly: this.perpendicularly_index,
        state: this.state
      })
    },
    checkForWin(){
      let filled = true;
      let board =  this.getBoardState;
      let board_dimension = board.length;
      for (let h = 0; h < board_dimension; h++){
        for (let p = 0; p < board_dimension; p++) {
          if (board[p][h] === null) filled = false;
          if (board[p][h] !== null) {
            if (
              this.checkDownLeftToRightUpWin(board,p,h)
              ||
              this.checkUpLeftToRightDownWin(board,p,h)
              ||
              this.checkUpRightToLeftDownWin(board,p,h)
              ||
              this.checkDownRightToLeftUpWin(board,p,h)
              ||
              this.checkHorizontalWin(board,p,h)
              ||
              this.checkUprightWin(board,p,h)
            ) {
              this.announceWinner(board[p][h]);
              return;
            }
          }
        }
      }
      if (filled) {
        this.announceWinner("board_filled");
      }
    },
    announceWinner(winner){
      if (winner){
        if (winner === "player_one") {
          window.alert(winner + " wins");
        }

        if (winner === "player_two") {
          window.alert(winner + " wins");
        }
        if (winner === "board_filled") {
          window.alert("Board filled");
        }
        // if(window.confirm(winner + " wins")){
        this.$store.commit('gameStore/gameIsOver')
        this.$store.commit('gameStore/clearBoard')
        // }

        // this.$store.commit('gameIsNotOver')

      }
    },
    disable(){
      if (this.state === 'player_one' || this.state === 'player_two'){
        return true
      }
    },
    checkUprightWin(board,p,h){
      if (p >= 11){
        return false;
      }
      return board[p][h] === board[p + 1][h] &&
        board[p + 1][h] === board[p + 2][h] &&
        board[p + 2][h] === board[p + 3][h] &&
        board[p + 3][h] === board[p + 4][h];
    },
    checkHorizontalWin(board, p, h) {
      if (h >= 11){
        return false;
      }
      return board[p][h] === board[p][h + 1] &&
        board[p][h + 1] === board[p][h + 2] &&
        board[p][h + 2] === board[p][h + 3] &&
        board[p][h + 3] === board[p][h + 4];
    },
    checkUpLeftToRightDownWin(board, p, h) {
      if (p >= 11 || h >= 11){
        return false;
      }
      return board[p][h] === board[p + 1][h + 1] &&
        board[p + 1][h + 1] === board[p + 2][h + 2] &&
        board[p + 2][h + 2] === board[p + 3][h + 3] &&
        board[p + 3][h + 3] === board[p + 4][h + 4];
    },
    checkDownRightToLeftUpWin(board, p, h) {
      if (h <= 4 || p <= 4){
        return false;
      }
      return board[p][h] === board[p - 1][h - 1] &&
        board[p - 1][h - 1] === board[p - 2][h - 2] &&
        board[p - 2][h - 2] === board[p - 3][h - 3] &&
        board[p - 3][h - 3] === board[p - 4][h - 4];
    },
    checkDownLeftToRightUpWin(board, p, h) {
      if (p <= 4 || h >= 11){
        return false;
      }
      return board[p][h] === board[p - 1][h + 1] &&
        board[p - 1][h + 1] === board[p - 2][h + 2] &&
        board[p - 2][h + 2] === board[p - 3][h + 3] &&
        board[p - 3][h + 3] === board[p - 4][h + 4];
    },
    checkUpRightToLeftDownWin(board, p, h) {
      if (h <= 4 || p >= 11) {
        return false;
      }
      return board[p][h] === board[p + 1][h - 1] &&
        board[p + 1][h - 1] === board[p + 2][h - 2] &&
        board[p + 2][h - 2] === board[p + 3][h - 3] &&
        board[p + 3][h - 3] === board[p + 4][h - 4];
    }
  },
  name: "BoardField",
  props: {
    horizontally_index: Number,
    perpendicularly_index: Number,
    name: String,
    state: String,
    player: Number,
  },
  computed: {
    getBoardState(){
      return this.$store.state.gameStore.board_fields
    },
  },
  // updated() {
  //   this.storeState()
  //   this.checkForWin()
  // }
}
</script>

<style scoped>
button {
  height: 50px;
  width: 50px;
  background: aliceblue;
}
.is_black{
  background: black;
}
.is_yellow{
  background: yellow;
}
</style>

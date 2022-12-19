<template>
	<div class="game-piece" :class="{ red: isRed, yellow: isYellow }"
		@click="setColor(color === 'red' ? 'yellow' : 'red')">
	</div>


</template>
<script lang="ts">

import { ref, computed } from 'vue';

export default {
	name: 'GamePiece',
	setup() {
		// Declare a reactive state variable to hold the game piece's color
		const color = ref('');

		// Declare a computed property to determine whether the game piece is red or yellow
		const isRed = computed(() => color.value === 'red');
		const isYellow = computed(() => color.value === 'yellow');

		// Declare a method to set the game piece's color
		function setColor(newColor: string) {
			color.value = newColor;
		}

		return {
			color,
			isRed,
			isYellow,
			setColor
		};
	}
}
</script>
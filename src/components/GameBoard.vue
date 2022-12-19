


<template>
	<div>
		<div class="container" @mousemove="updatePosition">
			<div class="indicator" v-bind:style="{ left: position + 'px', transform: 'translateX(-50%)' }"></div>
		</div>
		<div class="game-board" @mousemove="updatePosition">
			<div v-for="(row, index) in rows" :key="index" class="board-row">
				<div v-for="(cell, index) in row" :key="index" class="board-cell"></div>
			</div>
		</div>
	</div>
</template> 


<script>
import { ref } from 'vue'

export default {
	setup() {
		const rows = ref([
			[{}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}, {}, {}]
		])
		const position = ref(0)
		const currentSection = ref(null);



		function updatePosition(event) {
			// Calculate the new position of the indicator based on the mouse position and the left edge of the container element
			const container = event.currentTarget
			const newPosition = event.clientX - container.getBoundingClientRect().left

			// Calculate the width of the container
			const containerWidth = container.offsetWidth

			// Calculate the width of each section
			const sectionWidth = containerWidth / 8


			// Snap the position to the nearest section
			const snappedPosition = Math.round(newPosition / sectionWidth) * sectionWidth

			// Calculate the current section based on the snapped position
			const currentSectionIndex = Math.floor(snappedPosition / sectionWidth)

			position.value = snappedPosition
			// Make the indicator stay in section 1 when currentSectionIndex is 0
			if (currentSectionIndex === 0) {
				position.value = 100
			}
			// Make the indicator stay in last section  when currentSectionIndex is 8
			if (currentSectionIndex === 8) {
				position.value = 700
			}
			currentSection.value = currentSectionIndex
		}




		return {
			rows,
			updatePosition,
			position,
			currentSection,


		}
	}
}
</script>

<style>
.game-board {
	display: flex;
	flex-direction: column;
	width: max-content;
	height: 800px;
	background-color: white;
	justify-content: center;
	margin: auto;
	border-radius: 20px;
}

.board-row {
	display: flex;
	flex-direction: row;
	width: 800px;
	height: 100px;
	margin-bottom: 20px;
	justify-content: center;
}

.board-cell {
	width: 90px;
	height: 90px;
	border: 1px solid black;
	border-radius: 50%;
	padding: 20px;
	margin-right: 10px;
	background-color: black;
}

.board-cell:last-child {
	margin-right: 0;
}

.container {
	width: 800px;
	height: 50px;
	position: relative;
	margin: auto;
}

.indicator {
	width: 50px;
	height: 50px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: red;
	transform: translateX(-50%);
}
</style>

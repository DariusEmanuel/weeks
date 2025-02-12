<script setup lang="ts">
import type { Block } from "../composables/dates";

export type BlockColor = "red" | "green";

interface BlockProps {
  block: Block;
}

const props = defineProps<BlockProps>();
</script>

<template>
  <div
    class="weekBlock-element"
    :style="{ backgroundColor: props.block.color }"
  >
    <div class="weekBlock-overlay">
      Index {{ props.block.index }}<br />
      Week {{ props.block.weekOfYear }} of {{ props.block.year }}
    </div>
  </div>
</template>

<style>
.weekBlock-element {
  width: 100%;
  aspect-ratio: 1;
  background-color: steelblue;
  position: relative;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
}

/* Scale effect on hover */
.weekBlock-element:hover {
  transform: scale(1.1);
  border-radius: 20%;
}

.weekBlock-overlay {
  position: fixed;
  top: -40%;
  left: 50%;
  transform: translate(-50%, -80%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  white-space: nowrap;
  pointer-events: none;
}

/* Show overlay on hover */
.weekBlock-element:hover .weekBlock-overlay {
  opacity: 1;
}
</style>

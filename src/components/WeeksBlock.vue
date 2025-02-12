<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useDates } from "../composables/dates";
import { useSecondsLeft } from "../composables/secondsLeft";

const OneWeekBlock = defineAsyncComponent(() => import("./OneWeekBlock.vue"));

const birthDate = defineModel<string>("birthDate", { default: "1999-10-08" });
const ageYouWish = defineModel<number>("ageYouWish", { default: 90 });

const { blocks } = useDates(birthDate, ageYouWish);
const { secondsLeftToday } = useSecondsLeft();
</script>

<template>
  <div>
    <div class="birthdate-wrapper">
      <label for="birthdate">Your birthdate</label>
      <input type="date" id="birthdate" v-model="birthDate" />
      <label for="age">The age you wish to get</label>
      <input
        type="number"
        id="age"
        min="50"
        max="120"
        v-model.lazy="ageYouWish"
      />
    </div>

    <div class="notes-wrapper italic">
      <p>Important Note: Every block represent a week of your life</p>
      <p>
        <span :style="{ color: 'rgb(215, 0, 64' }">red blocks</span> are the
        past weeks, while
        <span :style="{ color: 'rgb(116, 195, 101)' }">green blocks</span>
        are the
        <span
          :style="{ borderBottom: '1px dotted #FFF', textDecoration: 'none' }"
          >possible</span
        >
        incoming ones
      </p>
    </div>

    <div class="seconds-wrapper">
      <p>{{ secondsLeftToday }} seconds left until midnight</p>
      <span :style="{ fontWeight: 600, fontSize: '2rem' }"
        >EVERY SECOND MATTER</span
      >
    </div>

    <div class="weekBlock-wrapper">
      <OneWeekBlock :block="block" v-for="block in blocks" />
    </div>
  </div>
</template>

<style>
.weekBlock-wrapper {
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  gap: 5px;
  width: 100%;
  height: 100%;
  max-width: 2560px;
  margin: 40px auto 0;
}

.italic {
  font-style: italic;
}

.notes-wrapper,
.seconds-wrapper {
  text-align: center;
  width: 100%;
  margin-top: 20px;
  font-family: "Arial", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.notes-wrapper p {
  margin: 0;
}

.birthdate-wrapper {
  text-align: center;
  width: 100%;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #cecccc;
}

input[type="date"],
input[type="number"] {
  width: 100%;
  max-width: 250px;
  padding: 8px 12px;
  font-size: 1.1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

input[type="date"]:focus {
  border-color: rgb(116, 195, 101);
  box-shadow: 0 0 4px rgb(116, 195, 101);
}
</style>

import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";

export function useSecondsLeft() {
  const secondsLeftToday = ref(0);

  const updateTime = () => {
    const now = dayjs();
    const endOfDay = now.endOf("day");
    secondsLeftToday.value = endOfDay.diff(now, "second");
  };

  let interval: number;

  onMounted(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  return {
    secondsLeftToday,
  };
}

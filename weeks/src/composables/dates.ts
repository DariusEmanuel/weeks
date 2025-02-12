import { computed, ref, type ModelRef } from "vue";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export type BlockColor = string;

export interface Block {
  color: BlockColor;
  index: number;
  year: number;
  weekOfYear: number;
}

export function useDates(
  birthDate: ModelRef<string>,
  ageYouWish: ModelRef<number>
) {
  const daysInYear = ref(365);
  const weeksInYear = ref(Math.round(daysInYear.value / 7)); // 52

  const weeksLived = computed(() =>
    dayjs().diff(dayjs(birthDate.value), "week")
  );

  const totalWeeks = computed(() => ageYouWish.value * weeksInYear.value);

  const blocks = computed<Block[]>(() => {
    const birthMoment = dayjs(birthDate.value);

    return Array.from({ length: totalWeeks.value }, (_, i) => {
      const weekDate = birthMoment.add(i, "week");

      return {
        color: i < weeksLived.value ? "rgb(215, 0, 64)" : "rgb(116, 195, 101)",
        index: i + 1,
        weekOfYear: weekDate.isoWeek(),
        year: weekDate.year(),
      };
    });
  });

  return {
    daysInYear,
    weeksInYear,
    weeksLived,
    totalWeeks,

    blocks,
  };
}

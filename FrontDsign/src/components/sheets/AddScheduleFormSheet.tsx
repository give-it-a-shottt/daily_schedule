import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";
import { NumberInput } from "../ui/NumberInput";
import { SegmentedToggle } from "../ui/SegmentedToggle";
import { TextInput } from "../ui/TextInput";
import { BottomSheet } from "./BottomSheet";
import { allocate } from "../../lib/allocation";
import { addDays, formatKoreanDay, toISODate } from "../../lib/dates";
import { useCreateScheduleItem } from "../../hooks/useSchedule";
import { useCreateStudySource } from "../../hooks/useStudySources";
import type { StudySourceType } from "../../types";

type Mode = "simple" | "study";
type PeriodOption = "30" | "60" | "90" | "custom";

const UNIT_LABEL: Record<StudySourceType, string> = {
  book: "페이지",
  lecture: "강",
};

const studySchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요"),
  sourceType: z.enum(["book", "lecture"]),
  totalUnits: z.number().int().positive("1 이상 입력해주세요"),
  periodOption: z.enum(["30", "60", "90", "custom"]),
  customDays: z.number().int().positive().max(365).optional(),
  startDate: z.string().min(1),
});
type StudyFormValues = z.infer<typeof studySchema>;

type AddScheduleFormSheetProps = {
  selectedDate: Date;
  onClose: () => void;
  onCreated: () => void;
};

export function AddScheduleFormSheet({ selectedDate, onClose, onCreated }: AddScheduleFormSheetProps) {
  const [mode, setMode] = useState<Mode>("simple");

  return (
    <BottomSheet eyebrow="일정 추가" title={formatKoreanDay(selectedDate)} onClose={onClose}>
      <div className="w-full px-6 pt-4">
        <SegmentedToggle
          value={mode}
          onChange={setMode}
          options={[
            { value: "simple", label: "단순 일정" },
            { value: "study", label: "학습 등록" },
          ]}
        />
      </div>
      {mode === "simple" ? (
        <SimpleForm selectedDate={selectedDate} onClose={onClose} onCreated={onCreated} />
      ) : (
        <StudyForm selectedDate={selectedDate} onClose={onClose} onCreated={onCreated} />
      )}
    </BottomSheet>
  );
}

function SimpleForm({
  selectedDate,
  onClose,
  onCreated,
}: {
  selectedDate: Date;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [memo, setMemo] = useState("");
  const createItem = useCreateScheduleItem();

  const handleSubmit = () => {
    if (!title.trim()) return;
    createItem.mutate(
      { date: toISODate(selectedDate), title: title.trim(), time: time || null, memo: memo.trim() || null },
      { onSuccess: onCreated },
    );
  };

  return (
    <div className="w-full px-6 pb-8 pt-4">
      <div className="flex w-full flex-col gap-2 rounded-card border border-surface-border bg-[rgba(255,255,255,0.05)] p-4">
        <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="일정 제목" />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ colorScheme: "dark" }}
          className="h-[47px] w-full rounded-field border border-surface-border bg-[rgba(255,255,255,0.07)] px-4 font-['Inter:Regular',sans-serif] text-[14px] text-white outline-none"
        />
        <TextInput value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="메모 (선택)" />
        <div className="flex w-full gap-2 pt-1">
          <Button variant="secondary" onClick={onClose} type="button">
            취소
          </Button>
          <Button onClick={handleSubmit} type="button" disabled={createItem.isPending || !title.trim()}>
            {createItem.isPending ? "등록 중..." : "등록"}
          </Button>
        </div>
        {createItem.isError && (
          <p className="pt-1 text-[12px] text-red-300">등록에 실패했어요. 다시 시도해주세요.</p>
        )}
      </div>
    </div>
  );
}

function StudyForm({
  selectedDate,
  onClose,
  onCreated,
}: {
  selectedDate: Date;
  onClose: () => void;
  onCreated: () => void;
}) {
  const createStudySource = useCreateStudySource();
  const { control, register, handleSubmit, watch, formState } = useForm<StudyFormValues>({
    resolver: zodResolver(studySchema),
    defaultValues: {
      title: "",
      sourceType: "book",
      totalUnits: undefined as unknown as number,
      periodOption: "30",
      customDays: undefined,
      startDate: toISODate(selectedDate),
    },
  });

  const sourceType = watch("sourceType");
  const totalUnits = watch("totalUnits");
  const periodOption = watch("periodOption");
  const customDays = watch("customDays");
  const startDate = watch("startDate");

  const periodDays = periodOption === "custom" ? Number(customDays) || 0 : Number(periodOption);
  const unitLabel = UNIT_LABEL[sourceType];

  const preview = useMemo(() => {
    const units = Number(totalUnits) || 0;
    if (units <= 0 || periodDays <= 0 || !startDate) return null;

    const start = new Date(`${startDate}T00:00:00`);
    const chunks = allocate(units, periodDays, start);
    if (chunks.length === 0) return null;

    const end = addDays(start, periodDays - 1);
    const base = Math.floor(units / periodDays);
    const remainder = units % periodDays;

    let amountLine: string;
    if (base === 0) {
      amountLine = `${remainder}일 동안 매일 1${unitLabel}씩 (나머지 ${periodDays - remainder}일은 쉬어요)`;
    } else if (remainder === 0) {
      amountLine = `매일 ${base}${unitLabel}씩`;
    } else {
      amountLine = `${remainder}일은 ${base + 1}${unitLabel}, 나머지 ${periodDays - remainder}일은 ${base}${unitLabel}`;
    }

    return {
      amountLine,
      rangeLine: `${formatKoreanDay(start)} ~ ${formatKoreanDay(end)}`,
    };
  }, [totalUnits, periodDays, startDate, unitLabel]);

  const onSubmit = (values: StudyFormValues) => {
    const days = values.periodOption === "custom" ? values.customDays ?? 0 : Number(values.periodOption);
    if (days <= 0) return;
    createStudySource.mutate(
      {
        title: values.title.trim(),
        source_type: values.sourceType,
        total_units: values.totalUnits,
        unit_label: UNIT_LABEL[values.sourceType],
        start_date: values.startDate,
        period_days: days,
      },
      { onSuccess: onCreated },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6 pb-8 pt-4">
      <div className="flex w-full flex-col gap-3 rounded-card border border-surface-border bg-[rgba(255,255,255,0.05)] p-4">
        <Controller
          control={control}
          name="sourceType"
          render={({ field }) => (
            <SegmentedToggle
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "book", label: "책" },
                { value: "lecture", label: "강의" },
              ]}
            />
          )}
        />

        <TextInput
          placeholder={sourceType === "book" ? "책 제목 (예: 클린 코드)" : "강의명 (예: 자료구조 강의)"}
          {...register("title")}
        />
        {formState.errors.title && (
          <p className="text-[12px] text-red-300">{formState.errors.title.message}</p>
        )}

        <div className="flex gap-2">
          <NumberInput
            placeholder="0"
            suffix={sourceType === "book" ? "페이지" : "강"}
            {...register("totalUnits", { valueAsNumber: true })}
          />
          <input
            type="date"
            {...register("startDate")}
            style={{ colorScheme: "dark" }}
            className="h-[47px] w-full rounded-field border border-surface-border bg-[rgba(255,255,255,0.07)] px-4 font-['Inter:Regular',sans-serif] text-[14px] text-white outline-none"
          />
        </div>
        {formState.errors.totalUnits && (
          <p className="text-[12px] text-red-300">{formState.errors.totalUnits.message}</p>
        )}

        <Controller
          control={control}
          name="periodOption"
          render={({ field }) => (
            <SegmentedToggle
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "30", label: "30일" },
                { value: "60", label: "60일" },
                { value: "90", label: "90일" },
                { value: "custom", label: "직접입력" },
              ]}
            />
          )}
        />
        {periodOption === "custom" && (
          <NumberInput placeholder="기간(일)" suffix="일" {...register("customDays", { valueAsNumber: true })} />
        )}

        {preview && (
          <div className="rounded-field border border-[rgba(129,140,248,0.3)] bg-accent-soft px-4 py-3">
            <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-[13px] font-semibold text-white">
              {preview.amountLine}
            </p>
            <p className="mt-[2px] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-[12px] text-ink-muted">
              {preview.rangeLine}
            </p>
          </div>
        )}

        <div className="flex w-full gap-2 pt-1">
          <Button variant="secondary" type="button" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={createStudySource.isPending}>
            {createStudySource.isPending ? "등록 중..." : "등록"}
          </Button>
        </div>
        {createStudySource.isError && (
          <p className="pt-1 text-[12px] text-red-300">등록에 실패했어요. 다시 시도해주세요.</p>
        )}
      </div>
    </form>
  );
}

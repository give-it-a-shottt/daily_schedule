import { formatKoreanDay } from "../../lib/dates";
import type { ScheduleItem } from "../../types";
import { BottomSheet } from "./BottomSheet";

type DayScheduleSheetProps = {
  date: Date;
  items: ScheduleItem[];
  onClose: () => void;
  onAddSchedule: () => void;
  onToggleCompleted: (item: ScheduleItem) => void;
  onDelete: (item: ScheduleItem) => void;
  onDeleteSource: (studySourceId: string) => void;
};

function itemSubtitle(item: ScheduleItem): string {
  if (item.kind === "study" && item.unit_from != null && item.unit_to != null) {
    return item.unit_from === item.unit_to ? `${item.unit_from}` : `${item.unit_from}-${item.unit_to}`;
  }
  return item.time ?? "";
}

export function DayScheduleSheet({
  date,
  items,
  onClose,
  onAddSchedule,
  onToggleCompleted,
  onDelete,
  onDeleteSource,
}: DayScheduleSheetProps) {
  const handleDeleteSource = (item: ScheduleItem) => {
    if (!item.study_source_id) return;
    if (window.confirm("이 학습을 통째로 삭제할까요? 등록된 모든 날짜(완료한 기록 포함)가 함께 삭제돼요.")) {
      onDeleteSource(item.study_source_id);
    }
  };

  return (
    <BottomSheet
      eyebrow="학습 일정"
      title={formatKoreanDay(date)}
      onClose={onClose}
      headerExtra={
        <div className="rounded-full border border-[rgba(129,140,248,0.5)] bg-[rgba(129,140,248,0.35)] px-3 py-[5px]">
          <span className="font-['Inter:Semi_Bold','Noto_Sans_KR',sans-serif] text-[12px] font-semibold text-[rgba(255,255,255,0.85)]">
            {items.length}개 등록
          </span>
        </div>
      }
    >
      <div className="flex w-full flex-col gap-[10px] px-6 pb-2 pt-4 max-h-[45vh] overflow-y-auto">
        {items.length === 0 && (
          <p className="py-6 text-center font-['Inter:Regular','Noto_Sans_KR',sans-serif] text-[13px] text-ink-faint">
            등록된 일정이 없어요
          </p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center overflow-hidden rounded-card border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-[14px] py-[14px]"
          >
            <button
              onClick={() => onToggleCompleted(item)}
              aria-label="완료 체크"
              className={`mr-[12px] flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border ${
                item.completed ? "border-accent bg-accent" : "border-[rgba(255,255,255,0.3)]"
              }`}
            >
              {item.completed && (
                <svg fill="none" height="10" viewBox="0 0 12 10" width="12">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p
                className={`font-['Inter:Semi_Bold','Noto_Sans_KR',sans-serif] text-[14px] font-semibold leading-[1.3] ${
                  item.completed ? "text-ink-muted line-through" : "text-white"
                }`}
              >
                {item.title}
              </p>
              {itemSubtitle(item) && (
                <p className="mt-[2px] font-['Inter:Regular','Noto_Sans_KR',sans-serif] text-[12px] text-[rgba(255,255,255,0.45)]">
                  {itemSubtitle(item)}
                </p>
              )}
            </div>
            {item.kind === "study" && (
              <button
                onClick={() => handleDeleteSource(item)}
                className="ml-2 shrink-0 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.15)] px-[10px] py-[5px] font-['Inter:Semi_Bold','Noto_Sans_KR',sans-serif] text-[11px] font-semibold text-ink-faint"
              >
                전체 삭제
              </button>
            )}
            <button
              onClick={() => onDelete(item)}
              aria-label="삭제"
              className="ml-2 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-faint"
            >
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="w-full px-6 pb-8 pt-2">
        <button
          onClick={onAddSchedule}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-card border border-dashed border-surface-border py-3"
        >
          <svg fill="none" height="18" viewBox="0 0 18 18" width="18">
            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="rgba(255,255,255,0.7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
          <span className="font-['Inter:Bold','Noto_Sans_KR',sans-serif] text-[17px] font-bold tracking-[-0.425px] text-[rgba(255,255,255,0.7)]">
            일정 추가
          </span>
        </button>
      </div>
    </BottomSheet>
  );
}

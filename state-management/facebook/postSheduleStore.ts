import { create } from "zustand";

interface Schedule {
  caption: string;
  uploadFile: {
    data_url: string;
    file: File;
  }[];
}

interface PageInterface {
  schedule: Schedule;
  start: Date | null;
  end: Date | null;
  setScheduleData: (data: {
    caption?: string;
    uploadFile?: {
      data_url: string;
      file: File;
    }[];
  }) => void;
  setScheduleDate: (dates: { start?: Date; end?: Date }) => void;
}

const usePostSchedule = create<PageInterface>((set) => ({
  schedule: {
    caption: "",
    uploadFile: [],
  },
  start: new Date(),
  end: new Date(),
  setScheduleData: (data) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        caption:
          data.caption !== undefined ? data.caption : state.schedule.caption,
        uploadFile:
          data.uploadFile !== undefined
            ? data.uploadFile
            : state.schedule.uploadFile,
      },
    })),
  setScheduleDate: ({ start, end }) =>
    set((state) => ({
      start: start !== undefined ? start : state.start,
      end: end !== undefined ? end : state.end,
    })),
}));

export default usePostSchedule;
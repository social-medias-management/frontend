import { create } from "zustand";

interface Schedule {
  instagram: any;
  facebook: any;
  caption: string;
  from: string;
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
    facebook?: boolean;
    from: string;
    instagram?: boolean;
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
    facebook: "",
    instagram: "",
    from: "",
    uploadFile: [],
  },
  from: "",
  start: new Date(),
  end: new Date(),
  setScheduleData: (data) => {
    set((state) => ({
      schedule: {
        ...state.schedule,
        facebook:
          data.facebook !== undefined ? data.facebook : state.schedule.facebook,
        instagram:
          data.instagram !== undefined
            ? data.instagram
            : state.schedule.instagram,
        caption:
          data.caption !== undefined ? data.caption : state.schedule.caption,
        uploadFile:
          data.uploadFile !== undefined
            ? data.uploadFile
            : state.schedule.uploadFile,

        from: data.from !== undefined ? data.from : state.schedule.from,
      },
    }));
  },
  setScheduleDate: ({ start, end }) =>
    set((state) => ({
      start: start !== undefined ? start : state.start,
      end: end !== undefined ? end : state.end,
    })),
}));

export default usePostSchedule;

export type UIData = {
  commitHash: string;
  commitDate: string;
  version: string;
  uiProps: UIProps[];
  uiStories: UIStories[];
};

export type UIProps = {
  displayName: string;
  dirName: string;
  props: PropsData[];
};

export type PropsData = {
  description: string;
  name: string;
  required: boolean;
  type: {
    name: string;
    value: Array<{ value: string }>;
  };
};

export type UIStories = {
  storyName: string;
  dirName: string;
  filePath: string;
  storyItems: Array<{
    name: string;
    label: string;
    iframeName: string;
  }>;
};

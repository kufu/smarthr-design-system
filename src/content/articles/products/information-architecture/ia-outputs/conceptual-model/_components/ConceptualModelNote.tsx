import { FaCircleInfoIcon, Text, TextLink } from 'smarthr-ui';

export const IaOutputsNote = () => (
  <Text icon={<FaCircleInfoIcon color="TEXT_GREY" />}>
    <span>
      SmartHRの概念モデルの考え方やフォーマットは、
      <TextLink href="https://gihyo.jp/book/2020/978-4-297-11351-3">
        書籍『オブジェクト指向UIデザイン』（ソシオメディア・技術評論社）
      </TextLink>
      を参考にしています。書籍も併せて参照してください。
    </span>
  </Text>
);

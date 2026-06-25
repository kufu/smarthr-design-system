import { FaCircleInfoIcon, Text, TextLink } from 'smarthr-ui';

export const ObjectModelNote = () => (
  <Text icon={<FaCircleInfoIcon color="TEXT_GREY" />}>
    <span>
      SmartHRのオブジェクトモデルの考え方は、
      <TextLink href="https://gihyo.jp/book/2020/978-4-297-11351-3">
        書籍『オブジェクト指向UIデザイン』（ソシオメディア・技術評論社）
      </TextLink>
      に掲載されている「オブジェクト・プロパティ・アクションの関係を示した図」に基づいています。書籍も併せて参照してください。
    </span>
  </Text>
);

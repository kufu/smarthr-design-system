import { type FC } from 'react';
import { marked } from 'marked';
import { StatusLabel, Text, WarningIcon } from 'smarthr-ui';
import { getUIProps } from '@/lib/getUIData';
import styles from './index.module.css';
import { FragmentTitle } from '../FragmentTitle';
import { TypeTag } from './TypeTag';

export type ComponentPropsTableProps = {
  name: string;
  dirName?: string;
  showTitle?: string;
};

export const ComponentPropsTable: FC<ComponentPropsTableProps> = ({ name, dirName, showTitle }) => {
  // StoryのPropsを取得
  const data = getUIProps(name, dirName);
  if (!data) {
    throw new Error(`StoryのPropsが見つかりませんでした: name=${name} dirName=${dirName}`);
  }

  const { displayName, props: propsData } = data;

  const fragmentId = (propsName: string) => `props-${propsName.replace(' ', '-')}`;
  if (propsData === null || propsData.length === 0) {
    return <Text as={'p'}>Propsは設定されていません。</Text>;
  }

  return (
    <>
      {showTitle && (
        <FragmentTitle tag="h3" id={fragmentId(displayName)}>
          {displayName} props
        </FragmentTitle>
      )}
      <div className={styles.wrapper}>
        {propsData.map((prop) => (
          <div className={styles.propContent} key={prop.name}>
            <div className={styles.propName}>
              <span>{prop?.name}</span>
              {prop.required && <StatusLabel type="red">必須</StatusLabel>}
              {prop.description.includes('@deprecated') && <WarningIcon alt="非推奨" />}
            </div>
            <div className={styles.propTypes}>
              {prop.type.name === 'enum' ? (
                prop.type.value && prop.type.value.map(({ value }, y) => <TypeTag content={value ?? ''} key={y} />)
              ) : (
                <TypeTag content={prop.type.name} />
              )}
            </div>
            <div className={styles.propDescription} dangerouslySetInnerHTML={{ __html: marked.parse(prop.description ?? '') }} />
          </div>
        ))}
      </div>
    </>
  );
};

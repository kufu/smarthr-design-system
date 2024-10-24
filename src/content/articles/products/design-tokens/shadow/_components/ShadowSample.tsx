import { defaultColor } from 'smarthr-ui';

type Props = {
  depth?: number;
};

export default function ShadowSample({ depth = 1 }: Props) {
  return (
    <div
      style={{
        width: '96px',
        height: '96px',
        borderRadius: '4px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `${
          depth === 0
            ? 'none'
            : `0 ${2 ** (depth - 1)}px ${2 ** depth}px ${depth - 1 >= 0 ? 2 ** (depth - 2) : 0}px ${defaultColor.TRANSPARENCY_30}`
        }`,
      }}
    >
      LAYER{depth}
    </div>
  );
}

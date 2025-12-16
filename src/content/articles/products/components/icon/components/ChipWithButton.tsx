import { Chip, FaCircleXmarkIcon, UnstyledButton } from 'smarthr-ui';

export const ChipWithButton = () => {
  const chipStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  };
  const buttonStyle = {
    borderRadius: '100%',
    lineHeight: 0,
  };
  return (
    <Chip style={chipStyle}>
      <span>チップ</span>
      <UnstyledButton style={buttonStyle}>
        <FaCircleXmarkIcon alt="削除" />
      </UnstyledButton>
    </Chip>
  );
};

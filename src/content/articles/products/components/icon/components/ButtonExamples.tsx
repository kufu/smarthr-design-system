import { Button, FaCirclePlusIcon, FaFilterIcon } from 'smarthr-ui';

export const ButtonWithPlusIcon = () => <Button prefix={<FaCirclePlusIcon />}>追加</Button>;

export const ButtonWithFilterIcon = () => <Button suffix={<FaFilterIcon />}>絞り込み</Button>;

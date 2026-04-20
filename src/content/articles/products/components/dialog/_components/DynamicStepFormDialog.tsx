import { useState } from 'react';
import { Button, ControlledStepFormDialog, IntlProvider, StepFormDialogItem } from 'smarthr-ui';

interface Step {
  id: string;
  stepNumber: number;
}

interface StepMockItem extends Step {
  label: string;
}

export default function DynamicStepFormDialog() {
  const [opened, setOpened] = useState(false);

  const steps: StepMockItem[] = [
    { id: 'step1', label: 'ステップ1', stepNumber: 1 },
    { id: 'step2', label: 'ステップ2', stepNumber: 2 },
    { id: 'step3', label: 'ステップ3', stepNumber: 3 },
  ];

  const lastStep = steps[steps.length - 1];

  const handleSubmit = (
    _e: React.FormEvent<HTMLFormElement>,
    { goto, close, currentStep }: { goto: (step: Step) => void; close: () => void; currentStep: Step },
  ) => {
    if (currentStep.id === lastStep.id) {
      close();
    } else {
      const idx = steps.findIndex((s) => s.id === currentStep.id);
      const next = steps[idx + 1];
      if (next) {
        goto(next);
      }
    }
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setOpened(true)}>StepFormDialog を開く</Button>
      <ControlledStepFormDialog
        isOpen={opened}
        heading="ステップフォームダイアログ"
        submitButton={(currentStep) => (currentStep.id === lastStep.id ? '保存' : '次へ')}
        stepLength={steps.length}
        firstStep={steps[0]}
        onSubmit={handleSubmit}
        onClickClose={handleClose}
        size="XS"
      >
        {steps.map((step) => (
          <StepFormDialogItem {...step} key={step.id}>
            <p>{step.label}</p>
          </StepFormDialogItem>
        ))}
      </ControlledStepFormDialog>
    </IntlProvider>
  );
}

import { useState } from 'react';
import { Button, IntlProvider, StepFormDialog, StepFormDialogItem } from 'smarthr-ui';

interface Step {
  id: string;
  stepNumber: number;
}

interface StepMockItem extends Step {
  label: string;
}

export default function DynamicStepFormDialog() {
  const [opened, setOpened] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: StepMockItem[] = [
    { id: 'step1', label: 'ステップ1', stepNumber: 1 },
    { id: 'step2', label: 'ステップ2', stepNumber: 2 },
    { id: 'step3', label: 'ステップ3', stepNumber: 3 },
  ];

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    { goto, close, currentStep }: { goto: (step: Step) => void; close: () => void; currentStep: Step },
  ) => {
    if (currentStep.id === steps[steps.length - 1].id) {
      close();
    } else {
      const next = Math.min(stepIndex + 1, steps.length - 1);
      setStepIndex(next);
      goto(steps[next]);
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(stepIndex - 1, 0);
    setStepIndex(prevStep);
  };

  const handleClose = () => {
    setOpened(false);
    // ダイアログが閉じる前に中身の表示がステップ0に戻るのを視覚的に防ぐ
    setTimeout(() => setStepIndex(0), 300);
  };

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setOpened(true)}>StepFormDialog を開く</Button>
      <StepFormDialog
        isOpen={opened}
        heading="ステップフォームダイアログ"
        submitLabel={stepIndex < steps.length - 1 ? '次へ' : '保存'}
        stepLength={steps.length}
        firstStep={steps[0]}
        onSubmit={handleSubmit}
        onClickClose={handleClose}
        onClickBack={stepIndex > 0 ? handleBack : undefined}
        size="XS"
      >
        {steps.map((step) => (
          <StepFormDialogItem {...step} key={step.id}>
            <p>{step.label}</p>
          </StepFormDialogItem>
        ))}
      </StepFormDialog>
    </IntlProvider>
  );
}

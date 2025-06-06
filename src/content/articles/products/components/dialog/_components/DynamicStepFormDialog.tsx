import { useState } from 'react';
import { Button, IntlProvider, StepFormDialog, StepFormDialogItem } from 'smarthr-ui';

export default function DynamicModelessDialog() {
  const [opened, setOpened] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'step1', label: 'ステップ1', stepNumber: 1 },
    { id: 'step2', label: 'ステップ2', stepNumber: 2 },
    { id: 'step3', label: 'ステップ3', stepNumber: 3 },
  ];

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    return steps[nextStep]; // stepNumber を含む StepItem を返す
  };

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
    return steps[prevStep]; // stepNumber を含む StepItem を返す
  };

  const handleClose = () => {
    setOpened(false);
    setCurrentStep(0);
  };

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setOpened(true)}>StepFormDialog を開く</Button>
      <StepFormDialog
        isOpen={opened}
        title="ステップフォームダイアログ"
        submitLabel={currentStep < steps.length - 1 ? '次へ' : '保存'}
        stepLength={steps.length}
        firstStep={steps[0]}
        onSubmit={(closeDialog, _e, currentStepItem) => {
          if (currentStepItem.id === steps[steps.length - 1].id) {
            closeDialog();
            setTimeout(handleClose, 300);
            return undefined;
          } else {
            return handleNext(); // StepItem を返す
          }
        }}
        onClickClose={handleClose}
        onClickBack={currentStep > 0 ? handleBack : undefined}
        width="480px"
      >
        <StepFormDialogItem {...steps[currentStep]}>
          <p>{steps[currentStep].label}</p>
        </StepFormDialogItem>
      </StepFormDialog>
    </IntlProvider>
  );
}

import { FormGroup, ValidatorFn } from "@angular/forms";

export function startTimeBeforeEndTimeValidator(): ValidatorFn  {
  return (form: FormGroup): { [key: string]: any } | null => {
  const startTime = form.get('startTime')?.value;
  const endTime = form.get('endTime')?.value;

  if (startTime && endTime && startTime >= endTime) {
    return { startTimeAfterEndTime: true };
  }

  return null;
}
}

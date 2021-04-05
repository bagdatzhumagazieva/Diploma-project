export namespace InputChipsTypes {
  export interface IProps {
    type: 'phone' | 'mail';
    // Mask for phone number for now we are decided
    // have mask only +99999999999 ("+" ans amount of numbers in telephone)
    // Later we will modify mask
    mask?: string;
    onInputsChange?(inputs: string[], isValid: boolean): void;
  }
}

export interface IValue {
  id: string;
  value: string;
  valid: boolean;
}

export interface IEditedInput {
  id: string;
  value: string;
}

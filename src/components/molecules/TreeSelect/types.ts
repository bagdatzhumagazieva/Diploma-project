import { IBaseProps } from 'src/core/components/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace TreeSelectTypes {
  export interface IProps extends IBaseProps {
    name?: string;
    treeOptions: ITreeOption[];
    selectedTreeOption?: ITreeOption;
    selectedTreeOptions?: ITreeOption[];
    placeholder?: string;
    withCheckbox?: boolean;
    staticWidth?: boolean;
    errorMessage?: string;
    openedTreeObject?: {};
    titleVariant?: string;
    customTree?: ITreeOption;
    loading?: boolean;
    isPositionFixed?: boolean;
    isPositionStatic?: boolean;
    isMultiSelect?: boolean;
    chooseLimit?: number;
    withChips?: boolean;
    prompt?: string;
    withoutRef?: boolean;
    setSelectedOptions?(options: ITreeOption[]): void;
    setSelectedOption?(option: ITreeOption, name?: string): void;
    onCustomTreeOptionClick?(option: ITreeOption): void;
    onCheckboxChanges?(options: {}): void;
  }
}

export namespace TreeSelectOptionsTypes {
  export interface IProps {
    spacerCount: number;
    openedTreeObj?: {};
    checkedTreeObj?: {};
    withCheckbox?: boolean;
    isParentChecked?: boolean;
    treeOptions: ITreeOption[];
    selectedTreeOption?: ITreeOption;
    selectedTreeOptions?: ITreeOption[];
    isMultiSelect?: boolean;
    chooseLimit?: number;
    onCheckboxChanges?(value: string, checkboxState: boolean): void;
    onTreeCollapseClick?(value: string): void;
    onTreeItemClick?(option: ITreeOption): void;
  }
}

export interface ITreeOption extends IOption {
  children?: ITreeOption[];
}

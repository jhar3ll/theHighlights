/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SetlistCreateFormInputValues = {
    addedBy?: string;
};
export declare type SetlistCreateFormValidationValues = {
    addedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SetlistCreateFormOverridesProps = {
    SetlistCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addedBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SetlistCreateFormProps = React.PropsWithChildren<{
    overrides?: SetlistCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SetlistCreateFormInputValues) => SetlistCreateFormInputValues;
    onSuccess?: (fields: SetlistCreateFormInputValues) => void;
    onError?: (fields: SetlistCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SetlistCreateFormInputValues) => SetlistCreateFormInputValues;
    onValidate?: SetlistCreateFormValidationValues;
} & React.CSSProperties>;
export default function SetlistCreateForm(props: SetlistCreateFormProps): React.ReactElement;

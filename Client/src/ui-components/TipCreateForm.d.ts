/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TipCreateFormInputValues = {
    name?: string;
    amount?: number;
    type?: string;
};
export declare type TipCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TipCreateFormOverridesProps = {
    TipCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TipCreateFormProps = React.PropsWithChildren<{
    overrides?: TipCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TipCreateFormInputValues) => TipCreateFormInputValues;
    onSuccess?: (fields: TipCreateFormInputValues) => void;
    onError?: (fields: TipCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TipCreateFormInputValues) => TipCreateFormInputValues;
    onValidate?: TipCreateFormValidationValues;
} & React.CSSProperties>;
export default function TipCreateForm(props: TipCreateFormProps): React.ReactElement;

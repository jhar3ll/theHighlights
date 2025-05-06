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
    amount?: number;
    email?: string;
    message?: string;
    name?: string;
    paymentType?: string;
    requestInfo?: string;
    transactionId?: string;
    type?: string;
};
export declare type TipCreateFormValidationValues = {
    amount?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    paymentType?: ValidationFunction<string>;
    requestInfo?: ValidationFunction<string>;
    transactionId?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TipCreateFormOverridesProps = {
    TipCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    paymentType?: PrimitiveOverrideProps<TextFieldProps>;
    requestInfo?: PrimitiveOverrideProps<TextFieldProps>;
    transactionId?: PrimitiveOverrideProps<TextFieldProps>;
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

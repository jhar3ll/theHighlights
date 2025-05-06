/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Tip } from "../models";
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
export declare type TipUpdateFormInputValues = {
    amount?: number;
    email?: string;
    message?: string;
    name?: string;
    paymentType?: string;
    requestInfo?: string;
    transactionId?: string;
    type?: string;
};
export declare type TipUpdateFormValidationValues = {
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
export declare type TipUpdateFormOverridesProps = {
    TipUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    paymentType?: PrimitiveOverrideProps<TextFieldProps>;
    requestInfo?: PrimitiveOverrideProps<TextFieldProps>;
    transactionId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TipUpdateFormProps = React.PropsWithChildren<{
    overrides?: TipUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tip?: Tip;
    onSubmit?: (fields: TipUpdateFormInputValues) => TipUpdateFormInputValues;
    onSuccess?: (fields: TipUpdateFormInputValues) => void;
    onError?: (fields: TipUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TipUpdateFormInputValues) => TipUpdateFormInputValues;
    onValidate?: TipUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TipUpdateForm(props: TipUpdateFormProps): React.ReactElement;

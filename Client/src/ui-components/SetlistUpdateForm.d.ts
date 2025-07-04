/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Setlist } from "../models";
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
export declare type SetlistUpdateFormInputValues = {
    addedBy?: string;
};
export declare type SetlistUpdateFormValidationValues = {
    addedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SetlistUpdateFormOverridesProps = {
    SetlistUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addedBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SetlistUpdateFormProps = React.PropsWithChildren<{
    overrides?: SetlistUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    setlist?: Setlist;
    onSubmit?: (fields: SetlistUpdateFormInputValues) => SetlistUpdateFormInputValues;
    onSuccess?: (fields: SetlistUpdateFormInputValues) => void;
    onError?: (fields: SetlistUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SetlistUpdateFormInputValues) => SetlistUpdateFormInputValues;
    onValidate?: SetlistUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SetlistUpdateForm(props: SetlistUpdateFormProps): React.ReactElement;

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
export declare type UserSongsCreateFormInputValues = {
    userPoolId?: string;
};
export declare type UserSongsCreateFormValidationValues = {
    userPoolId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserSongsCreateFormOverridesProps = {
    UserSongsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userPoolId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserSongsCreateFormProps = React.PropsWithChildren<{
    overrides?: UserSongsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserSongsCreateFormInputValues) => UserSongsCreateFormInputValues;
    onSuccess?: (fields: UserSongsCreateFormInputValues) => void;
    onError?: (fields: UserSongsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSongsCreateFormInputValues) => UserSongsCreateFormInputValues;
    onValidate?: UserSongsCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserSongsCreateForm(props: UserSongsCreateFormProps): React.ReactElement;

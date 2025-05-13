/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { UserSongs } from "../models";
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
export declare type UserSongsUpdateFormInputValues = {
    userPoolId?: string;
};
export declare type UserSongsUpdateFormValidationValues = {
    userPoolId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserSongsUpdateFormOverridesProps = {
    UserSongsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userPoolId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserSongsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserSongsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userSongs?: UserSongs;
    onSubmit?: (fields: UserSongsUpdateFormInputValues) => UserSongsUpdateFormInputValues;
    onSuccess?: (fields: UserSongsUpdateFormInputValues) => void;
    onError?: (fields: UserSongsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSongsUpdateFormInputValues) => UserSongsUpdateFormInputValues;
    onValidate?: UserSongsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserSongsUpdateForm(props: UserSongsUpdateFormProps): React.ReactElement;

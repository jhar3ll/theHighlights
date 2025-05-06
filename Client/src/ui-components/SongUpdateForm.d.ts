/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Song } from "../models";
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
export declare type SongUpdateFormInputValues = {
    artist?: string;
    title?: string;
};
export declare type SongUpdateFormValidationValues = {
    artist?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SongUpdateFormOverridesProps = {
    SongUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    artist?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SongUpdateFormProps = React.PropsWithChildren<{
    overrides?: SongUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    song?: Song;
    onSubmit?: (fields: SongUpdateFormInputValues) => SongUpdateFormInputValues;
    onSuccess?: (fields: SongUpdateFormInputValues) => void;
    onError?: (fields: SongUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SongUpdateFormInputValues) => SongUpdateFormInputValues;
    onValidate?: SongUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SongUpdateForm(props: SongUpdateFormProps): React.ReactElement;

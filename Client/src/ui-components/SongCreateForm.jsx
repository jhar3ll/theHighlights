/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Song } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function SongCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    addedBy: "",
    album: "",
    artist: "",
    title: "",
  };
  const [addedBy, setAddedBy] = React.useState(initialValues.addedBy);
  const [album, setAlbum] = React.useState(initialValues.album);
  const [artist, setArtist] = React.useState(initialValues.artist);
  const [title, setTitle] = React.useState(initialValues.title);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAddedBy(initialValues.addedBy);
    setAlbum(initialValues.album);
    setArtist(initialValues.artist);
    setTitle(initialValues.title);
    setErrors({});
  };
  const validations = {
    addedBy: [{ type: "Required" }],
    album: [{ type: "Required" }],
    artist: [{ type: "Required" }],
    title: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          addedBy,
          album,
          artist,
          title,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new Song(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SongCreateForm")}
      {...rest}
    >
      <TextField
        label="Added by"
        isRequired={true}
        isReadOnly={false}
        value={addedBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addedBy: value,
              album,
              artist,
              title,
            };
            const result = onChange(modelFields);
            value = result?.addedBy ?? value;
          }
          if (errors.addedBy?.hasError) {
            runValidationTasks("addedBy", value);
          }
          setAddedBy(value);
        }}
        onBlur={() => runValidationTasks("addedBy", addedBy)}
        errorMessage={errors.addedBy?.errorMessage}
        hasError={errors.addedBy?.hasError}
        {...getOverrideProps(overrides, "addedBy")}
      ></TextField>
      <TextField
        label="Album"
        isRequired={true}
        isReadOnly={false}
        value={album}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addedBy,
              album: value,
              artist,
              title,
            };
            const result = onChange(modelFields);
            value = result?.album ?? value;
          }
          if (errors.album?.hasError) {
            runValidationTasks("album", value);
          }
          setAlbum(value);
        }}
        onBlur={() => runValidationTasks("album", album)}
        errorMessage={errors.album?.errorMessage}
        hasError={errors.album?.hasError}
        {...getOverrideProps(overrides, "album")}
      ></TextField>
      <TextField
        label="Artist"
        isRequired={true}
        isReadOnly={false}
        value={artist}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addedBy,
              album,
              artist: value,
              title,
            };
            const result = onChange(modelFields);
            value = result?.artist ?? value;
          }
          if (errors.artist?.hasError) {
            runValidationTasks("artist", value);
          }
          setArtist(value);
        }}
        onBlur={() => runValidationTasks("artist", artist)}
        errorMessage={errors.artist?.errorMessage}
        hasError={errors.artist?.hasError}
        {...getOverrideProps(overrides, "artist")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addedBy,
              album,
              artist,
              title: value,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

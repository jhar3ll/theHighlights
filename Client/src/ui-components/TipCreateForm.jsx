/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { Tip } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function TipCreateForm(props) {
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
    amount: "",
    email: "",
    message: "",
    name: "",
    paymentType: "",
    requestInfo: "",
    transactionId: "",
    type: "",
  };
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [email, setEmail] = React.useState(initialValues.email);
  const [message, setMessage] = React.useState(initialValues.message);
  const [name, setName] = React.useState(initialValues.name);
  const [paymentType, setPaymentType] = React.useState(
    initialValues.paymentType
  );
  const [requestInfo, setRequestInfo] = React.useState(
    initialValues.requestInfo
  );
  const [transactionId, setTransactionId] = React.useState(
    initialValues.transactionId
  );
  const [type, setType] = React.useState(initialValues.type);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAmount(initialValues.amount);
    setEmail(initialValues.email);
    setMessage(initialValues.message);
    setName(initialValues.name);
    setPaymentType(initialValues.paymentType);
    setRequestInfo(initialValues.requestInfo);
    setTransactionId(initialValues.transactionId);
    setType(initialValues.type);
    setErrors({});
  };
  const validations = {
    amount: [{ type: "Required" }],
    email: [],
    message: [],
    name: [{ type: "Required" }],
    paymentType: [{ type: "Required" }],
    requestInfo: [],
    transactionId: [{ type: "Required" }],
    type: [{ type: "Required" }],
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
          amount,
          email,
          message,
          name,
          paymentType,
          requestInfo,
          transactionId,
          type,
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
          await DataStore.save(new Tip(modelFields));
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
      {...getOverrideProps(overrides, "TipCreateForm")}
      {...rest}
    >
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              amount: value,
              email,
              message,
              name,
              paymentType,
              requestInfo,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email: value,
              message,
              name,
              paymentType,
              requestInfo,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message: value,
              name,
              paymentType,
              requestInfo,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message,
              name: value,
              paymentType,
              requestInfo,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Payment type"
        isRequired={true}
        isReadOnly={false}
        value={paymentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message,
              name,
              paymentType: value,
              requestInfo,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.paymentType ?? value;
          }
          if (errors.paymentType?.hasError) {
            runValidationTasks("paymentType", value);
          }
          setPaymentType(value);
        }}
        onBlur={() => runValidationTasks("paymentType", paymentType)}
        errorMessage={errors.paymentType?.errorMessage}
        hasError={errors.paymentType?.hasError}
        {...getOverrideProps(overrides, "paymentType")}
      ></TextField>
      <TextField
        label="Request info"
        isRequired={false}
        isReadOnly={false}
        value={requestInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message,
              name,
              paymentType,
              requestInfo: value,
              transactionId,
              type,
            };
            const result = onChange(modelFields);
            value = result?.requestInfo ?? value;
          }
          if (errors.requestInfo?.hasError) {
            runValidationTasks("requestInfo", value);
          }
          setRequestInfo(value);
        }}
        onBlur={() => runValidationTasks("requestInfo", requestInfo)}
        errorMessage={errors.requestInfo?.errorMessage}
        hasError={errors.requestInfo?.hasError}
        {...getOverrideProps(overrides, "requestInfo")}
      ></TextField>
      <TextField
        label="Transaction id"
        isRequired={true}
        isReadOnly={false}
        value={transactionId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message,
              name,
              paymentType,
              requestInfo,
              transactionId: value,
              type,
            };
            const result = onChange(modelFields);
            value = result?.transactionId ?? value;
          }
          if (errors.transactionId?.hasError) {
            runValidationTasks("transactionId", value);
          }
          setTransactionId(value);
        }}
        onBlur={() => runValidationTasks("transactionId", transactionId)}
        errorMessage={errors.transactionId?.errorMessage}
        hasError={errors.transactionId?.hasError}
        {...getOverrideProps(overrides, "transactionId")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              email,
              message,
              name,
              paymentType,
              requestInfo,
              transactionId,
              type: value,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Request"
          value="REQUEST"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Donation"
          value="DONATION"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Payment"
          value="PAYMENT"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
      </SelectField>
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

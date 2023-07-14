import ReactDOM from "react-dom";
import { Formik, Field, Form, useFormik } from "formik";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Radio,
    HStack,
    VStack,
    RadioGroup,
    Button,
    Container,
    Square,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Text, Spacer, Heading
  } from '@chakra-ui/react'
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";
    import { DatePickerField } from "./BookingPageFormDatePicker";
    import Select from "./Select"

interface Props {
    availableTimes: () => void;
}

const BookingPageForm = ({availableTimes}: Props) => {

    function validate(e: string) {

        let errorMessage = "";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)) {
          errorMessage = 'Invalid email address';
        }
        return errorMessage;
      };

    return (
        
        <VStack>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', time:'', occasion: '', guests: '', date: '' }}
                onSubmit={ async (values, actions) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setTimeout(() => {
                        alert(`Thanks for your booking, ` + values.firstName + ` ` + values.lastName + `! We at Little Lemon look forward to seeing you at ` + values.time + ` PM on ` + values.date + `. A confirmation email has been sent to ` + values.email + ` .`);
                        actions.setSubmitting(false);
                    }, 1000);
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                <Form className="form-booking">
                    <VStack display="flex" className="container-booking">
                        <Heading className="text-section-title" color="#F4CE14">Book a table</Heading>
                        <HStack className="hstack-booking">
                            <VStack className="vstack-booking" alignItems="flex-start">
                                <label htmlFor="firstName" className="label-booking">First Name</label>
                                <Field name="firstName" type="text"/>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <label htmlFor="lastName" className="label-booking">Last Name</label>
                                <Field name="lastName" type="text"/>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <label htmlFor="email" className="label-booking">Email address</label>
                                <Field validate={validate} name="email" type="email" />
                            </VStack>
                        </HStack>
                        {errors.email && touched.email ? <div className="email-error">{errors.email}</div> : null}
                        <HStack className="hstack-booking">
                            <VStack alignItems="flex-start">
                                <label htmlFor="occasion" className="label-booking">Occasion</label>
                                <Field name="occasion" as="select">
                                    <option value="birthday" className="label-booking">Birthday</option>
                                    <option value="anniversary">Anniversary</option>
                                    <option value="other">Other</option>
                                </Field>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <label htmlFor="guests" className="label-booking">Guests</label>
                                <Field name="guests" as="select" className="field-booking">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="6">7</option>
                                    <option value="6">8</option>
                                    <option value="6">9</option>
                                    <option value="6">10</option>
                                </Field>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <label htmlFor="time" className="label-booking">Time</label>
                                <Select arr={availableTimes}>{availableTimes}
                                    </Select>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <label htmlFor="date" className="label-booking">Date</label>
                                <DatePickerField name="date" />
                            </VStack>
                        </HStack>
                        <HStack className="hstack-booking">
                            <Button type="submit" width="33%" height="50px" borderRadius={16} className="button-light">Confirm booking</Button>
                        </HStack>
                    </VStack>
                </Form>
                )}
            </Formik>
        </VStack>
    )
}

//<Field name="time" as="select" color="black">
//{availableTimesList.map((availableTime) => <option>{availableTime.time}</option>)}
//</Field>

export default BookingPageForm;
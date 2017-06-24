import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import GrommetApp from 'grommet/components/App';
import isEmail from 'validator/lib/isEmail';
import trim from 'lodash/trim';
import omit from 'lodash/omit';
import { registerOrganization } from '../actions';

const renderTextField = ({ input, label, meta: { touched, error }, htmlFor, help, ...custom }) => {
  const onSelect = ({ suggestion }) => input.onChange(suggestion);
  return (
    <FormField help={help} label={label} error={touched && error} htmlFor={htmlFor}>
      <TextInput onSelect={onSelect} onDOMChange={input.onChange} {...omit(input, 'onChange')} {...custom} />
    </FormField>
  );
};

const Register = ({ handleSubmit, authUser }) =>
  <GrommetApp centered={false}>
    <Box full={true} style={{ flexDirection: 'row' }}>
      <Box colorIndex="grey-4" align="center" justify="center" flex="grow" direction="row">
        <Box colorIndex="light-2" pad="medium" margin="medium">
          <Form onSubmit={handleSubmit}>
            <Header>
              <Heading>
                Register Organization
              </Heading>
            </Header>
            <FormFields>
              <Field
                name="domain"
                label="Domain name"
                placeHolder="please enter your domain name"
                component={renderTextField}
              />
              <Field name="organizationName" label="Organization name" component={renderTextField} />
              <Field name="email" label="Email" component={renderTextField} />
              <Field name="password" label="Password" component={renderTextField} />
            </FormFields>
            <Footer pad={{ vertical: 'medium' }}>
              <Button label="Register" type="submit" primary={true} fill={true} />
            </Footer>
          </Form>
        </Box>
      </Box>
    </Box>
  </GrommetApp>;

Register.propTypes = {
  authUser: PropTypes.func
};

const validate = values => {
  const errors = {};
  const requiredFields = ['domain', 'organizationName', 'email', 'password'];
  requiredFields.forEach(field => {
    if (!trim(values[field])) {
      errors[field] = 'Required';
    }
  });

  if (!errors.email && !isEmail(trim(values.email))) {
    errors.email = 'Invalid email address';
  }

  if (!errors.domain && trim(values.domain).length < 6) {
    errors.domain = 'domain should be at least 5 chars';
  }

  if (!errors.organizationName && trim(values.organizationName).length < 6) {
    errors.organizationName = 'Organization Name should be at least 5 chars';
  }

  return errors;
};

function onSubmit(values, dispatch) {
  return dispatch(registerOrganization(values));
}

export default reduxForm({
  form: 'RegisterForm',
  onSubmit,
  validate
})(Register);

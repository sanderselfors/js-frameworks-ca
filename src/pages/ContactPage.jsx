import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Full name must be at least 3 characters')
      .required('Full name is required'),
    subject: Yup.string()
      .min(3, 'Subject must be at least 3 characters')
      .required('Subject is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(/@noroff\.no$|@stud\.noroff\.no$/, 'Email must be from noroff.no or stud.noroff.no domain'),
    body: Yup.string()
      .min(3, 'Body must be at least 3 characters')
      .required('Body is required'),
  });

  const initialValues = {
    fullName: '',
    subject: '',
    email: '',
    body: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-8 mx-auto"
    >
      <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4"
            >
              <label htmlFor="fullName" className="block mb-1">Full Name:</label>
              <Field type="text" id="fullName" name="fullName" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="fullName" component="div" className="text-red-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-4"
            >
              <label htmlFor="subject" className="block mb-1">Subject:</label>
              <Field type="text" id="subject" name="subject" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="subject" component="div" className="text-red-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-4"
            >
              <label htmlFor="email" className="block mb-1">Email:</label>
              <Field type="email" id="email" name="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-4"
            >
              <label htmlFor="body" className="block mb-1">Body:</label>
              <Field as="textarea" id="body" name="body" rows="5" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="body" component="div" className="text-red-500" />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded focus:outline-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default ContactForm;

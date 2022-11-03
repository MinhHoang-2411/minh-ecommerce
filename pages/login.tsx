import Link from "next/link";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";
import {useEffect, useRef} from "react";

export default function LoginScreen() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Layout title="Login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, submitProps) => {
          console.log(values.email, values.password);
          submitProps.resetForm();
        }}
      >
        {(formik) => {
          return (
            <Form className="mx-auto max-w-screen-md">
              {" "}
              <h1 className="mb-4 text-xl">Login</h1>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full"
                  id="email"
                  ref={inputRef}
                ></input>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full"
                  id="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 ">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-4 ">
                <button className="primary-button">Login</button>
              </div>
              <div className="mb-4 ">
                Don't have an account? &nbsp;
                <Link href="register">Register</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

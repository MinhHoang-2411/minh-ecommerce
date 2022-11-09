import Link from "next/link";
import React, {useEffect} from "react";
import {signIn, useSession} from "next-auth/react";
import Layout from "../components/Layout";
import {getError} from "../utils/error";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function RegisterScreen() {
  const {data: session} = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [router, session]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  return (
    <Layout title="Create Account">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const {name, email, password} = values;
          try {
            await axios.post("/api/auth/signup", {
              name,
              email,
              password,
            });

            const result = await signIn("credentials", {
              redirect: false,
              email,
              password,
            });
            if (result?.error) {
              toast.error(result?.error);
            }
          } catch (err) {
            toast.error(getError(err));
          }
        }}
      >
        {(formik) => (
          <Form className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-xl">Create Account</h1>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name">Email</label>
              <input
                type="text"
                className="w-full"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                className="w-full"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name">Confirm password</label>
              <input
                type="password"
                className="w-full"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div className="mb-4 ">
              <button type="submit" className="primary-button">
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

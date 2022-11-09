import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";
import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {getError} from "../utils/error";

export default function LoginScreen() {
  const {data: session} = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [router, session]);

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
        onSubmit={async (values, submitProps) => {
          try {
            const result = await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            });
            if (result?.error) {
              toast.error(result.error);
            }
          } catch (err) {
            toast.error(getError(err));
          }
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
                <Link href={`/register`}>Register</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

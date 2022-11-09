import React, {useContext, useEffect} from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {Store} from "../utils/Store";

type Props = {};

const ShippingScreen = (props: Props) => {
  const {state, dispatch} = useContext(Store);
  const {cart} = state;
  // const {shippingAddress} = cart;
  const router = useRouter();

  const initialValues = {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const {fullName, address, city, postalCode, country} = values;
          dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: {fullName, address, city, postalCode, country},
          });
          Cookies.set(
            "cart",
            JSON.stringify({
              ...cart,
              shippingAddress: {
                fullName,
                address,
                city,
                postalCode,
                country,
              },
            })
          );

          router.push("/payment");
        }}
      >
        {(formik) => {
          useEffect(() => {
            if (cart?.shippingAddress?.fullName) {
              formik.setFieldValue("fullName", cart.shippingAddress.fullName);
              formik.setFieldValue("address", cart.shippingAddress.address);
              formik.setFieldValue("city", cart.shippingAddress.city);
              formik.setFieldValue(
                "postalCode",
                cart.shippingAddress.postalCode
              );
              formik.setFieldValue("country", cart.shippingAddress.country);
            }
          }, [cart.shippingAddress]);
          return (
            <Form>
              <h1 className="mb-4 text-xl">Shipping Address</h1>
              <div className="mb-4">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="w-full"
                  id="fullName"
                  name="fullName"
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="text-red-500">{formik.errors.fullName}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="address">Address</label>
                <input
                  className="w-full"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500">{formik.errors.address}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="city">City</label>
                <input
                  className="w-full"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500">{formik.errors.city}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  className="w-full"
                  id="postalCode"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.postalCode && formik.errors.postalCode && (
                  <div className="text-red-500">{formik.errors.postalCode}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="country">Country</label>
                <input
                  className="w-full"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-500">{formik.errors.country}</div>
                )}
              </div>
              <div className="mb-4 flex justify-between">
                <button type="submit" className="primary-button">
                  Next
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};
ShippingScreen.auth = true;
export default ShippingScreen;

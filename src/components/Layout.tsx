import { Outlet, Link } from "react-router-dom";
import { LoginBar } from "./LoginBar";
import { Icon, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useShoppingCart } from "context/ShoppingCartContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateBar } from "./CreateBar";
import { createContext, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const siteMap = [
      {
          key: 0,
          name: "Home",
          link: "/"
      },
      {
          key: 1,
          name: "About",
          link: "/about"
      },
      {
          key: 2,
          name: "Menu",
          link: "/menu"
      },
      {
          key: 3,
          name: "Cart",
          link: "/cart"
      }
  ]
type LayoutProps = {
  contacts: {
    key: number
    name: string
    data: string
    link: string
  }[],
  socials: {
    key: number
    name: string
    icon: any
    link: string
  }[],
  zips: number []
}

export const LoginContext = createContext<Boolean>(false)

export const Layout = (props: LayoutProps) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const addressRegExp = /^\s*\S+(?:\s+\S+){2}/
    const zipRegExp = /^[0-9]+$/

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters"),
        lastName: Yup.string()
            .required("First name is required")
            .min(1, "First name must be at least 2 characters"),
        email: Yup.string()
          .required("Email is a required field")
          .email("Invalid email format"),
        password: Yup.string()
          .required("Password is a required field")
          .min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .min(8, "Password must be at least 8 characters")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        loginPassword: Yup.string()
            .required("Please enter your password")
            .min(8, "Password must be at least 8 characters")
            .oneOf([Yup.ref("password")], "Login details incorrect"),
        phone: Yup.string()
            .required("Phone number required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "Phone number must have 10 digits")
            .max(10, "Phone number must have 10 digits"),
        address: Yup.string()
            .required("Address is required")
            .matches(addressRegExp, "Invalid address")
            .max(30, "Your address is too long"),
        zip: Yup.string()
            .required("Zip is required")
            .matches(zipRegExp, "Must be only digits")
            .min(5, 'Must be exactly 5 digits')
            .max(5, 'Must be exactly 5 digits')
      });

    const { cartQuantity }  = useShoppingCart()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ user, setUser ] = useState(false)
    const [ loggedIn, setLoggedIn ] = useState(false)
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <>
        <Formik
          validationSchema={schema}
          initialValues={{
            firstName: localStorage.getItem("firstName") || "",
            lastName: localStorage.getItem("lastName") || "",
            email: localStorage.getItem("email") || "",
            phone: localStorage.getItem("phone") || "",
            password: localStorage.getItem("password") || "",
            confirmPassword: "",
            loginPassword: "",
            address: localStorage.getItem("address") || "",
            zip: localStorage.getItem("zip") || "",
          }}
          onSubmit={(values, actions) => {
            setTimeout((e: any) => {
              if(localStorage.getItem("email") === "") {
                Object.entries(values).map((key: any) => {
                  const myKey = key.toString().split(",");
                  return localStorage.setItem(myKey[0], myKey[1]);
                });
              }
              setUser(true);
              setLoggedIn(true);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <nav className="top-nav">
                <div className="top-nav-top">
                  <Link to={"/"}>
                    <h1 className="page-title">🍋</h1>
                  </Link>
                  <ul className="nav-list-header">
                    {siteMap.map((item) => {
                      return (
                        <li key={item.key} className="nav-list-link">
                          <Link to={item.link}>{item.name}</Link>
                        </li>
                      );
                    })}
                    {
                      <span
                        className="nav-cart-quantity"
                        style={cartQuantity ? { opacity: 1 } : { opacity: 0 }}
                      >
                        <Link to={"/cart"}>
                          <button className="cart-quantity-button">{cartQuantity}</button>
                        </Link>
                      </span>
                    }
                    <button className="nav-user" onClick={onOpen}>
                      {
                        localStorage.getItem("email") && localStorage.getItem("password") && loggedIn &&
                        <p className="nav-user">{values.firstName.charAt(0) + values.lastName.charAt(0)}</p>
                      }
                      {
                        localStorage.getItem("email") && localStorage.getItem("password") && !loggedIn &&
                        <p className="nav-user">Login</p>
                      }
                      {
                        !localStorage.getItem("email") && !localStorage.getItem("password") &&
                        <p className="nav-user">Create account</p>
                      }
                    </button>
                    <button
                      type="button"
                      onClick={toggleColorMode}
                      className="toggle-color-button"
                  >
                      {
                          colorMode === "light"
                          ? <Icon as={SunIcon} />
                          : <Icon as={MoonIcon} />
                      }
                  </button>
                  </ul>
                </div>
                <div className="top-nav-bottom">
                  {
                    localStorage.email && localStorage.password
                    ? <LoginBar
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        user={user}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        zips={props.zips}
                      />
                    : <CreateBar
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        user={user}
                      />
                  }
                </div>
              </nav>
            </>
          )}
        </Formik>
        <LoginContext.Provider value={loggedIn}>
          <Outlet />
        </LoginContext.Provider>
        <footer className="bottom-nav">
          <ul className="nav-list-footer">
            {siteMap.map((item) => {
              return (
                <li key={item.key} className="nav-link-footer">
                  <Link to={item.link}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="nav-list-footer">
            {props.contacts.map((contact) => {
              return (
                <li key={contact.key} className="nav-link-footer">
                  <Link to={contact.link}>
                    <strong>{contact.name}:</strong> {contact.data}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="nav-list-footer">
            <div className="nav-list-footer-socials">
              {props.socials.map((social) => {
                return (

                    <Link to={social.link} key={social.key}>
                      <Icon
                        as={social.icon}
                        className="nav-list-footer-social"
                        alt={social.name}
                      />
                    </Link>
                );
              })}
            </div>
          </ul>
        </footer>
      </>
    );
}
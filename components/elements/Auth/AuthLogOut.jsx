import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  MdClose,
  MdVpnKey,
  MdOutlineMotionPhotosOn,
  MdVisibility,
  MdNotifications,
  MdStoreMallDirectory,
  MdLocalShipping,
  MdOutlinePowerSettingsNew
} from "react-icons/md";
import { LOGIN_CHECK_LINK, LOGIN_SIGNIN_LINK } from "../../../redux/links";
import {
  handleLogout,
  updateLoginInfo
} from "../../../redux/actions/loginActions";
import { PROJECT_LINK, VID } from "../../../project-config";
import LinearLoading from "../LinearLoading/LinearLoading";
import GoogleSSO from "../../GoogleSSO";

const Auth = ({ setAuthModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loginInfo, setloginInfo] = useState();
  const [signinMessage, setSigninMesssage] = useState({ message: "" });

  const [isLoading, setisLoading] = useState(false);

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );

  const loadingLogout = useSelector(
    state => state.loginReducer.loading,
    shallowEqual
  );

  const [isLogined, setisLogined] = useState(false);
  useEffect(() => {
    if (securityTokenState) {
      setisLogined(true);
    } else {
      setisLogined(false);
    }
  }, [securityTokenState]);

  const dispatch = useDispatch();

  const languageState = "en";

  useEffect(() => {
    if (signinMessage.message) {
      setTimeout(() => {
        setSigninMesssage({ message: "" });
      }, 4000);
    }
  }, [signinMessage.message]);

  function handleSubmit(event) {
    event.preventDefault();
    setisLoading(true);
    var form = new FormData();
    form.append("doSubmit", "Log In");
    form.append("capchacount", "0");
    form.append("loginInput", event.target.email.value);
    form.append("login", event.target.email.value);
    form.append("password", event.target.password.value);
    form.append("logSubmit", "Log In");

    fetch(LOGIN_SIGNIN_LINK.replace("$LANGUAGE", "en"), {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*"
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(data => {
        console.log("data signin", data);
        setSigninMesssage(data);
        return data;
      })
      .catch(err => {
        console.error("error signing in", err);
      })
      .then(() => {
        fetch(LOGIN_CHECK_LINK, {
          headers: {
            Accept: "*/*"
          }
        })
          .then(res => res.json())
          .then(json => {
            sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
            dispatch(updateLoginInfo(json.__Result));
            setloginInfo(json.__Result);
            setisLoading(false);
            setAuthModal(false);
          });
      });
  }

  useEffect(() => {
    fetchJson(LOGIN_CHECK_LINK).then(json => {
      if (json.__Result.loggedin == true) {
        sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
        dispatch(updateLoginInfo(json.__Result));
        setloginInfo(json.__Result);
      }
    });
  }, []);

  const logout = () => {
    if (securityTokenState) dispatch(handleLogout(securityTokenState));
  };
  const fetchJson = async url => {
    const response = await fetch(url, {
      headers: {
        Accept: "*/*"
      }
    });
    return response.json();
  };

  const renderErrorMessage = () => {
    const errorMessageMatch =
      signinMessage.error &&
      signinMessage.error.match(/default message \[([^"]+)]/);

    if (errorMessageMatch)
      return errorMessageMatch[0]
        .substring(0, errorMessageMatch[0].length - 1)
        .replace("default message [", "");
    else return signinMessage;
  };

  return (
    <div>
      
    {!isLogined ? (
       <></>
      ) : (
        

<ul>
{loadingLogout && <LinearLoading />}
<a
  href={`${PROJECT_LINK}/myaccount.html?mode=changepassword&vid=${VID}&iu=${languageState}`}
>
  <li className="myaccount-box">
    <i className="material-icons">
      <MdVpnKey />
    </i>
    Change Password
  </li>
</a>

<a
  href={`${PROJECT_LINK}/myaccount.html?mode=vieworder&vid=${VID}&iu=${languageState}`}
>
  <li className="myaccount-box">
    <i className="material-icons">
      <MdVisibility />
    </i>
    View Orders
  </li>
</a>
<a
  href={`${PROJECT_LINK}/myaccount.html?mode=activities&vid=${VID}&iu=${languageState}`}
>
  <li className="myaccount-box">
    <i className="material-icons">
      <MdNotifications />
    </i>
    Notifications
  </li>
</a>
<a
  href={`${PROJECT_LINK}/myaccount.html?mode=billingaddress&vid=${VID}&iu=${languageState}`}
>
  <li className="myaccount-box">
    <i className="material-icons">
      <MdStoreMallDirectory />
    </i>
    Billing Address
  </li>
</a>
<a
  href={`${PROJECT_LINK}/myaccount.html?mode=shippingaddress&vid=${VID}&iu=${languageState}`}
>
  <li className="myaccount-box">
    <i className="material-icons">
      <MdLocalShipping />
    </i>
    Shipping Address
  </li>
</a>
<div className="logout-container">
  <a onClick={() => logout()}>
    <li className="myaccount-box">
      <i className="material-icons">
        <MdOutlinePowerSettingsNew />
      </i>
      Logout
    </li>
  </a>
</div>
</ul>
      )}
    </div>
  );
};

export default Auth;

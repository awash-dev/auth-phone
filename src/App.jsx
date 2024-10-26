import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);

  function oncaptchverify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignInSubmit();
            console.log("recaptcha resolved..");
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignInSubmit() {
    setLoading(true);
    oncaptchverify();

    const appVerifier = window.recaptchaVerifier;
    const formPh = "+" + phone;

    signInWithPhoneNumber(auth, formPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShow(true);
        toast.success("Code sent!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to send code. Please try again.");
      });
  }

  function verifyOtp() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        console.log(result);
        toast.success("Verification successful!");
        // Handle successful verification (e.g., redirect or show user info)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Invalid OTP. Please try again.");
      });
  }

  return (
    <div className="bg-gray-800 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl">
            Welcome
          </h1>

          {show ? (
            <>
              <div className="text-emerald-500 bg-white w-fit p-4 rounded-full mx-auto">
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                className="text-white uppercase font-bold text-xl text-center"
              >
                Enter OTP
              </label>

              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                disabled={false}
                className="opt-container"
                otpType="number"
                autoFocus
              />

              <button
                onClick={verifyOtp}
                className="bg-emerald-600 text-white w-full gap-1 flex items-center justify-center py-2.5 rounded-md uppercase"
              >
                {loading && (
                  <CgSpinner size={25} className="mt-1 animate-spin" />
                )}
                <span>Verify Code</span>
              </button>
            </>
          ) : (
            <>
              <div className="text-emerald-500 bg-white w-fit p-4 rounded-full mx-auto">
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor="phone"
                className="text-white uppercase font-bold text-xl text-center"
              >
                Verify Phone Number
              </label>

              <PhoneInput
                country={"et"}
                placeholder="+251 987025788"
                value={phone}
                onChange={setPhone}
                className="react-tel-input"
              />

              <button
                onClick={onSignInSubmit}
                className="bg-emerald-600 text-white w-full gap-1 flex items-center justify-center py-2.5 rounded-md uppercase"
              >
                {loading && (
                  <CgSpinner size={25} className="mt-1 animate-spin" />
                )}
                <span>Send Code</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

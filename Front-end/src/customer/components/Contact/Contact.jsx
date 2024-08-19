import { Button } from "@mui/material";
import React from "react";
import All_API from "../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
  
        const messageData = {
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
        }

        sentContact(messageData)
        e.target.reset();


        async function sentContact(messageData) {
            try{
              const response = await All_API.sendContact(messageData)
              if(response.data.status === "success") {
                ToastSuccess(response.data.message)
              }else {
                ToastError(response.data.message)
              }
            }catch (error){
              ToastError(error.response.data.message)
            }
          }
  
    }

  return (
    <section className="mb-32">
      <div
        id="map"
        className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="container px-6 md:px-12">
        <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              <form onSubmit={handleSubmit}>
                <div className="relative mb-3" data-te-input-wrapper-init>
                <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input type="text"
                    id="name" name="name" className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Nguyen Van A" required />
              </div>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email"
                    id="email" name="email" className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="abc@gmail.com" required />
              </div>

                <div className="relative mb-3" data-te-input-wrapper-init>
                <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4"
                  className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                  placeholder="Your message" 
                  style={{ width: "100%" }}
                  required
                >
                </textarea>
                </div>
               
                <Button
                type="submit"
                variant="contained"
                className="w-full mt-2 mb-4 hover:hover:bg-black"
                sx={{ px: "2.5rem", py: "0.4rem", bgcolor: "#5B93FF" }}
              >
                Send
              </Button>
              </form>
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex flex-wrap mt-2">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 grow">
                      <p className="mb-2 font-bold mt-2 ">Technical support</p>
                      <p className="text-sm text-neutral-500">
                      railswift.company@gmail.com
                      </p>
                      <p className="text-sm text-neutral-500">0325.933.661</p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                  <div className="flex items-start">
                    <div className="srink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 grow">
                      <p className="mb-2 font-bold mt-2 ">Address</p>
                      <p className="text-sm text-neutral-500">57 Nguyễn Gia Trí Phường 25, Quận Bình Thạnh.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          className="w-7 h-7"
                          viewBox="0 0 111.756 122.879"
                          enableBackground="new 0 0 111.756 122.879"
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              d="M27.953,5.569v96.769h19.792V5.569H37.456H27.953L27.953,5.569z M21.898,105.123V2.785
      C21.898,1.247,23.254,0,24.926,0h12.53h13.316C52.443,0,53.8,1.247,53.8,2.785v102.338
      c0,1.537-1.356,2.783-3.028,2.783H24.926C23.254,107.906,21.898,106.66,21.898,105.123L21.898,105.123z
      M13.32,17.704c1.671,0,3.027,1.247,3.027,2.785s-1.355,2.784-3.027,2.784H7.352c-0.161,0-0.292,0.022-0.39,0.064
      c-0.129,0.056-0.276,0.166-0.429,0.325c-0.161,0.167-0.281,0.346-0.353,0.528c-0.083,0.208-0.125,0.465-0.125,0.759v90.803
      c0,0.287,0.043,0.537,0.125,0.74l0.034,0.092c0.068,0.135,0.165,0.264,0.284,0.383c0.126,0.125,0.258,0.217,0.39,0.27
      c0.123,0.051,0.279,0.074,0.466,0.074h97.052c0.188,0,0.346-0.025,0.467-0.074c0.133-0.053,0.264-0.145,0.389-0.27
      c3.035-3.035,0.441,1.799,0.441-1.215V24.949c0-3.667,3.039,2.357-0.477-1.288c-0.143-0.146-0.287-0.254-0.43-0.314
      c-0.113-0.048-0.246-0.075-0.391-0.075H62.563c-1.672,0-3.027-1.247-3.027-2.784s1.355-2.785,3.027-2.785h41.842
      c1.041,0,2.029,0.204,2.943,0.597c0.895,0.385,1.699,0.945,2.393,1.663c0.664,0.686,1.17,1.468,1.514,2.334
      c0.332,0.839,0.502,1.726,0.502,2.652v90.803c0,0.938-0.168,1.826-0.502,2.654c-0.344,0.859-0.865,1.639-1.549,2.324
      c-0.701,0.703-1.506,1.234-2.398,1.598c-0.906,0.367-1.879,0.551-2.902,0.551H7.352c-1.022,0-1.995-0.184-2.901-0.551
      c-0.894-0.363-1.698-0.896-2.399-1.598c-0.621-0.623-1.107-1.33-1.45-2.107c-0.036-0.07-0.069-0.143-0.099-0.217
      C0.168,117.574,0,116.684,0,115.752V24.949c0-0.921,0.17-1.811,0.504-2.652c0.342-0.863,0.849-1.648,1.512-2.334
      c0.683-0.707,1.488-1.263,2.393-1.652c0.929-0.401,1.917-0.607,2.943-0.607H13.32L13.32,17.704z M65.902,29.03h27.049
      c0.803,0,1.566,0.145,2.291,0.431c0.076,0.03,0.15,0.063,0.223,0.099c0.607,0.269,1.166,0.635,1.666,1.096
      c0.584,0.533,1.027,1.128,1.326,1.782c0.047,0.104,0.088,0.21,0.119,0.317c0.225,0.584,0.34,1.189,0.34,1.812v12.611
      c0,0.744-0.156,1.45-0.459,2.118l-0.004,0.009l0.004,0.002c-0.291,0.64-0.725,1.224-1.291,1.75
      c-0.58,0.546-1.227,0.956-1.932,1.231c-0.736,0.287-1.5,0.426-2.283,0.426H65.902c-0.777,0-1.535-0.14-2.27-0.426
      c-0.693-0.269-1.33-0.668-1.912-1.198c-0.588-0.539-1.031-1.144-1.326-1.81c-0.033-0.078-0.063-0.157-0.09-0.235
      c-0.234-0.605-0.35-1.228-0.35-1.867V34.567c0-0.723,0.146-1.424,0.445-2.099l-0.006-0.002c0.295-0.666,0.738-1.271,1.326-1.81
      l0.037-0.032l-0.002-0.001c0.877-0.78,2.039-1.219,2.119-1.244C64.537,29.147,65.215,29.03,65.902,29.03L65.902,29.03z
      M93.475,34.599h-28.08v12.547h28.08V34.599L93.475,34.599z M78.877,63.42c1.072,0,2.01,0.41,2.807,1.207
      s1.188,1.734,1.188,2.785c0,1.148-0.389,2.104-1.188,2.865c-0.799,0.758-1.734,1.129-2.807,1.129c-1.129,0-2.084-0.371-2.844-1.129
      c-0.76-0.762-1.148-1.717-1.148-2.865c0-1.051,0.391-1.988,1.148-2.785S77.748,63.42,78.877,63.42L78.877,63.42z
      M90.977,63.42c1.072,0,2.008,0.41,2.805,1.207s1.189,1.734,1.189,2.785c0,1.148-0.391,2.104-1.189,2.865
      c-0.799,0.758-1.734,1.129-2.805,1.129c-1.129,0-2.084-0.371-2.845-1.129c-0.758-0.762-1.148-1.717-1.148-2.865
      c0-1.051,0.391-1.988,1.148-2.785S89.848,63.42,90.977,63.42L90.977,63.42z M90.977,76.525c1.072,0,2.008,0.391,2.805,1.148
      c0.797,0.777,1.189,1.715,1.189,2.844c0,1.073-0.391,2.023-1.189,2.785c-0.797,0.762-1.734,1.148-2.805,1.148
      c-1.129,0-2.084-0.386-2.845-1.148c-0.758-0.762-1.148-1.712-1.148-2.785c0-1.129,0.391-2.067,1.148-2.844
      C88.893,76.916,89.848,76.525,90.977,76.525L90.977,76.525z M78.877,76.525c1.072,0,2.01,0.391,2.807,1.148
      c0.797,0.777,1.188,1.715,1.188,2.844c0,1.073-0.389,2.023-1.188,2.785c-0.799,0.762-1.734,1.148-2.807,1.148
      c-1.129,0-2.084-0.386-2.844-1.148c-0.76-0.762-1.148-1.712-1.148-2.785c0-1.129,0.391-2.067,1.148-2.844
      C76.793,76.916,77.748,76.525,78.877,76.525L78.877,76.525z"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 grow">
                      <p className="mb-2 font-bold mt-2">Land Line</p>
                      <p className="text-neutral-500">0909.379.802</p>
                    </div>
                  </div>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 grow">
                      <p className="mb-2 font-bold mt-2 ">Mobile</p>
                      <p className="text-neutral-500"> 0769.829.984</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

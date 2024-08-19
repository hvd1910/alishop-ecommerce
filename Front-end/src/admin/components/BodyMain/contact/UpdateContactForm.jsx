import React, { useEffect, useState } from "react";
import InputLayout from "../../Input/InputLayout";
import All_API from "../../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../notification/Notification";
import { ConvertDateTime } from "../Convert/Convert";

const UpdateContactForm = ({ idObject, handleCancel, onUpdate }) => {
  const [contact, setContact] = useState();
  const [reply, setReply] = useState(contact?.reply || "");

  async function getContactById() {
    try {
      const response = await All_API.getContactById(idObject);
      setContact(response.data.data);
    } catch {
      ToastError("please try again");
      handleCancel();
    }
  }

  useEffect(() => {
    getContactById();
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const contactData = {
      name: contact.name,
      email: contact.email,
      message: contact.message,
      reply: data.get("reply"),
      status: "Replied",
    };
    ToastSuccess("Waiting is sending email after 3 seconds");
    updateContact(idObject, contactData);
  };

  async function updateContact(id, contactData) {
    try {
      const response = await All_API.updateContact(id, contactData);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        onUpdate();
        handleCancel();
      } else {
        ToastError(response.data.message);
        handleCancel();
      }
    } catch {
      ToastError("please try again");
    }
  }

  return (
    <div className="row">
      <div className="">
        <div className="ec-cat-list card card-default mb-24px">
          <div className="card-body">
            <div className="ec-cat-form">
              <h4>Edit Contact</h4>

              <form className="row" onSubmit={handleUpdate}>
                <div className="form-group col-6 ">
                  <label htmlFor="text" className="col-form-label">
                    ID Contact
                  </label>
                  <input
                    id="id"
                    name="category_id"
                    className="form-control-2 here slug-title"
                    type="text"
                    disabled
                    value={idObject}
                  />
                </div>

                <div className="form-group col-6 ">
                  <label htmlFor="text" className="col-form-label">
                    {" "}
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-control-2 here slug-title"
                    type="text"
                    value={contact?.name}
                    disabled
                  />
                </div>

                <div className="form-group col-12 ">
                  <label htmlFor="text" className="col-form-label">
                    {" "}
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-control-2 here slug-title"
                    type="text"
                    value={contact?.email}
                    disabled
                  />
                </div>

                <div className="form-group col-12 ">
                  <label htmlFor="text" className="col-form-label">
                    {" "}
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control-2 here slug-title"
                    type="text"
                    value={contact?.message}
                    disabled
                  />
                </div>

                <div className="form-group col-12 ">
                  <label htmlFor="text" className="col-form-label">
                    {" "}
                    Reply
                  </label>
                  <textarea
                    id="reply"
                    name="reply"
                    className="form-control-2 here slug-title"
                    type="text"
                    description="Reply to messages"
                    disabled={contact?.status === "Replied"} 
                    value={
                      contact?.status === "Replied" ? contact.reply : reply
                    } 
                    onChange={(e) => setReply(e.target.value)} 
                  />
                </div>

                <div className="row">
                <div className="col-12">
                    {contact?.status === "AwaitReply" && 
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-primary btn-admin"
                    >
                      Update
                    </button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactForm;

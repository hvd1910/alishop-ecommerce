import React, { useEffect, useState } from 'react';
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';
import DeleteLayout from '../DeleteLayout/DeleteLayout';

const CouponConditionLayout = ({ couponId, handleCancel }) => {
  const [idObject, setIdObject] = useState('');
  const [couponConditions, setCouponConditions] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState('minimum_amount');
  const [inputValue, setInputValue] = useState('');
  const [load, setLoad] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({
    coupon_id: couponId,
    attribute: 'minimum_amount',
    operator: '>',
    value: '',
    discount_amount: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const couponCdtData = {
      coupon_id: couponId,
      attribute: data.get("attribute"),
      operator: data.get("operator"),
      value: data.get("value"),
      discount_amount: data.get("discount_amount")
    };

    if (isEditMode) {
      updateCouponCondition(idObject, couponCdtData);
    } else {
      createCouponCondition(couponCdtData);
    }

    event.currentTarget.reset();
    setIsEditMode(false); // Reset to add mode after submission
    setFormData({
      coupon_id: couponId,
      attribute: 'minimum_amount',
      operator: '>',
      value: '',
      discount_amount: ''
    });
  };

  const handleAttributeChange = (e) => {
    const attribute = e.target.value;
    setSelectedAttribute(attribute);
    setFormData(prevData => ({
      ...prevData,
      attribute,
      operator: attribute === 'minimum_amount' ? '>' : 'BETWEEN'
    }));
    setInputValue(''); // Reset the input value when the attribute changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  async function createCouponCondition(couponCdtData) {
    try {
      const response = await All_API.createCouponCondition(couponCdtData);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        handleLoading();
      } else {
        ToastError(response.data.message);
        handleLoading();
      }
    } catch (error) {
      ToastError(error.response.data.message);
    }
  }

  async function updateCouponCondition(id, couponCdtData) {
    try {
      const response = await All_API.updateCouponCondition(id, couponCdtData);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        handleLoading();
        setIsEditMode(false); 
      } else {
        ToastError(response.data.message);
      }
    } catch (error) {
      ToastError(error.response.data.message);
    }
  }

  async function deleteCouponCondition(id) {
    try {
      const response = await All_API.deleteCouponCondition(id);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        handleDeleteClose();
        handleLoading();
      } else {
        ToastError(response.data.message);
        handleDeleteClose();
        handleLoading();
      }
    } catch (error) {
      ToastError(error.response.data.message);
    }
  }

  const handleLoading = () => {
    setLoad(!load);
  };

  const handleUpdateOpen = (couponCondition) => {
    setFormData({
      coupon_id: couponCondition.coupon_id,
      attribute: couponCondition.attribute,
      operator: couponCondition.operator,
      value: couponCondition.value,
      discount_amount: couponCondition.discountAmount
    });
    setIdObject(couponCondition.id);
    setIsEditMode(true);
    setOpenUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateModal(false);
    setIsEditMode(false);
    setFormData({
      coupon_id: couponId,
      attribute: 'minimum_amount',
      operator: '>',
      value: '',
      discount_amount: ''
    });
  };

  const handleDeleteOpen = (id) => {
    setIdObject(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleAction = (id) => {
    if (openAction === id) {
      setOpenAction(null);
    } else {
      setOpenAction(id);
    }
  };

  async function getCouponCondition(couponId) {
    try {
      const response = await All_API.getCouponConditionAll(couponId);
      if (response.data.status === "success") {
        setCouponConditions(response.data.data);
      } else {
        ToastError(response.data.message);
      }
    } catch (error) {
      ToastError(error.response.data.message);
    }
  }

  useEffect(() => {
    getCouponCondition(couponId);
  }, [couponId, load]);

  return (
    <div className='bg-white p-4 rounded-2xl'>
      <h4>Manage Coupon Conditions</h4>
      <div className='table-size mt-3'>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3 mt-5">
            <label htmlFor="attribute" className="form-label">Attribute</label>
            <select
              id="attribute"
              name='attribute'
              className="form-control"
              value={formData.attribute}
              onChange={handleAttributeChange}
            >
              <option value="minimum_amount">Minimum Amount</option>
              <option value="applicable_date">Applicable Date</option>
            </select>
          </div>

          <div className="col-md-3 mt-5">
            <label htmlFor="operator" className="form-label">Operator</label>
            <input
              type="text"
              className="form-control input-cs1"
              id="operator"
              name='operator'
              required
              value={formData.operator}
              readOnly
            />
          </div>

          <div className="col-md-3 mt-5">
            <label htmlFor="value" className="form-label">Value</label>
            {formData.attribute === 'minimum_amount' ? (
              <input
                type="number"
                className="form-control"
                id="value"
                name='value'
                placeholder="0"
                min={0}
                required
                value={formData.value}
                onChange={handleInputChange}
              />
            ) : formData.attribute === 'applicable_date' ? (
              <input
                type="date"
                className="form-control mb-2"
                id="value"
                name='value'
                required
                value={formData.value}
                onChange={handleInputChange}
              />
            ) : null}
          </div>

          <div className="col-md-3 mt-5">
            <label htmlFor="discount_amount" className="form-label">Discount Amount (%)</label>
            <input
              type="number"
              className="form-control"
              id="discount_amount"
              name='discount_amount'
              placeholder="10%"
              min={0}
              required
              value={formData.discount_amount}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-12 mt-5">
            <div className="product_add_cancel_button">
              <button type="submit" className="btn btn-primary">
                {isEditMode ? 'Update Coupon Condition' : 'Add Coupon Condition'}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={handleUpdateClose}
                >
                  Cancel Update
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="row mt-6">
        <div className="col-xl-12 col-lg-12">
          <div className="ec-cat-list">
            <div className="card-body table-size">
              <div className="table-responsive">
                <table id="responsive-data-table" className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Attribute</th>
                      <th>Operator</th>
                      <th>Value</th>
                      <th>Discount Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couponConditions?.map((condition) => (
                      <tr key={condition.id}>
                        <td>{condition.id}</td>
                        <td>{condition.attribute}</td>
                        <td>{condition.operator}</td>
                        <td>{condition.value}</td>
                        <td>{condition.discountAmount}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-menu-2 btn-outline-success"
                            >
                              Info
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAction(condition.id)}
                              className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-display="static"
                            >
                              <span className="sr-only">Info</span>
                            </button>
                            {openAction === condition.id && (
                              <div className="dropdown-menu dropdown-menulist">
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleUpdateOpen(condition);
                                    setOpenAction(null);
                                  }}
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleDeleteOpen(condition.id);
                                    setOpenAction(null);
                                  }}
                                >
                                  Delete
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openDeleteModal && (
        <DeleteLayout
          open={openDeleteModal}
          handleClose={handleDeleteClose}
          idObject={idObject}
          deleteFunction={deleteCouponCondition}
        />
      )}
    </div>
  );
};

export default CouponConditionLayout;

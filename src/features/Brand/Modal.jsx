import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { formItemLayoutHorizontal } from "../../constants/global";
import { getSlug } from "../../utils/common";

const { Option } = Select;

BrandModal.propTypes = {
  visible: PropTypes.bool,
  isProcessing: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  brand: PropTypes.object,
};

BrandModal.defaultProps = {
  isProcessing: false,
  visible: false,
  brand: null,
};

function BrandModal(props) {
  const [form] = Form.useForm();
  const { visible, isProcessing, handleSubmit, handleCancel, brand } = props;

  useEffect(() => {
    if (visible && !brand) form.resetFields();
  }, [visible, brand, form]);

  const initialValues = brand || { name: "", slug: "", status: 1 };
  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.name) allValues.slug = getSlug(changedValues.name);
  };

  const onOK = () => {
    form
      .validateFields()
      .then((values) => handleSubmit({ ...initialValues, ...values }))
      .catch((err) => {});
  };

  return (
    <Modal
      title="Nhãn hiệu"
      okText="Lưu"
      cancelText="Huỷ"
      centered
      visible={visible}
      onOk={onOK}
      onCancel={handleCancel}
      confirmLoading={isProcessing}
    >
      <Form
        {...formItemLayoutHorizontal}
        form={form}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="slug" label="Slug" dependencies={["name"]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái">
          <Select>
            <Option value={1}>Active</Option>
            <Option value={0}>UnActive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BrandModal;

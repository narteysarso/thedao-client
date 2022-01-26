import { Button, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  
export default function VoteOptionsForm() {

    return (
        <Form {...formItemLayoutWithOutLabel}>
            <Form.List
                name="voteOptions"
                
            >
                {
                    (fields, { add, remove }, errors) => (
                        <>
                            {
                                fields.map((field, idx) => (
                                    <Form.Item
                                        {...(idx === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={idx === 0 ? 'Vote Options' : ''}
                                        >
                                        <Form.Item
                                            
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please option name for this field or remove it.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input eholder="passenger name" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))
                            }

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                            </Form.Item>
                        </>


                    )
                }


            </Form.List>
        </Form>
    )
}
import React, { Component } from 'react';
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const { Item } = Form
const { Option } = Select

class AddForm extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }


    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const { categorys, parentId } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                选择分类：
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map((c,index) => <Option value={c._id} key={index}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }

                </Item>
                添加分类：
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '分类名称必须输入'}
                              ]
                        })(
                            <Input placeholder='请输入需要添加的名称' />
                        )
                    }


                </Item>
            </Form>
        );
    }
}

export default Form.create()(AddForm)
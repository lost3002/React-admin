import React, { Component } from 'react';
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const { Item } = Form

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }


    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { categoryName } = this.props
        return (
            <Form>
                请填写修改分类：
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName,
                            rules: [
                                { required: true, message: '分类名称必须输入' }
                            ]
                        })(
                            <Input placeholder='请输入需要修改的名称' />
                        )
                    }


                </Item>
            </Form>
        );
    }
}

export default Form.create()(UpdateForm)
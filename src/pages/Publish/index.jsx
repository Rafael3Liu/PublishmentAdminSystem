import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import { observer } from 'mobx-react-lite'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { http } from '@/utils'
import { message } from 'antd'
const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  //存放上传图片的列表
  //使用useRef声明一个暂存仓库
  const cacheImgList = useRef()
  const [fileList, setFileList] = useState([])
  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    console.log(formatList)
    setFileList(formatList)
    //把图片列表存入仓库一份
    cacheImgList.current = formatList
  }

  //切换图片
  const [imageCount, setImageCount] = useState(1)

  const radioChange = (e) => {
    const rawValue = e.target.value
    console.log(e.target.value)
    setImageCount(rawValue)
    {
      /*
      if (cacheImgList.current.length === 0) {
      return false
    }
      */
    }

    //从仓库里取对应的图片数量，交给fileList来渲染 通过调用setFileList来完成
    if (rawValue === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : []
      setFileList([img])
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current)
    }
  }
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    //数据二次处理
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    }
    if (id) {
      await http.post(`/mp/articles/${id}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    console.log(params)

    navigate('/article')
    message.success(`{id?'更新成功'：'发布成功'}`)
  }
  const form = useRef(null)
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log('route', id)
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      const data = res.data
      //数据回填
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      //setFileList
      const formatImgList = data.cover.images.map((url) => {
        return {
          url,
        }
      })
      setFileList(formatImgList)
      //暂存列表也存一份
      cacheImgList.current = formatImgList
    }
    if (id) {
      loadDetail()
      console.log(form.current)
    }
  }, [id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imageCount > 1}
                maxCount={imageCount}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '编辑' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)

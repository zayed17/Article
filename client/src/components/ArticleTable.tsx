import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Tag, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetArticleQuery, useUpdateArticleMutation } from "../api/articleApi";
import { categories } from "../data/categories";
import { validateWordCount } from "../utils/validations";
import { useParams, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const EditArticle: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const { data: article, isLoading: articleLoading, isError } = useGetArticleQuery(articleId);
    const [updateArticle, { isLoading }] = useUpdateArticleMutation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [category, setCategory] = useState<string>(categories[0]);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTag, setInputTag] = useState<string>("");
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (article) {
            setCategory(article.category);
            setTags(article.tags || []);
            setImagePreview(article.imageUrl || null);
            setFileList(article.imageUrl ? [{ url: article.imageUrl }] : []);
        }
    }, [article]);

    const onFinish = async (values: any) => {
        if (tags.length === 0) {
            message.error("Please add at least one tag.");
            return;
        }

        if (fileList.length === 0) {
            message.error("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("shortDescription", values.shortDescription);
        formData.append("content", values.content);
        formData.append("category", category);
        tags.forEach((tag) => formData.append("tags[]", tag));
        if (fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj);
        }

        try {
            await updateArticle({ articleId, formData }).unwrap();
            message.success("Article updated successfully!");
            navigate(`/articles/${articleId}`);
        } catch (error) {
            console.error(error);
            message.error("Failed to update the article.");
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleAddTag = () => {
        if (inputTag.trim() && !tags.includes(inputTag.trim())) {
            setTags([...tags, inputTag.trim()]);
            setInputTag("");
        } else if (!inputTag.trim()) {
            message.error("Tag cannot be empty.");
        } else {
            message.error("Tag already exists.");
        }
    };

    const handleDeleteTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };

    if (articleLoading) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Loading Article...
                </h1>
            </div>
        );
    }

    if (isError || !article) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Article not found
                </h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Edit Article
            </h1>
            <Form
                form={form}
                name="editArticle"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    title: article.title,
                    shortDescription: article.shortDescription,
                    content: article.content,
                }}
                className="bg-white p-8 rounded-lg shadow-lg"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true, message: "Please input the title of the article!" },
                        { min: 8, message: "Title must be at least 8 characters long!" },
                    ]}
                >
                    <Input placeholder="Enter the article title" />
                </Form.Item>

                <Form.Item
                    label="Short Description"
                    name="shortDescription"
                    rules={[
                        { required: true, message: "Please input the short description!" },
                        { validator: (_, value) => validateWordCount(value, 3) },
                    ]}
                >
                    <TextArea placeholder="Enter a short description of the article" rows={4} />
                </Form.Item>

                <Form.Item
                    label="Article Content"
                    name="content"
                    rules={[
                        { required: true, message: "Please input the full content of the article!" },
                        { validator: (_, value) => validateWordCount(value, 50) },
                    ]}
                >
                    <TextArea placeholder="Write the full article content" rows={6} />
                </Form.Item>

                <Form.Item label="Category" required>
                    <Select value={category} onChange={handleCategoryChange}>
                        {categories.map((cat) => (
                            <Option key={cat} value={cat.toLowerCase()}>
                                {cat}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Tags">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Input
                                value={inputTag}
                                onChange={(e) => setInputTag(e.target.value)}
                                onPressEnter={handleAddTag}
                                placeholder="Add a tag"
                            />
                            <Button onClick={handleAddTag}>Add Tag</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Tag key={index} closable onClose={() => handleDeleteTag(tag)}>
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </Form.Item>

                <Form.Item label="Article Image" required>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        {fileList.length < 1 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                    {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="preview" style={{ width: "100%", marginTop: "10px" }} />
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Update Article
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditArticle;

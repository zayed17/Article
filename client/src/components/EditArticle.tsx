import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Tag, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetArticleQuery, useDeleteArticleMutation } from "../api/articleApi";
import { categories } from "../data/categories";
import { validateWordCount } from "../utils/validations";
import { useParams, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const EditArticle: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const { data: article, isLoading: articleLoading, isError } = useGetArticleQuery(articleId);
    const [updateArticle, { isLoading }] = useDeleteArticleMutation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [category, setCategory] = useState<string>(categories[0]);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTag, setInputTag] = useState<string>("");
    const navigate = useNavigate();
    console.log(inputTag, "checking the inpu")
    useEffect(() => {
        if (article) {
            setCategory(article.category);
            setTags(article.tags || []);
            setImagePreview(article.imageUrl || null);
            setFileList(article.imageUrl ? [{ url: article.imageUrl }] : []);
        }
    }, [article]);

    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("shortDescription", values.shortDescription);
        formData.append("content", values.content);
        formData.append("category", category);
        tags.forEach((tag) => formData.append("tags[]", tag));
        if (fileList.length > 0 && fileList[0].originFileObj) {
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


    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };

    const handleDeleteTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const validateTags = (value: string[]) => {
        if (!value || value.length === 0) {
            return Promise.reject(new Error("Please add at least one tag!"));
        }
        return Promise.resolve();
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                        label="Category"
                        name="category"
                        initialValue={category}
                        rules={[{ required: true, message: "Please select a category!" }]}
                    >
                        <Select onChange={handleCategoryChange}>
                            {categories.map((cat) => (
                                <Option key={cat} value={cat.toLowerCase()}>
                                    {cat}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Tags"
                        name="tags"
                        rules={[{ validator: (_, value) => validateTags(value) }]}
                    >
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
                                    <Tag key={index} closable onClose={() => handleDeleteTag(tag)} className="m-0">
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Article Image"
                    name="image"
                    rules={[{ required: true, message: "Please upload an article image!" }]}
                >
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
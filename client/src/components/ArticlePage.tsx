import React from "react";
import { useParams } from "react-router-dom";
import { Card, Tag, Typography, Avatar, Divider, Row, Col, Spin, Space } from "antd";
import { useGetArticleQuery } from "../api/articleApi";

const { Title, Text, Paragraph } = Typography;

const ArticleDetails: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const { data: article, isLoading, isError } = useGetArticleQuery(articleId);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !article) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Text type="danger">Failed to load article details.</Text>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Card bordered={false} className="shadow-lg">
                <Row justify="start" align="middle" className="mb-6">
                    <Avatar src={article.userId?.profileImage || "https://via.placeholder.com/150"} size={64} className="mr-4"/>
                    <div>
                        <Title level={4} >
                            {`${article.userId?.firstName || "Unknown"} ${article.userId?.lastName || "Author"}`}
                        </Title>
                        <Text type="secondary">
                            {`Published on: ${new Date(article.createdAt).toLocaleDateString()}`}
                        </Text>
                    </div>
                </Row>

                <Divider />
                <Title level={2} className="text-center mb-4">
                    {article.title}
                </Title>

                <Row justify="center" className="mb-6">
                    <img
                        src={article.imageUrl || "https://via.placeholder.com/600x400"}
                        alt={article.title}
                        className="rounded-lg shadow-md"
                        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                    />
                </Row>

                <Row justify="space-between" className="mb-4">
                    <Col>
                        <Space>
                            <Text strong>Category:</Text>
                            <Tag color="blue">{article.category}</Tag>
                        </Space>
                    </Col>
                    <Col>
                        <Space>
                            <Text strong>Tags:</Text>
                            {article.tags &&
                                article.tags.map((tag: string, index: number) => (
                                    <Tag key={index} color="geekblue">
                                        {tag}
                                    </Tag>
                                ))}
                        </Space>
                    </Col>
                </Row>

                <Paragraph className="text-gray-700 text-justify mb-6">
                    {article.shortDescription}
                </Paragraph>

                <Divider />
                <Row className="mb-6">
                    <Col span={24}>
                        <Title level={4}>Content</Title>
                        <Paragraph className="text-justify">{article.content}</Paragraph>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ArticleDetails;

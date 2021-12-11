import React from 'react';
import WPBlogGrid from '../../wp-components/blog/WPBlogGrid';
import WPLayout from '../../wp-components/layouts/WPLayout';
import BreadCrumb2 from '../../components/elements/BreadCrumb2';

const BlogGridPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: "Virem's Blog",
        },
    ];

    return (
        <WPLayout title="Blog">
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>{"Virem's Blog"}</h1>
                        <BreadCrumb2 breacrumb={breadCrumb} />
                    </div>
                    <WPBlogGrid />
                </div>
            </div>
        </WPLayout>
    );
};

export default BlogGridPage;

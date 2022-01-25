import { Layout, Typography } from "antd";

export function MainLayout({children, ...props}){
    return(
        <Layout className="site-layout">
            <Layout.Header>

            </Layout.Header>
            <Layout.Content>
                {children}
            </Layout.Content>
            <Layout.Footer className="center-text">
                <Typography.Title level={5}>
                    Daoist &copy; {(new Date()).getFullYear()} |
                    Hire me: <a href="https://linkedin/in/narteykodjosarso" rel="noreferrer">Nartey Kodjo-Sarso</a>
                </Typography.Title>
            </Layout.Footer>
        </Layout>
    )
}